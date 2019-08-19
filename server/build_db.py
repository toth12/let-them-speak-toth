'''Build a BlackLab index from a directory of folia files'''

from __future__ import print_function
import os
import sys
[sys.path.append(i) for i in ['.', '..', 'server']]
from server.seeds.utils import write_json #pylint: disable=wrong-import-position, import-error
from server.db import get_db #pylint: disable=wrong-import-position

##
# Config
##

# location of tomcat webapps directory
tomcat_apps_path = os.environ['TOMCAT_WEBAPPS']

# location of directory with folia files to use when building db
folia_dir = os.path.join('server', 'inputs', 'folia')

# location of mongo dump to use when building db
mongo_archive_path = os.path.join('server', 'inputs', 'lts.archive')

# name of the database to use when building db
db_name = 'lts'

# specify blacklab version to use
bl_version = '1.7.3'

##
# Functions
##

def validate_blacklab_present():
  '''
  Ensure the user has downloaded Blacklab to the root directory
  '''
  if not os.path.exists('BlackLab'):
    print(' ! BlackLab server not found - exiting.')
    sys.exit()

def index_folia_files(dir_to_index, index_name):
  '''
  Index all seed folia files. Assumes script is run with npm
  @args:
    {str} dir_to_index: a string that points to the location of files
      to be fed to indexing process. Should end in a slash
  '''

  # ensure input directory path ends in slash
  if not dir_to_index[-1] == '/':
    dir_to_index += '/'

  # blacklab classpath config
  classpath = 'BlackLab/core/target/blacklab-' + bl_version + '.jar'
  classpath += ':Blacklab/core/target/lib/*'

  # Don't run if the index folder already exists
  if os.path.exists("%s" % index_name):
    print ("Skipping index rebuild because '%s' already exists!" % index_name)
    print ("Remove this folder if you want to force rebuild (takes a long time).")
    return

  cmd = 'java -cp "' + classpath + '" '
  cmd += 'nl.inl.blacklab.tools.IndexTool ' # blacklab tool to run
  cmd += 'create ' # command to blacklab
  cmd += index_name + ' ' # name for the generated index
  cmd += dir_to_index + ' ' # path to the input files
  cmd += 'folia ' # format of input files
  run_cmd(cmd)

def generate_config_file(index_name):
  '''
  Write the config files required by BlackLab
  '''
  out_path = os.path.join(tomcat_apps_path, 'blacklab-server.json')
  write_json(out_path, {
    'indices': {
      index_name: {
        'dir': os.path.join(os.getcwd(), index_name) + '/'
      }
    }
  })

def copy_war_file():
  '''
  Copy war file from BlackLab server dir to the apps_path
  '''
  war_path = 'BlackLab/server/target/blacklab-server-' + bl_version + '.war'
  war_file = os.path.basename(war_path)
  out_path = os.path.join(tomcat_apps_path, war_file)
  cmd = 'cp ' + war_path + ' ' + out_path
  run_cmd(cmd)

def run_cmd(cmd):
  '''
  Run a provided terminal command
  @args:
    {str} cmd: the terminal command to run
  '''
  print(' * running', cmd)
  os.system(cmd)

def create_folia_index(**kwargs):
  '''
  Main script that handles all folia index business
  @kwargs:
    {str} folia_dir: the path to the folia infiles
    {str} index_name: the name of the blacklab index to create
  '''
  folia_path = kwargs.get('folia_dir', folia_dir)
  index_name = kwargs.get('index_name', 'lts')

  validate_blacklab_present()
  index_folia_files(folia_path, index_name)
  generate_config_file(index_name)
  copy_war_file()
  print(' * Indices successfully created. Please restart tomcat!')

def create_mongo_indexes():
  '''
  Index the tables in Mongo to optimize query performance
  '''
  db = get_db()
  db.testimonies.create_index('testimony_id')
  db.tokens.create_index('testimony_id')

##
# Main DB builder
##

def build_db(folia_path, archive_path):
  '''
  Build the app db using input folia files and mongo dump
  @args:
    {str} folia_path: directory that contains the folia XML files
    {str} archive_path: the path to a mongo archive file
  '''

  # drop the extant db
  cmd = 'mongo ' + db_name + ' '
  cmd += '--eval "db.dropDatabase()" '
  run_cmd(cmd)

  # build the mongo tables
  cmd = 'mongorestore '
  cmd += '--db=' + db_name + ' '
  cmd += '--archive=' + archive_path + ' '
  run_cmd(cmd)

  # index the folia files
  create_folia_index(folia_dir=folia_path)

  # create mongo indexes for quicker queries
  create_mongo_indexes()

if __name__ == '__main__':
  build_db(folia_dir, mongo_archive_path)

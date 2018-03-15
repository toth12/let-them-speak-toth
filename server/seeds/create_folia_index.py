import os
import sys
from utils import write_json

##
# Config
##

# files to index
seed_folia_dir = os.path.join('server', 'seeds', 'folia')

# location of tomcat webapps directory
seed_apps_path = '/usr/local/Cellar/tomcat/9.0.5/libexec/webapps'

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
  classpath =  'BlackLab/core/target/blacklab-1.6.0.jar'
  classpath += ':Blacklab/core/target/lib/*'

  cmd =  'java -cp "' + classpath + '" '
  cmd += 'nl.inl.blacklab.tools.IndexTool ' # blacklab tool to run
  cmd += 'create ' # command to blacklab
  cmd += index_name + ' ' # name for the generated index
  cmd += dir_to_index + ' ' # path to the input files
  cmd += 'folia ' # format of input files
  run_cmd(cmd)


def generate_config_file(apps_path, index_name):
  '''
  Write the config files required by BlackLab
  @args:
    {str} apps_path: path to the tomcat /webapps/ dir
  '''
  out_path = os.path.join(apps_path, 'blacklab-server.json')
  write_json(out_path, {
    'indices': {
      index_name: {
        'dir': os.path.join(os.getcwd(), index_name) + '/'
      }
    }
  })


def copy_war_files(apps_path):
  '''
  Copy war files from BlackLab server dir to the apps_path
  @args:
    {str} apps_path: path to the tomcat /webapps/ dir
  '''
  war_path = 'BlackLab/server/target/blacklab-server-1.6.0.war'
  war_file = os.path.basename(war_path)
  out_path = os.path.join(apps_path, war_file)
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


def create_folia_index(*args, **kwargs):
  '''
  Main script that handles all folia index business
  @kwargs:
    {str} folia_dir: the path to the folia infiles
    {str} apps_path: the path to the tomcat webapps dir
    {str} index_name: the name of the blacklab index to create
  '''
  apps_path = kwargs.get('apps_path', seed_apps_path)
  folia_dir = kwargs.get('folia_dir', seed_folia_dir)
  index_name = kwargs.get('index_name', 'lts')

  validate_blacklab_present()
  index_folia_files(folia_dir, index_name)
  generate_config_file(apps_path, index_name)
  copy_war_files(apps_path)
  print(' * Indices successfully created. Please restart tomcat!')


if __name__ == '__main__':

  # run main process
  create_folia_index(folia_dir, apps_path)
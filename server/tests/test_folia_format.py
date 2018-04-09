'''Test structure of folia XML files'''

from multiprocessing import Pool
from glob import glob
import os
import sys
import codecs
from bs4 import BeautifulSoup
[sys.path.append(i) for i in ['.', '..', 'server']]
from build_db import folia_dir

def test_folia_format():
  '''
  Ensure all folia XML files have the requred structure
  '''
  pool = Pool()
  folia_files = glob(os.path.join(folia_dir, '*'))
  for idx, _ in enumerate(pool.imap(validate_file, folia_files)):
    print(' * validating folia file', idx)

def validate_file(folia_path):
  '''
  Ensure a given folia XML file has required structure
  @params:
    {str} folia_path: the path to a folia XML file
  '''
  with codecs.open(folia_path, 'r', 'utf8') as f:
    soup = BeautifulSoup(f.read(), 'xml')

    # validate metadata fields are populated
    metadata = soup.find('metadata')
    assert metadata.find({'meta': {'id': 'testimony_id'}}).get_text()
    assert metadata.find({'meta': {'id': 'shelfmark'}}).get_text()

    # validate text content present
    text = soup.find('text')
    for j in ['div', 's', 't', 'lemma', 'pos']:
      assert text.find_all(j)

if __name__ == '__main__':
  test_folia_format()
'''Test structure of folia XML files'''

from multiprocessing import Pool
from glob import glob
import os
import sys
import codecs
from bs4 import BeautifulSoup
[sys.path.append(i) for i in ['.', '..', 'server']]
from build_db import folia_dir

# sample one out of every `sample_rate` - set to 1 to test all folia records
sample_rate = 500

def test_folia_format():
  '''
  Ensure all folia XML files have the requred structure
  '''
  pool = Pool()
  all_files = glob(os.path.join(folia_dir, '*'))
  sample = [i for idx, i in enumerate(all_files) if idx % sample_rate == 0]
  for idx, _ in enumerate(pool.imap(validate_file, sample)):
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
    assert metadata.find({'meta': {'id': 'ghetto'}})
    assert metadata.find({'meta': {'id': 'camp'}})
    assert metadata.find({'meta': {'id': 'gender'}})

    # validate text content present
    text = soup.find('text')
    for j in ['div', 's', 't', 'lemma', 'pos']:
      assert text.find_all(j)

if __name__ == '__main__':
  test_folia_format()

'''Seed the BlackLab index using seed folia files'''

import os
import sys
[sys.path.append(i) for i in ['.', '..', 'server']]
from build_db import create_folia_index #pylint: disable=wrong-import-position, import-error

def seed_folia_index():
  '''Index all files at `seed_folia_dir` path'''
  seed_folia_dir = os.path.join('server', 'seeds', 'folia')
  create_folia_index(folia_dir=seed_folia_dir)

if __name__ == '__main__':
  seed_folia_index()
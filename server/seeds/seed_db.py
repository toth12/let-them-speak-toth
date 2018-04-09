'''
Main seed script: runs all child seed processes
'''

import sys
[sys.path.append(i) for i in ['.', '..', 'server']]
from server.seeds.seed_testimonies import seed_testimonies #pylint: disable=wrong-import-position
from server.seeds.seed_folia_index import seed_folia_index #pylint: disable=wrong-import-position

def seed_db():
  '''Run all db seed scripts'''
  seed_testimonies()
  seed_folia_index()

if __name__ == '__main__':
  seed_db()
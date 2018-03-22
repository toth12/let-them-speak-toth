'''
Main seed script: runs all child seed processes
'''

import sys
[sys.path.append(i) for i in ['.', '..', 'server']] # pylint: disable=expression-not-assigned
from seed_testimonies import seed_testimonies # pylint: disable=import-error, wrong-import-position
from seed_folia_index import seed_folia_index # pylint: disable=import-error, wrong-import-position

def seed_db():
  '''Run all db seed scripts'''
  seed_testimonies()
  seed_folia_index()

if __name__ == '__main__':
  seed_db()
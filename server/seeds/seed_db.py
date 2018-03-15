'''
Main seed script: runs all child seed processes
'''

from seed_testimonies import seed_testimonies
from create_folia_index import create_folia_index

def seed_db():
  '''Run all db seed scripts'''
  seed_testimonies()
  create_folia_index()

if __name__ == '__main__':
  seed_db()
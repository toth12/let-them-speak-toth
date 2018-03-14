'''
Main seed script: runs all child seed processes
'''

from seed_testimonies import seed_testimonies

def seed_db():
  '''Run all db seed scripts'''
  seed_testimonies()

if __name__ == '__main__':
  seed_db()
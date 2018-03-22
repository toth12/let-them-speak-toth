'''Helpers for server-side test runners'''

import os
from pymongo import MongoClient

def get_db():
  '''Return a db client'''
  host = os.environ['MONGO_HOST']
  port = 27017
  return MongoClient(host, port, connect=False)['lts']
'''Create and connect to db'''

from __future__ import print_function
import os
import time
from pymongo import MongoClient

def get_db():
  '''Get a connection to the db'''
  while True:
    try:
      # initialize db connection
      host = os.environ['MONGO_HOST']
      client = MongoClient(host, 27017, connect=False)['lts']
      return client
    except Exception as exc: #pylint: disable=broad-except
      print(exc)
      time.sleep(0.1)
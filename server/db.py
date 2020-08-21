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
      
      mc = MongoClient(host, 27017, connect=False)
      # print(mc.database_names())
      if "lts" not in mc.database_names():
        break
      
      return mc["lts"]
    except Exception as exc: #pylint: disable=broad-except
      print("get_db exception: " + str(exc))
      time.sleep(0.1)
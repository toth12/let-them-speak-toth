'''Helpers for server-side test runners'''

from pymongo import MongoClient

def get_db():
  '''Return a db client'''
  return MongoClient('localhost', 27017)['lts']
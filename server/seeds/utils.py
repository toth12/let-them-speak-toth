'''Shared utilities for server seeding'''

import os
from pymongo import MongoClient

def get_db():
  '''
  Return a connection to the db
  '''
  host = 'localhost'
  port = 27017
  db = MongoClient(host, port)['lts']
  return db


def write_text(path, text):
  '''
  Write a given text to the out_dir location
  @args:
    {str} path: the path to the file to write
    {str} text: the text content to write to disk
  '''
  with open(path, 'w') as out:
    out.write(text)

def make_dir(path):
  '''
  Ensure a directory exists
  @args:
    {str} path: the path to the directory to make
  '''
  try:
    os.makedirs(path)
  except Exception:
    pass
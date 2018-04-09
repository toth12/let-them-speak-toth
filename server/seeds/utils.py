'''Shared utilities for server seeding'''

import os
import json
from shutil import rmtree

def write_text(path, text):
  '''
  Write a given text to the out_dir location
  @args:
    {str} path: the path to the file to write
    {str} text: the text content to write to disk
  '''
  with open(path, 'w') as out:
    out.write(text)

def write_json(path, obj):
  '''
  Write `obj` to `path`
  @args:
    {str} path: the path where the object should be written
    {obj} obj: a JSON-serializable object
  '''
  with open(path, 'w') as out:
    json.dump(obj, out)

def make_dir(path):
  '''
  Ensure a directory exists
  @args:
    {str} path: the path to the directory to make
  '''
  try:
    os.makedirs(path)
  except Exception: #pylint: disable=broad-except
    pass

def rm_dir(path):
  '''
  Remove a directory and its contents
  @args:
    {str} path: the path to the directory to remove
  '''
  try:
    rmtree(path)
  except Exception: #pylint: disable=broad-except
    pass
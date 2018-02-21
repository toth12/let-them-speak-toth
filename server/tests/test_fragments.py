'''Fragments collection test suite'''
import sys
import json
sys.path.insert(0, 'server')
sys.path.insert(0, '..')
sys.path.insert(0, '.')

from pymongo import MongoClient
from bson.objectid import ObjectId

root_schema = {
  '_id': ObjectId,
  'label': str,
  'essay_id': str,
  'tree': dict,
}

node_schema = {
  'label': str,
  'testimony_id': str,
  'testimony_position': int,
  'media_url': str,
  'media_offset': int,
  'children': list,
}

def validate_node(_id, node):
  '''Validate that a fragment's node has the required structure'''
  for i in node.keys():
    print(' * validating', i, 'in', _id, 'tree')
    assert isinstance(node[i], node_schema[i])
    for j in node['children']:
      print(' * validating', j, 'in', _id, 'tree children')
      validate_node(_id, j)

def validate_fragment(fragment):
  '''Validate that a fragment has the required structure'''
  for i in fragment.keys():
    print(' * validating', i, 'in', fragment['_id'])
    assert isinstance(fragment[i], root_schema[i]) 
    validate_node(fragment['_id'], fragment['tree'])

db = MongoClient('localhost', 27017)['lts']
for i in db['fragments'].find():
  validate_fragment(i)
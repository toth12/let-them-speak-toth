'''Fragments collection test suite'''
import sys
from pymongo import MongoClient
from bson.objectid import ObjectId
sys.path.insert(0, 'server')
sys.path.insert(0, '..')
sys.path.insert(0, '.')

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

def validate_length(obj, _type):
  '''Validate that strings and ints have length'''
  if _type in [str, int]:
    assert obj

def validate_node(_id, node):
  '''Validate that a fragment's node has the required structure'''
  for node_key in node.keys():
    print(' * validating', node_key, 'in', _id, 'tree')
    assert isinstance(node[node_key], node_schema[node_key])
    validate_length(node[node_key], node_schema[node_key])
    for child in node['children']:
      print(' * validating', child, 'in', _id, 'tree children')
      validate_node(_id, child)

def validate_fragment(fragment):
  '''Validate that a fragment has the required structure'''
  for fragment_key in fragment.keys():
    print(' * validating', fragment_key, 'in', fragment['_id'])
    assert isinstance(fragment[fragment_key], root_schema[fragment_key])
    validate_length(fragment[fragment_key], root_schema[fragment_key])
    validate_node(fragment['_id'], fragment['tree'])

db = MongoClient('localhost', 27017)['lts']
for doc in db['fragments'].find():
  validate_fragment(doc)
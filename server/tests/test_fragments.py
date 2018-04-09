'''Fragments collection test suite'''
import sys
from pymongo import MongoClient
from bson.objectid import ObjectId
[sys.path.append(i) for i in ['server', '..', '.']]
from db import get_db

root_schema = {
  '_id': ObjectId,
  'label': str,
  'essay_id': str,
  'tree': dict,
}

node_schema = {
  'label': str,
  'testimony_id': str,
  'media_index': int,
  'media_offset': int,
  'start_sentence_index': int,
  'end_sentence_index': int,
  'children': list,
}

optional_for_parents = [
  'testimony_id',
  'media_index',
  'media_offset',
  'start_sentence_index',
  'end_sentence_index'
]

def validate_length(obj, _type):
  '''Validate that strings and ints have length'''
  if _type in [str, int] and obj != 0:
    assert obj

def validate_node(_id, node):
  '''Validate that a fragment's node has the required structure'''
  for field in node_schema.keys():
    if (node['children']) and (field in optional_for_parents):
      continue
    val = node[field]
    expected_type = node_schema[field]
    print(' * validating', _id, 'tree field', field, 'has type', expected_type)
    assert isinstance(val, expected_type)
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

def validate_testimony_id_keys_exist(fragment):
  '''Validate that each testimony linked to a fragment is present in the db'''
  for child in fragment['tree']['children']:
    # parent nodes may not have testimony_ids
    if not 'testimony_id' in child.keys():
      continue
    print(' * validating testimony with id', child['testimony_id'], 'exists')
    assert_testimony_exists(child['testimony_id'])
    for grandchild in child['children']:
      assert_testimony_exists(child['testimony_id'])

def assert_testimony_exists(testimony_id):
  '''Validate that a given testimony exists in the db'''
  result = list(db['testimonies'].find({'testimony_id': testimony_id}))
  print(' * validating testimony_id', testimony_id, 'exists')
  assert len(list(result)) > 0

db = get_db()
for doc in db['fragments'].find():
  validate_fragment(doc)
  validate_testimony_id_keys_exist(doc)
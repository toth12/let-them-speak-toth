'''Fragments collection test suite'''
import sys
from six import string_types
from pymongo import MongoClient
from bson.objectid import ObjectId
[sys.path.append(i) for i in ['server', '..', '.']]
from db import get_db

root_schema = {
  '_id': ObjectId,
  'label': string_types,
  'essay_id': string_types,
  'tree': dict,
}

node_schema = {
  'label': string_types,
  'testimony_id': string_types,
  'media_index': int,
  'media_offset': int,
  'start_sentence_index': [int, type(None)],
  'end_sentence_index': [int, type(None)],
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
    f_type = node_schema[field]
    f_type = f_type if isinstance(f_type, list) else [f_type]
    validated = False
    for _type in f_type:
      print(' * validating', _id, 'tree field', field, 'value', val, 'type in', f_type)
      try:
        assert isinstance(val, _type)
        validated = True
      except:
        pass
    assert validated
    # validate child nodes recursively
    for child in node['children']:
      print(' * validating', child, 'in', _id, 'tree children')
      validate_node(_id, child)

def validate_fragment(fragment):
  '''Validate that a fragment has the required structure'''
  for fragment_key in fragment.keys():
    print(' * validating', fragment_key, 'in', fragment['_id'], fragment[fragment_key])
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
  if (len(list(result)) <= 0):
    print (f"WARNING: DID NOT FIND TESTIMONY WITH ID: {testimony_id}")
  #assert len(list(result)) > 0

db = get_db()
# print("db", db)
# print("Listing collections")
# print(db.list_collections())
# print("Printing lol")
# print(db["lol"].find())
# print("Printing fragments")
# print(db["fragments"].find())
# print("Printing fragments get_collection()")
# print(db.get_collection("fragments"))
# print("Printing lol get_collection()")
# print(db.get_collection("lol"))

for doc in db['fragments'].find():
  print("Testing doc")
  validate_fragment(doc)
  validate_testimony_id_keys_exist(doc)

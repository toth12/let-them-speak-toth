'''Test structure of tokens collection members'''

import sys
[sys.path.append(i) for i in ['server', '..', '.']]
from helpers import get_db

def test_token_format():
  '''
  Ensure all tokens have the appropriate format
  '''
  db = get_db()
  for i in db['tokens'].find({}, {'id': 0}):
    validate_attribute(i, 'testimony_id', str)
    validate_attribute(i, 'token_index', int)

def validate_attribute(obs, key, val_type):
  '''
  Validate that `key` is an attribute of `obs`,
  and that the value of `key` has type `type`
  '''
  if val_type == int:
    converted = int(obs[key])
    assert isinstance(converted, int)
  else:
    assert isinstance(obs[key], val_type)
    assert len(obs[key]) > 0

if __name__ == '__main__':
  test_token_format()
'''Test structure of tokens collection members'''

import sys
[sys.path.append(i) for i in ['server', '..', '.']]
from db import get_db

# specify number of tokens to test; set to None to test all
sample_size = 20

def test_token_format():
  '''
  Ensure all tokens have the appropriate format
  '''
  db = get_db()
  if sample_size:
    tokens = db['tokens'].find({}).limit(sample_size)
  else:
    tokens = db['tokens'].find({}, {})
  for idx, i in enumerate(tokens):
    validate_attribute(i, 'testimony_id', str)
    validate_attribute(i, 'tokens', list)

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

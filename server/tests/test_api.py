'''API test suite'''
import sys
import json
sys.path.insert(0, 'server')
sys.path.insert(0, '..')
sys.path.insert(0, '.')

# import the Flask module
from app import app #pylint: disable=wrong-import-position

# indicate tests are running
app.testing = True

# generate a test client
app = app.test_client()

# identify all routes that should return responses
routes = [
  '/',
  '/api/tree',
  '/api/testimony',
  '/api/table_of_contents',
  '/api/search'
]

def test_response_codes():
  '''Validate major routes yield 200 response codes'''
  for route in routes:
    print(' * testing route', route)
    response = app.get(route)
    assert response.status_code == 200

def test_tree_data():
  '''Validate the server sends data in the expected shape'''
  assert 'tree' in get_json('/api/tree')[0]

def test_search_offset():
  '''Validate the search route paginates properly'''
  one = get_json('/api/search?start=0')['results'][1]
  two = get_json('/api/search?start=1')['results'][0]
  assert one == two

def get_json(route):
  '''Return a JSON response from a route'''
  data = app.get(route).get_data(as_text=True)
  return json.loads(data)

if __name__ == '__main__':
  test_response_codes()
  test_tree_data()
  test_search_offset()
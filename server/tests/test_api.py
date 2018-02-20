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

def test_api_data():
  '''Validate the server sends data in the expected shape'''
  data = app.get('/api/tree').get_data(as_text=True)
  assert 'tree' in json.loads(data)[0]

def test_index_response():
  '''Validate the index route returns a 200 response'''
  response = app.get('/')
  assert response.status_code == 200
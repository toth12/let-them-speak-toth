'''server/app.py - main api app declaration'''
import hashlib
import sys
import os
from cas_client import CASClient
from flask import Flask
from flask import jsonify
from flask import send_from_directory
from flask import request
from flask import redirect
from flask import session
from flask import url_for
from flask_cors import CORS
[sys.path.append(i) for i in ['.', '..', 'server']]
from server.blacklab import search_blacklab #pylint: disable=wrong-import-position
from server.db import get_db #pylint: disable=wrong-import-position

app = Flask(__name__, static_folder='../build')
CORS(app)

app.debug = True

# cas authentication URL
cas_url = 'https://secure.its.yale.edu/cas'
cas_client = CASClient(cas_url, auth_prefix='')
app.secret_key = hashlib.new('ripemd160').hexdigest()
use_cas_auth = False
use_param_auth = False

##
# API routes
##

@app.route('/api/tree')
def items():
  '''Fetch tree data'''
  db = get_db()
  try:
    return jsonify(list(db.fragments.find({}, {'_id': 0})))
  except Exception: #pylint: disable=broad-except
    return jsonify({'err': 'tree fragment fetch error'})

@app.route('/api/testimony')
def testimony():
  '''Fetch a transcript'''
  db = get_db()
  args = {'testimony_id': request.args.get('testimony_id')}
  result = list(db.testimonies.find(args, projections['testimony']))
  if result:
    return jsonify(result[0])
  return jsonify([])

@app.route('/api/search')
def xml_search():
  '''Fetch testimonies that match a query'''
  try:
    results = search_blacklab(request.args)
    return jsonify(results)
  except Exception as e: #pylint: disable=broad-except
    return jsonify({'err': 'search error: ' + str(e)})

@app.route('/api/sentences')
def sentences():
  '''Fetch sentence indices given a testimony id and token indices'''
  db = get_db()
  testimony_id = request.args.get('testimony_id', None)
  token_start = int(request.args.get('token_start', 0))
  token_end = int(request.args.get('token_end', 0))
  if not testimony_id or not token_start or not token_end:
    return jsonify([])
  results = db.tokens.find({'testimony_id': testimony_id}, {'_id': 0})
  tokens = list(results)[0]['tokens']
  return jsonify({
    'sentenceStart': tokens[token_start]['sentence_index'],
    'sentenceEnd': tokens[token_end]['sentence_index'],
  })

##
# Filtered routes
##

@app.route('/api/table_of_contents')
def table_of_contents():
  '''Fetch all testimonies for the table of contents'''
  db = get_db()
  args = get_filter_query(request.args)
  projection = projections['table_of_contents']
  limit = 10
  start = int(request.args.get('start', 0))
  total = db.testimonies.find(args).count()
  results = db.testimonies.find(args, projection).skip(start).limit(limit)
  return jsonify({
    'total': int(total),
    'results': list(results),
  })

@app.route('/api/filters')
def filter_testimonies():
  '''Get the distinct levels of each field used in filtering'''
  db = get_db()
  # initialize distinct value arrays
  collections = set()
  genders = set()
  ghetto_names = set()
  camp_names = set()
  recording_years = set()
  interviewee_names = set()
  testimony_ids = set()
  # build the search using any requested filters
  args = get_filter_query(request.args)
  # add each distinct level to the sets initialized above
  for i in db.testimonies.find(args, projections['filters']):
    collections.add(i['collection'])
    genders.add(i['gender'])
    interviewee_names.add(i['interviewee_name'])
    testimony_ids.add(i['testimony_id'])
    recording_years.add(i['recording_year'])
    # handle list fields
    for j in i['ghetto_names']:
      ghetto_names.add(j)
    for j in i['camp_names']:
      camp_names.add(j)
  return jsonify({
    'collections': list(collections),
    'genders': list(genders),
    'ghetto_names': list(ghetto_names),
    'camp_names': list(camp_names),
    'recording_years': list(recording_years),
    'interviewee_names': list(interviewee_names),
    'testimony_ids': list(testimony_ids)
  })

@app.route('/api/typeahead')
def typeahead():
  '''Given a field and a string, return all values
  in the given field that contain the string'''
  db = get_db()
  field = request.args.get('field', None)
  query = request.args.get('query', '')
  if not field:
    return jsonify(['Error: a field is required'])
  search = {field: {'$regex': query}}
  results = db.testimonies.find(search).distinct(field)
  return jsonify(results)

def get_filter_query(args):
  '''Return a mongo query that returns all values
  that match all key/value pairs specified in `args`
  @params:
    {dict} args: a JSON-serialized representation of filters.selected
  @returns:
    {dict} a formatted Mongo query
  '''
  search = {}
  for i in args:
    # skip params passed to Flask that aren't in testimony collection
    if i in ['start', 'min_year', 'max_year']:
      continue
    if i in ['ghetto_name', 'camp_name']:
      search[i] = {'$in': [args[i]]}
    else:
      search[i] = args[i]
  # add year-based query values
  if ('min_year' in args) and ('max_year' in args):
    search['recording_year'] = {
      '$gte': int(args['min_year']),
      '$lte': int(args['max_year']),
    }
  return search

##
# Query Projections
##

projections = {
  'filters': {
    '_id': 0,
    'collection': 1,
    'gender': 1,
    'interviewee_name': 1,
    'recording_year': 1,
    'ghetto_names': 1,
    'camp_names': 1,
    'testimony_id': 1,
  },
  'table_of_contents': {
    '_id': 0,
    'rg_number': 1,
    'accession_number': 1,
    'collection': 1,
    'testimony_title': 1,
    'testimony_id': 1,
  },
  'testimony': {
    '_id': 0,
    'structured_transcript': 0,
    'status': 0
  }
}

##
# Auth routes
##

@app.route('/login')
def login():
  '''Send a user to the CAS endpoint where they can authenticate'''
  service_url = get_service_url(request)
  cas_login_url = cas_client.get_login_url(service_url=service_url)
  return redirect(cas_login_url)

@app.route('/validate')
def validate():
  '''Validate that a user's CAS auth attempt was or wasn't successful'''
  ticket = request.args.get('ticket')
  auth_url = get_service_url(request)
  if ticket:
    response = cas_client.perform_service_validate(
      ticket=ticket, service_url=auth_url)
    # user has authenticated
    if response and response.success:
      session['authenticated'] = True
      return redirect(url_for('index'))
  # attempt to authenticate the user
  if 'authenticated' in session:
    del session['authenticated']
  cas_login_url = cas_client.get_login_url(service_url=auth_url)
  return redirect(cas_login_url)

def get_service_url(_request):
  '''
  Identify the url to which logged in users will be sent
  @param {Flask.request} a flask request object
  @returns {str} the url to which users should be sent upon authentication
  '''
  return '/'.join(_request.url.split('/')[:3]) + '/validate'

##
# Query param auth
##

def auth_params_present(args):
  '''
  @args:
    {dict} args: a dictionary of query params passed on route request
  @returns:
    {bool} boolean indicating whether the correct auth params are present
  '''
  return args.get('security_code', '') == os.environ['LTS_AUTH_CODE']

##
# View route
##

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
  '''Return index.html for all non-api routes'''
  #pylint: disable=unused-argument
  if use_cas_auth or use_param_auth:
    # check for param auth on query
    if use_param_auth and auth_params_present(request.args):
      session['authenticated'] = True
    if session.get('authenticated'):
      return send_from_directory(app.static_folder, 'index.html')
    return redirect(url_for('login'))
  return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
  app.run(host='0.0.0.0', port=7082, threaded=True)

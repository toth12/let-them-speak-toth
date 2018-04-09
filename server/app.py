'''server/app.py - main api app declaration'''
import sys
from flask import Flask, jsonify, send_from_directory, request
from flask_cors import CORS
[sys.path.append(i) for i in ['.', '..', 'server']]
from server.blacklab import search_blacklab #pylint: disable=wrong-import-position
from server.db import get_db #pylint: disable=wrong-import-position

app = Flask(__name__, static_folder='../build')
CORS(app)

app.debug = True

##
# API routes
##

@app.route('/api/tree')
def items():
  '''Fetch tree data'''
  db = get_db() #pylint: disable=invalid-name
  try:
    return jsonify(list(db.fragments.find({}, {'_id': 0})))
  except Exception: #pylint: disable=broad-except
    return jsonify({'err': 'tree fragment fetch error'})

@app.route('/api/testimony')
def testimony():
  '''Fetch a transcript'''
  db = get_db() #pylint: disable=invalid-name
  args = {'testimony_id': request.args.get('testimony_id')}
  result = list(db.testimonies.find(args, {'_id': 0}))
  if result:
    return jsonify(result[0])
  return jsonify([])

@app.route('/api/table_of_contents')
def table_of_contents():
  '''Fetch all testimonies for the table of contents'''
  db = get_db() #pylint: disable=invalid-name
  projection = {
    '_id': 0,
    'rg_number': 1,
    'accession_number': 1,
    'collection': 1,
    'testimony_title': 1,
    'testimony_id': 1,
  }
  limit = 10
  start = int(request.args.get('start', 0))
  args = {}
  total = db.testimonies.find(args).count()
  results = db.testimonies.find(args, projection).skip(start).limit(limit)
  return jsonify({
    'total': int(total),
    'results': list(results),
  })

@app.route('/api/search')
def search():
  '''Fetch testimonies that match a query'''
  limit = int(request.args.get('limit', 20))
  start = int(request.args.get('start', 0))
  query = request.args.get('query', '')
  try:
    results = search_blacklab(offset=start, limit=limit, query=query)
    return jsonify(results)
  except Exception: #pylint: disable=broad-except
    return jsonify({'err': 'search error'})

@app.route('/api/sentences')
def sentences():
  '''Fetch sentence indices given a testimony id and token indices'''
  db = get_db() #pylint: disable=invalid-name
  testimony_id = request.args.get('testimony_id', None)
  token_start = int(request.args.get('token_start', 0))
  token_end = int(request.args.get('token_end', 0))
  results = db.tokens.find({'testimony_id': testimony_id}, {'_id': 0})
  tokens = list(results)[0]['tokens']
  return jsonify({
    'sentenceStart': tokens[token_start]['sentence_index'],
    'sentenceEnd': tokens[token_end]['sentence_index']
  })

##
# View route
##

@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def index(path):
  '''Return index.html for all non-api routes'''
  #pylint: disable=unused-argument
  return send_from_directory(app.static_folder, 'index.html')

if __name__ == '__main__':
  app.run(host='0.0.0.0', port=7082, threaded=True)

'''server/app.py - main api app declaration'''
from flask import Flask, jsonify, send_from_directory, request
from flask_cors import CORS
from pymongo import MongoClient
from search import format_search_results

'''Main wrapper for app creation'''
app = Flask(__name__, static_folder='../build')
CORS(app)

app.debug = True

# initialize db connection
host = 'localhost'
port = 27017
db = MongoClient(host, port, connect=False)['lts']

##
# API routes
##

@app.route('/api/tree')
def items():
  '''Fetch tree data'''
  return jsonify(list(db.fragments.find({}, {'_id': 0})))

@app.route('/api/testimony')
def testimony():
  '''Fetch a transcript'''
  args = {'testimony_id': request.args.get('testimony_id')}
  result = list(db.testimonies.find(args, {'_id': 0}))
  if result:
    return jsonify(result[0])
  return []

@app.route('/api/table_of_contents')
def table_of_contents():
  '''Fetch all testimonies for the table of contents'''
  projection = {
    '_id': 0,
    'rg_number': 1,
    'accession_number': 1,
    'collection': 1,
    'testimony_title': 1,
    'testimony_id': 1,
  }
  start = int(request.args.get('start', 0))
  return jsonify(list(db.testimonies.find({}, projection).skip(start)))

@app.route('/api/search')
def search():
  '''Fetch testimonies that match a query'''
  limit = 20
  start = int(request.args.get('start', 0))
  query = request.args.get('query', '')
  args = {'full_text': {'$regex': query, '$options': 'i'}}
  total = db.testimonies.find(args).count()
  results = db.testimonies.find(args, {'_id': 0}).skip(start).limit(limit)
  return jsonify({
    'total': int(total),
    'results': format_search_results(query, list(results)),
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
  app.run(host='0.0.0.0', port=7082)

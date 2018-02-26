'''server/app.py - main api app declaration'''
from flask import Flask, jsonify, send_from_directory, request
from flask_cors import CORS
from pymongo import MongoClient

'''Main wrapper for app creation'''
app = Flask(__name__, static_folder='../build')
CORS(app)

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
  query = {'testimony_id': request.args.get('testimony_id')}
  return jsonify(list(db.testimonies.find(query, {'_id': 0}))[0])

@app.route('/api/search')
def search():
  '''Fetch search results'''
  limit = 20
  start = request.args.get('start') or 0
  query = {}
  total = db.testimonies.find(query).count()
  results = db.testimonies.find(query, {'_id': 0}).skip(start).limit(limit)
  return jsonify({
    'total': int(total),
    'results': list(results),
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
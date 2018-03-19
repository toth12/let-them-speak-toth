'''Test that all server-level dependencies are met'''
from subprocess import check_output
from urllib.request import urlopen
from pymongo import MongoClient
from py4j.java_gateway import JavaGateway, Py4JNetworkError

def test_mongo_is_running():
  '''Validate mongo is running'''
  db = MongoClient('localhost', 27017)['lts']
  assert db

def test_mvn_present():
  '''Validate JVM is present'''
  mvn_path = check_output(['which', 'mvn'])
  assert len(mvn_path)

def test_blacklab_running():
  '''Validate Blacklab server is running'''
  response = urlopen('http://localhost:8080')
  assert 'tomcat' in response.read().decode('utf8').lower()
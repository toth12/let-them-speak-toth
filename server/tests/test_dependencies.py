'''Test that all server-level dependencies are met'''
from subprocess import check_output
from urllib.request import urlopen
from py4j.java_gateway import JavaGateway, Py4JNetworkError
import os
import sys
[sys.path.append(i) for i in ['server', '..', '.']]
from db import get_db

def test_mongo_is_running():
  '''Validate mongo is running'''
  db = get_db()
  assert db

def test_mvn_present():
  '''Validate JVM is present'''
  mvn_path = check_output(['which', 'mvn'])
  assert len(mvn_path)

def test_blacklab_running():
  '''Validate Blacklab server is running'''
  response = urlopen('http://' + os.environ['TOMCAT_HOST'] + ':8080')
  assert 'tomcat' in response.read().decode('utf8').lower()
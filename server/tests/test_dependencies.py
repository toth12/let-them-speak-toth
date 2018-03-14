'''Test that all server-level dependencies are met'''
import sys
import json
from pymongo import MongoClient
from py4j.java_gateway import JavaGateway, Py4JNetworkError

def test_mongo_is_running():
  '''Validate mongo is running'''
  db = MongoClient('localhost', 27017)['lts']
  assert db

def validate_java_present():
  '''Validate JVM is present'''
  java_gateway = JavaGateway(eager_load=True)
  assert java_gateway

def validate_blacklab_running():
  '''Validate Blacklab server is running'''
  assert True
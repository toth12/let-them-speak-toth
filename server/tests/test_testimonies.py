'''Test structure of testimony collection members'''

from six import string_types
import sys
[sys.path.append(i) for i in ['server', '..', '.']]
from db import get_db

testimony_schema = {
  'testimony_id': string_types,
  'interviewee_name': string_types,
  'gender': string_types,
  'collection': string_types,
  'shelfmark': string_types,
  'recording_year': [int, type(None)],
  'camp_names': [string_types],
  'ghetto_names': [string_types],
  'html_transcript': string_types,
  'media_url': [string_types],
  'thumbnail_url': string_types,
  'testimony_title': string_types,
  'interview_summary': string_types,
  'provenance': string_types,
}

def test_testimony_format():
  '''
  Ensure all testimonies have the appropriate format
  '''
  db = get_db()
  for i in db['testimonies'].find({}, {'id': 0}):
    for field in testimony_schema.keys():
      print(' * validating', field, 'in testimony with id', i['_id'])
      if isinstance(testimony_schema[field], list):
        # handle singly-typed case
        if len(testimony_schema[field]) == 1:
          assert isinstance(i[field], list)
          for j in i[field]:
            assert isinstance(j, testimony_schema[field][0])
        # handle variably-typed case
        else:
          found_matching_type = False
          for j in testimony_schema[field]:
            if isinstance(i[field], j):
              found_matching_type = True
          assert found_matching_type
      else:
        assert isinstance(i[field], testimony_schema[field])

if __name__ == '__main__':
  test_testimony_format()

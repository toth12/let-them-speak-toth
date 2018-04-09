'''Test structure of testimony collection members'''

import sys
[sys.path.append(i) for i in ['server', '..', '.']]
from db import get_db

testimony_schema = {
  'testimony_id': str,
  'interviewee_name': str,
  'gender': str,
  'collection': str,
  'shelfmark': str,
  'recording_year': int,
  'camp_names': [str],
  'ghetto_names': [str],
  'html_transcript': str,
  'media_url': [str],
  'thumbnail_url': str,
  'testimony_title': str,
  'interview_summary': str,
  'provenance': str,
}

def test_testimony_format():
  '''
  Ensure all testimonies have the appropriate format
  '''
  db = get_db()
  for i in db['testimonies'].find({}, {'id': 0}):
    for field in testimony_schema.keys():
      print(' * validating', field, 'in testimony with mongo id', i['_id'])
      if isinstance(testimony_schema[field], list):
        assert isinstance(i[field], list)
        for j in i[field]:
          assert isinstance(j, testimony_schema[field][0])
      else:
        assert isinstance(i[field], testimony_schema[field])

if __name__ == '__main__':
  test_testimony_format()
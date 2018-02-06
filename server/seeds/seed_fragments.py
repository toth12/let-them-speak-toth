'''
Generate seed data for the fragments collection. Schema:

{
  label: string,
  essay_id: string
  tree: {
    label: string,
    testimony_id: string
    testimony_position: integer
    video_excerpt_url: string
    children: []
  }
}
'''

import random
from faker import Faker
from pymongo import MongoClient

fake = Faker()
client = MongoClient()
db = client.lts
url = 'https://s3-us-west-2.amazonaws.com/lab-apps/let-them-speak'
video_url = url + '/videos/dev/shoah-sample.mp4'
audio_url = url + '/videos/dev/ushmm-sample.mp3'

def get_media():
  '''Return either an audio or video url'''
  if random.random() > 0.5:
    return video_url
  return audio_url

def get_int():
  '''Generate a random int between 0 and 9999999'''
  return random.randint(0, 9999999)

def get_node(is_parent=False):
  '''Generate a parent or leaf node for a tree structure'''
  if is_parent:
    label = fake.word(ext_word_list=None) #pylint: disable=no-member
  else:
    label = fake.sentence(nb_words=6, variable_nb_words=True) #pylint: disable=no-member

  return {
    'label': label,
    'testimony_id': get_int(),
    'testimony_position': get_int(),
    'media_url': get_media(),
    'media_offset': random.randint(1, 20),
    'children': []
  }

records = []
for c, i in enumerate(range(10)):
  record = {
    'label': fake.word(ext_word_list=None), #pylint: disable=no-member
    'essay_id': c,
    'tree': {}
  }

  # build the tree
  for j in range(random.randint(7, 10)):
    parent = True
    node = get_node(is_parent=parent)
    if parent:
      for k in range(8, 12):
        _parent = random.random() > 0.3
        child = get_node(is_parent=_parent)
        if _parent:
          for l in range(4, 8):
            grandchild = get_node()
            child['children'].append(grandchild)
        node['children'].append(child)
    record['tree'] = node
  records.append(record)

# remove all records and add seed records
db.fragments.remove({})
db.fragments.insert_many(records)
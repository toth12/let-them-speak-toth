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

def get_testimony_id(testimony_ids):
  '''Get a random testimony id'''
  idx = random.randint(0, len(testimony_ids) - 1)
  return testimony_ids[idx]

def get_children():
  '''Get the children value for a top-level node'''
  children = []
  for _ in range(8, 12):
    _parent = random.random() > 0.3
    child = get_node(is_parent=_parent)
    if _parent:
      for _ in range(4, 8):
        grandchild = get_node()
        child['children'].append(grandchild)
    children.append(child)
  return children

def get_fragments(testimony_ids):
  '''Return a list of objects for the fragments table'''
  fragments = []
  for _ in range(10):
    fragment = {
      'label': fake.word(ext_word_list=None), #pylint: disable=no-member
      'essay_id': get_testimony_id(testimony_ids),
      'tree': {}
    }
    # build the tree
    for _ in range(random.randint(7, 10)):
      parent = True
      node = get_node(is_parent=parent)
      if parent:
        node['children'] = get_children()
      fragment['tree'] = node
    fragments.append(fragment)
  return fragments
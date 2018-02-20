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

def get_testimony_id(testimony_ids):
  '''Get a random testimony id'''
  idx = random.randint(0, len(testimony_ids) - 1)
  return testimony_ids[idx]

def get_node(is_parent=False):
  '''Generate a parent or leaf node for a tree structure'''
  if is_parent:
    label = fake.word(ext_word_list=None) #pylint: disable=no-member
  else:
    label = fake.sentence(nb_words=12, variable_nb_words=True) #pylint: disable=no-member

  return {
    'label': label,
    'testimony_id': get_int(),
    'testimony_position': get_int(),
    'media_url': get_media(),
    'media_offset': random.randint(1, 20),
    'children': []
  }

def get_children():
  '''Get the second-gen children for a first-gen node'''
  children = []
  for _ in range(random.randint(4, 9)):
    children.append(get_node(is_parent=False))
  return children

def get_fragments(testimony_ids):
  '''Return a list of objects for the fragments table'''
  fragments = []
  for _ in range(10):
    label = fake.word(ext_word_list=None) #pylint: disable=no-member
    fragment = {
      'label': label,
      'essay_id': get_testimony_id(testimony_ids),
      'tree': get_node(is_parent=True)
    }
    fragment['tree']['label'] = label
    # first-generation children
    children = []
    n_parents = 0
    for _ in range(random.randint(8, 16)):
      parent = random.random() > 0.8
      if n_parents == 0:
        parent = True
      if n_parents == 3:
        parent = False
      node = get_node(is_parent=parent)
      if parent:
        node['children'] = get_children()
        n_parents += 1
      children.append(node)
    fragment['tree']['children'] = children
    fragments.append(fragment)
  return fragments
'''
Generate seed data for the testimonies collection. Schema:

{
  unique_id: str
  shelf_mark: str
  recording_year: int
  camp_names: [str]
  ghetto_names: [str]
  gender: string {male | female}
  collection: str
  cleaned_full_text: str
  video_url: str
  thumbnai_url: str
  testimony_title: str
  interview_summary: str
  provenance: str
  accession_number: str
  rg_number: str
}
'''

import random
from faker import Faker
from pymongo import MongoClient
from seed_fragments import get_fragments

fake = Faker()
client = MongoClient()
db = client.lts
url = 'https://s3-us-west-2.amazonaws.com/lab-apps/let-them-speak'
video_url = url + '/videos/dev/shoah-sample.mp4'
audio_url = url + '/videos/dev/ushmm-sample.mp3'
thumb_url = url + '/thumbnails/dev/preview.png'

def get_media():
  '''Return either an audio or video url'''
  if random.random() > 0.5:
    return video_url
  return audio_url

def get_int():
  '''Generate a random int between 0 and 9999999'''
  return random.randint(0, 9999999)

def get_gender():
  '''Return a fake gender'''
  if random.random() > 0.5:
    return 'female'
  return 'male'

def get_collection():
  '''Return a fake collection'''
  val = random.random()
  if val < 0.3:
    return 'USHMM'
  if (val >= 0.3) and (val <= 0.6):
    return 'SHOAH'
  return 'Fortunoff'

def get_full_text():
  '''Return fake full text content'''
  text = ''
  for _ in range(100):
    sentences = random.randint(5, 10)
    text += fake.paragraph(nb_sentences=sentences) + '\n' #pylint: disable=no-member
  return text

def get_interviewee_name(_gender):
  '''Return a fake first + last name'''
  if _gender == 'female':
    return fake.name_female() #pylint: disable=no-member
  return fake.name_male() #pylint: disable=no-member

testimonies = []
for _ in range(100):
  gender = get_gender()
  testimonies.append({
    'unique_id': str(get_int()),
    'shelf_mark': str(get_int()),
    'recording_year': random.randint(1970, 1990),
    'camp_names': ['camp_a', 'camp_b'],
    'ghetto_names': ['ghetto_a', 'ghetto_b'],
    'gender': gender,
    'interviewee_name': get_interviewee_name(gender),
    'collection': get_collection(),
    'cleaned_full_text': get_full_text(),
    'video_url': get_media(),
    'thumbnai_url': thumb_url,
    'testimony_title': fake.sentence(nb_words=6), #pylint: disable=no-member
    'interview_summary': fake.text(max_nb_chars=500), #pylint: disable=no-member
    'provenance': fake.words(nb=3), #pylint: disable=no-member
    'accession_number': str(get_int()),
    'rg_number': str(get_int()),
  })

testimony_ids = [i['unique_id'] for i in testimonies]
fragments = get_fragments(testimony_ids)

# remove all fragments and add seed fragments
db.fragments.remove({})
db.fragments.insert_many(fragments)

# remove all testimonies and add seed testimonies
db.testimonies.remove({})
db.testimonies.insert_many(testimonies)

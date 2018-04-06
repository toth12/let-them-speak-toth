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
  full_text: str
  media_url: str
  media_caption: str
  thumbnail_url: str
  testimony_title: str
  interview_summary: str
  provenance: str
  accession_number: str
  rg_number: str
}
'''

from random import random, randint
import os
import sys
from faker import Faker
[sys.path.append(i) for i in ['server', '..', '../..']]
from server.db import get_db #pylint: disable=wrong-import-position
from server.seeds.seed_fragments import get_fragments #pylint: disable=wrong-import-position
from server.seeds.utils import rm_dir, make_dir, write_text #pylint: disable=wrong-import-position, no-name-in-module

fake = Faker()
db = get_db()
n_testimonies = 5
paragraph_boundary = '\n'
folia_dir = os.path.join('server', 'seeds', 'folia')
url = 'https://s3-us-west-2.amazonaws.com/lab-apps/let-them-speak'
video_url = url + '/videos/dev/shoah-sample.mp4'
audio_url = url + '/videos/dev/ushmm-sample.mp3'
thumb_url = url + '/thumbnails/dev/preview.png'

rm_dir(folia_dir)
make_dir(folia_dir)

##
# Folia helpers
##

def write_folia(title, full_text, testimony_id):
  '''
  Write the folia content of a text file to disk
  @args:
    {str} title: the title of a testimony
    {str} full_text: the full text content of a testimony
    {str} testimony_id: the unique identifier for a testimony
  '''
  xml = get_top(testimony_id)
  xml += get_metadata(testimony_id, title)
  xml += '<text><div>'

  # tokenize paragraphs and sentences and add each to the xml
  s_idx = 0
  for paragraph in full_text.split(paragraph_boundary):
    for sentence in paragraph.split('.'):
      xml += '<s id="s' + str(s_idx) + '">'
      xml += '<t>' + sentence + '</t>'

      # tokenize each word in the sentence and add to the xml
      for word in sentence.split():
        xml += '<w>'
        xml += '<t>' + word + '</t>'
        xml += '<pos class="' + get_pos() + '"/>'
        xml += '<lemma class="' + word + '"/>'
        xml += '</w>'
      xml += '</s>'
      s_idx += 1

  # close the open tags
  xml += '</div></text></FoLiA>'

  # write the outfile
  outfile = os.path.join(folia_dir, testimony_id + '.xml')
  write_text(outfile, xml.strip())

def get_top(testimony_id):
  '''
  Get the top of a folia document given a testimony
  @args:
    {str} testimony_id: the unique identifier for a testimony
  '''
  return '''
  <?xml version='1.0' encoding='utf-8'?>
  <FoLiA xmlns:xlink="http://www.w3.org/1999/xlink"
    xmlns="http://ilk.uvt.nl/folia"
    xml:id="{0}"
    version="1.5.1"
    generator="seed_folia_util">
  '''.format(testimony_id)

def get_metadata(testimony_id, shelfmark):
  '''
  Get the metadata tags for a folia document given a testimony
  @args:
    {str} testimony_id: the unique identifier for a testimony
    {str} title: the title of a testimony
  '''
  return '''
  <metadata type="native">
    <annotations>
      <pos-annotation set="brown-tagset"/>
      <lemma-annotation set="treetagger"/>
    </annotations>
    <meta id="testimony_id">{0}</meta>
    <meta id="shelfmark">{1}</meta>
  </metadata>
  '''.format(testimony_id, shelfmark)

def get_pos():
  '''Get a random POS from the list of available pos vals'''
  pos = ['NP', 'CD', ',', 'VBZ', 'NN', 'IN']
  return pos[int(random())]

##
# Token helpers
##

def store_token_ids(testimony_id, full_text):
  '''
  Store a mapping from each token's index position to the idx of
  the sentence in which that token occurs
  '''
  t_idx = 0
  s_idx = 0
  tokens = []
  for paragraph in full_text.split(paragraph_boundary):
    for sentence in paragraph.split('.'):
      if sentence.split():
        for _ in sentence.split():
          tokens.append({
            'token_index': t_idx,
            'sentence_index': s_idx,
          })
          t_idx += 1
        s_idx += 1
  db.tokens.insert_one({'testimony_id': testimony_id, 'tokens': tokens})

##
# Testimony helpers
##

def get_media():
  '''Return either an audio or video url'''
  if random() > 0.5:
    return video_url
  return audio_url

def get_int():
  '''Generate a random int between 0 and 9999999'''
  return randint(0, 9999999)

def get_gender():
  '''Return a fake gender'''
  if random() > 0.5:
    return 'female'
  return 'male'

def get_collection():
  '''Return a fake collection'''
  val = random()
  if val < 0.3:
    return 'USHMM'
  if (val >= 0.3) and (val <= 0.6):
    return 'SHOAH'
  return 'Fortunoff'

def get_full_text():
  '''Return fake full text content'''
  text = ''
  for _ in range(100):
    sentences = randint(5, 10)
    text += fake.paragraph(nb_sentences=sentences) + '\n' #pylint: disable=no-member
  return text

def get_html(full_text):
  '''Return the full text in html with unique sentence ids'''
  html = ''
  s_idx = 0
  for paragraph in full_text.split(paragraph_boundary):
    html += '<p>'
    for sentence in paragraph.split('.'):
      if sentence.split():
        tag = '<span ' + 'id=s' + str(s_idx) + '>'
        tag += sentence.strip()
        tag += '. </span>'
        html += tag
        s_idx += 1
    html += '</p>'
  return html

def get_interviewee_name(_gender):
  '''Return a fake first + last name'''
  if _gender == 'female':
    return fake.name_female() #pylint: disable=no-member
  return fake.name_male() #pylint: disable=no-member

def seed_testimonies():
  '''Seed all testimonies and linked fragments'''

  # drop all extant collection records
  db.fragments.remove({})
  db.testimonies.remove({})
  db.tokens.remove({})

  testimonies = []
  for testimony_idx, _ in enumerate(range(n_testimonies)):
    print(' * seeding testimony number', testimony_idx + 1)
    gender = get_gender()
    shelfmark = str(get_int())
    full_text = get_full_text()
    testimony_id = str(get_int())
    store_token_ids(testimony_id, full_text)
    write_folia(shelfmark, full_text, testimony_id)
    testimonies.append({
      'testimony_id': testimony_id,
      'interviewee_name': get_interviewee_name(gender),
      'gender': gender,
      'collection': get_collection(),
      'shelfmark': shelfmark,
      'recording_year': randint(1970, 1990),
      'camp_names': ['camp_a', 'camp_b'],
      'ghetto_names': ['ghetto_a', 'ghetto_b'],
      'full_text': full_text, # not required
      'html_transcript': get_html(full_text),
      'media_url': [get_media()],
      'thumbnail_url': thumb_url,
      'testimony_title': fake.sentence(nb_words=5), #pylint: disable=no-member,
      'interview_summary': fake.text(max_nb_chars=500), #pylint: disable=no-member
      'provenance': ' '.join(fake.words(nb=3)), #pylint: disable=no-member
    })

  testimony_ids = [j['testimony_id'] for j in testimonies]
  fragments = get_fragments(testimony_ids)

  # save all collections
  db.fragments.insert_many(fragments)
  db.testimonies.insert_many(testimonies)

if __name__ == '__main__':
  seed_testimonies()
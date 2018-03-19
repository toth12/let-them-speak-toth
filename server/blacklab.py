'''Main interface to BlackLab server'''

from urllib.request import urlopen
from urllib.parse import quote
import json

def search_blacklab(*args, **kwargs):
  '''
  Run a search against the blacklab server. For full documentation
  on these parameters, see the official BlackLab documentation:
  http://inl.github.io/BlackLab/blacklab-server-overview.html
  @args:
    {int} offset: 0-based index of the first result to return
    {int} limit: the number of results to return
    {str} query: the raw query from a user
  '''
  root = 'http://localhost:8080/blacklab-server-1.6.0/lts/hits'
  args = {
    'first': kwargs.get('offset', 0),
    'limit': kwargs.get('limit', 20),
    'patt': get_query_pattern(kwargs.get('query', 'test')),
    'waitfortotal': 'true',
    'outputformat': 'json',
    'prettyprint': 'no',
    'wordsaroundhit': kwargs.get('window', 5),
  }
  query = root + '?'
  for idx, arg in enumerate(args):
    if idx > 0:
      query += '&'
    query += arg + '=' + quote(str(args[arg]))
  result = request_url(query)
  return parse_response(result)


def get_query_pattern(query):
  '''
  Curate a search query from a user-provided query expression
  @args:
    {str} query: the raw, user-provided query
  @returns:
    {str} the user's query in curated form
  '''
  query = query.strip().strip('"')
  # case of CQL query
  if (query[0] == '[') and (query[-1] == ']'):
    return query
  # case of multiword query
  elif ' ' in query:
    formatted = ''
    for i in query.split():
      formatted += '[word="' + i + '"]'
    return formatted
  # case of simple query
  return '"' + query + '"'


def request_url(url):
  '''
  Request the JSON content at a given url
  @arsg:
    {str} url: the url whose content should be fetched
  @returns:
    {obj} an object with the JSON served at `url`
  '''
  print(' * requesting', url)
  json_response = urlopen(url).read().decode('utf8')
  return json.loads(json_response)


def parse_response(obj):
  '''
  Parse a BlackLab server response object into the required format
  @args:
    {obj} a response from a BlackLab server query
  @returns:
    {obj} an object in the format required by the client
  '''
  total = obj['summary']['numberOfHitsRetrieved']
  doc_infos = obj['docInfos']
  results = []
  for i in obj['hits']:
    results.append({
      'left': get_match_string(i['left']),
      'match': get_match_string(i['match']),
      'right': get_match_string(i['right']),
      'testimony_id': get_testimony_meta(i, 'testimony_id', doc_infos),
      'shelfmark': get_testimony_meta(i, 'shelfmark', doc_infos)
    })

  return {
    'total': total,
    'results': results,
  }


def get_match_string(obj):
  '''
  Parse an object with keys `punct` and `word` which indicates
  the word and punctuation that need to occur in sequence to
  reassemble a BlackLab input string
  @args:
    {obj} obj: either hits[i]['left'] or hits[i]['right']
  @returns:
    {str} the string contained in the given side of the hit
  '''
  match_string = ''
  for idx, i in enumerate(obj['word']):
    match_string += i + obj['punct'][idx]
  return match_string


def get_testimony_meta(obj, field, doc_infos):
  '''
  Return the `field` attribute for a hit object in a BlackLab query response
  @args:
    {obj} obj: a BlackLab hit object
    {str} field: the metadata field to return
    {obj} doc_infos: an object with all hit metadata
  @returns:
    {str} the `field` metadata attribute for this hit
  '''
  return doc_infos[obj['docPid']][field]


if __name__ == '__main__':
  response = search_blacklab()
  print(response)
# -*- coding: utf-8 -*-
# '''Main interface to BlackLab server'''

# try to import from python 3, fallback to 2
try:
  from urllib.request import urlopen
  from urllib.parse import quote, unquote
except ImportError:
  from urllib2 import urlopen
  from urllib import quote, unquote #pylint: disable=ungrouped-imports
import json
import os

def search_blacklab(params):
  '''
  Run a search against the blacklab server. For full documentation
  on these parameters, see the official BlackLab documentation:
  http://inl.github.io/BlackLab/blacklab-server-overview.html
  @args:
    {dict} args: all query args passed to a search endpoint
  '''
  root = 'http://' + os.environ['TOMCAT_HOST']
  root += ':8080/blacklab-server-1.7.3/lts/hits'
  query = get_query_pattern(params.get('query', 'test'))
  # query-based arguments
  args = {
    'first': params.get('start', 0),
    'limit': params.get('limit', 20),
    'patt': unquote(query),
    'waitfortotal': 'true',
    'outputformat': 'json',
    'prettyprint': 'no',
    'wordsaroundhit': params.get('window', 5),
  }

  # compose url for blacklab query
  query = root + '?'
  for idx, arg in enumerate(args):
    if idx > 0: query += '&'
    query += arg + '=' + quote(str(args[arg]))
  # add filter params
  filter_join = '%20AND%20'
  non_filter_fields = ['start', 'limit', 'query', 'min_year', 'max_year']
  filter_params = [i for i in params if i not in non_filter_fields]
  if filter_params:
    query += '&filter='
    for i in filter_params:
      query += i + ':' + quote('"' + str(params[i]) + '"') + filter_join
    query = query.rstrip(filter_join)
    query += add_year_params(params, filter_join)
  else:
    query += add_year_params(params, '&filter=')
  
  print("Calling request_url " + str(query))
  result = request_url(query)
  print("Got result " + str(result))
  return parse_response(result)


def get_query_pattern(query):
  '''
  Curate a search query from a user-provided query expression
  @args:
    {str} query: the raw, user-provided query
  @returns:
    {str} the user's query in curated form
  '''
  query = query.strip()
  quote_chars = '“”"\''
  for i in quote_chars:
    try:
      query = query.decode("utf8").strip(i.decode("ISO8859-1"))
    except Exception as e:
      raise Exception("Error stripping char: %s: %s" % (i, e))

  parens = ['[', ']', '(', ')']
  cql_suffixes = ['+']
  # case of CQL query
  start_is_cql = query[0] in parens
  end_is_cql = (query[-1] in parens) or (query[-1] in cql_suffixes)
  if query and start_is_cql and end_is_cql:
    return query
  # if this is not a CQL query, replace quotation marks
  for i in quote_chars:
    # retain apostrophes
    if i == '\'': continue
    query = query.replace(i, '')
  # case of multiword query
  elif ' ' in query:
    formatted = ''
    for i in query.split():
      # handle OR operator
      if i == '|':
        formatted += ' | '
      # handle query token
      else:
        formatted += '[word="' + i + '"]'
    return formatted
  # case of single word query
  return '"' + query + '"'


def add_year_params(params, prefix):
  '''
  Given a url param dict, return a string that limits the
  year range of matches if the user passed min_year and
  max_year values
  @args:
    {dict} params: the paramters passed through the url to the search endpoint
    {str} prefix: a prefix to prepend to the returned query params (if relevant)
  @returns:
    {str} a string with the year query params encoded (if applicable)
  '''
  if ('min_year' not in params) or ('max_year' not in params):
    return ''
  param = ''
  param += prefix + 'recording_year:'
  param += '%5B' + params['min_year'] + '%20' + params['max_year'] + '%5D'
  return param


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
  total = obj["summary"]["numberOfHits"]

  doc_infos = obj['docInfos']
  results = []
  for h in obj['hits']:
    results.append({
      'left': get_match_string(h['left']),
      'match': get_match_string(h['match']),
      'right': get_match_string(h['right']),
      'testimony_id': get_testimony_meta(h, 'testimony_id', doc_infos),
      'shelfmark': get_testimony_meta(h, 'shelfmark', doc_infos),
      'token_start': h['start'],
      'token_end': h['end']
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
  response = search_blacklab({})
  print(response)

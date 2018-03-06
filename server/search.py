'''Helpers to support document searching'''
from random import random

def format_search_results(query, results):
  '''
  Find the first instance of query in each result,
  and return the offsets of those values in their
  respective strings
  @args:
    {str} query: the user-provided search query
    [{obj}] results: results from mongo
  @returns:
    [{obj}] a list of result objects with start
      and end offsets
  '''
  formatted = []
  window_size = 200
  query = query.lower()
  for i in results:
    start_match = i['full_text'].lower().find(query)
    start = max(0, start_match - window_size)
    end = min(start_match + len(query) + window_size, len(i['full_text']))
    match_window = i['full_text'][start:end]
    formatted.append({
      'match_sentence_idx': random() * 100,
      'match_string': match_window,
      'start_char': match_window.lower().find(query.lower()),
      'testimony_id': i['testimony_id'],
    })
  return results
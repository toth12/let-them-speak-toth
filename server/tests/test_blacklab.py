'''Test that BlackLab queries return correct results'''

import sys
[sys.path.append(i) for i in ['server', '..', '.']]
from blacklab import search_blacklab

def test_multiple_word_queries():
  '''
  Test that the BlackLab helpers handle multiword queries
  '''
  results = search_blacklab({'query': 'the rest'})
  assert_pattern_in_each_match(results['results'], 'the rest')

def test_regular_expressions():
  '''
  Test that the BlackLab helpers handle regex
  '''
  results = search_blacklab({'query': '[word="th.*"]'})
  assert_pattern_in_each_match(results['results'], 'th')

def test_vertical_pipes():
  '''
  Test that the BlackLab helpers handle vertical pipes
  '''
  results = search_blacklab({'query': 'this|that'})
  for i in results['results']:
    try:
      assert_pattern_in_each_match([i], 'this')
    except AssertionError:
      assert_pattern_in_each_match([i], 'that')

def test_complex_queries():
  '''
  Test that several complex queries return expected results
  '''
  results = search_blacklab({'query': '[pos="N.*"&lemma="run"]'})
  assert_pattern_in_each_match(results['results'], 'run')

def assert_pattern_in_each_match(results, pattern):
  '''
  Assert that each match in `results` contains `pattern`
  @args:
    {arr} results: a list of objects, each with a match attribute
    {str} pattern: the string pattern that should exist in each match
  '''
  for idx, i in enumerate(results):
    print(' * validating result', idx, 'contains pattern', pattern)
    assert pattern in i['match'].lower()

if __name__ == '__main__':
  test_multiple_word_queries()
  test_regular_expressions()
  test_vertical_pipes()

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Hero from './Hero';
import Loader from './Loader';
import Pagination from './Pagination';
import Filters from './Filters';
import ResultsCount from './ResultsCount';
import Err from './Error';
import { filtersChanged } from '../lib/filters';
import {
  fetchTestimony,
  highlightSentences,
} from '../actions/testimony';
import {
  fetchSearchResults,
  showInstructions,
  previousPage,
  nextPage,
  getPage,
  perPage,
} from '../actions/search';

class Search extends React.Component {
  constructor(props) {
    super(props)
    this.nextPage = this.nextPage.bind(this)
  }

  componentWillUnmount() {
    this.props.showInstructions();
  }

  componentDidUpdate(prevProps) {
    if (filtersChanged(prevProps, this.props)) {
      this.props.search($('#search-input').value)
    }
  }

  nextPage() {
    if (this.props.page + 1 < this.props.resultCount / perPage) {
      this.props.nextPage();
    }
  }

  render() {
    return (
      <div>
        <Hero>
          <Input search={this.props.search} />
        </Hero>
        <div className='container page-search'>
          {this.props.instructions ?
            <Instructions />
          : <Content nextPage={this.nextPage} {...this.props} />
          }
        </div>
      </div>
    )
  }
}

class Input extends React.Component {
  constructor(props) {
    super(props)
    this.handleKeys = this.handleKeys.bind(this)
  }

  handleKeys(e) {
    if (e.keyCode === 13 && e.target.value) {
      this.props.search(e.target.value);
    }
  }

  render() {
    return (
      <div className='search-container'>
        <div className='input-container'>
          <div className='background-image glass' />
          <input id='search-input' type='text' placeholder='Search Term'
            onKeyDown={this.handleKeys} />
        </div>
      </div>
    )
  }
}

const Instructions = props => (
  <div className='instructions'>
    <h2>Introduction to Corpus Search</h2>
    <p> Let them speak enables the searching of simple words and word sequences. By inserting you or you went into the search box, you will be presented a filterable concordance of their occurrences, and following a click, you can read results in the interviews. (At the moment listening in context is not yet available; interviews are played from the beginning).</p>
    <p>Interviews in Let them speak are also parts of a linguistic corpus, which is a collection of texts where certain types of properties about each word is available. Each word in Let them speak has two properties: the dictionary form (lemma) and the grammatical category of the word (part of speech). Returning to the previous example, this enables the retrieval of not only I went but also I go. To activate the corpus search, user is now requested to use the Corpus Query Language [CQL]. (The development of a comprehensive user interface is underway). This is a pattern matching language that combines a great variety of information to match sequences of words in texts. </p>
    <p>CQL can help to match individual words with certain attributes. Each word to be matched has to be written between square brackets:</p>
    <code>[lemma="go"]</code>
    <p>Thanks to defining lemma or dictionary form as attribute, this pattern will retrieve the occurrences of not only went but also go, goes, going.</p>
    <p>Attributes can be also combined. Consider for instance that you want to retrieve interviews where victims speak about working in a mine. To differentiate mine as a noun from mine as a possessive pronoun, you need to add the grammatical category as well. We do this by adding the attribute pos, and by defining the grammatical category with the pos attribute. When adding linguistic annotation, the grammatical category codes of the Penn Treebank Project were used (see the complete list <a target="_blank" href="https://www.ling.upenn.edu/courses/Fall_2003/ling001/penn_treebank_pos.html">here</a>)</p>
    <code>[lemma="mine"  pos="NN"] </code>
    <p>Note that the advantage of using lemma here is that the query also returns occurrences of mine in the plural form.</p>
    <p>CQL also enables the construction of sequences or patterns.</p>
    <code>[lemma="I"] [lemma="go"]</code>
    <p>This retrieves I go, I went but it does not retrieve for instance I will go, I could not go, etc. To face this, one can add a wild card.</p>
    <code>[lemma="I"] [ ] [lemma="go"]</code>
    <p>This finds a sequence of words where I is the first word, the suffixed forms of go is the last word, and any one word can be in-between. This pattern however does not match I will not go. It is therefore possible to quantify the number of words that can be in-between.</p>
    <p>Only one word:</p>
    <code>[lemma="I"] [ ]&#123;1&#125; [lemma="go"]</code>
    <p>One or two words:</p>
    <code>[lemma="I"] [ ]&#123;1,2&#125; [lemma="go"]</code>
    <p>The editor works on a more comprehensive guide on CQL. Until the accomplishment of these guides, two more topic specific use scenarios are presented.</p>
    <p>A key moment in an interview when the interviewee uses the expression, I will never forget. This can be however expressed in many different ways: I cannot forget, I was unable to forget, I always remember, etc. If you simply search for remember, your are given tens of thousands of search results. CQL can help to narrow this search.</p>
    <code>[lemma="never"] []&#123;0,5&#125; [lemma="forget"]</code>&nbsp;
    <code>[lemma="always"] []&#123;0,5&#125; [lemma="remember"]</code>
    <p>And the two patterns can be combined into one by means of parentheses and the | sign: </p>
    <code>([lemma="never"] []&#123;0,5&#125; [lemma="forget"]) | ([lemma="always"] []&#123;0,5&#125; [lemma="remember"])</code>
    <p>Finding instances of certain behaviors by certain groups is also an important research goal. How can one for instance find examples of guards helping inmates? The following pattern matches guard and help in close proximity.</p>
    <code>[lemma="guard"] []&#123;0,5&#125; [lemma="help"]</code>
  </div>
)

class Content extends React.Component {
  render() {
    let content;
    if (this.props.searchErr || this.props.testimonyErr) {
      return <Err />;
    } else if (this.props.searching && !this.props.resultCount) {
      return <Loader />;
    } else {
      return <Results {...this.props} />;
    }
  }
}

const Results = props => (
  <section className='results'>
    <div className='restore-instructions'
      onClick={props.showInstructions}>
      Back to Instructions
    </div>
    <ResultsCount resultCount={props.resultCount} />
    <div>
      {props.searching
        ? <Loader />
        : null
      }
      <Filters />
      <ResultTable {...props} />
      {props.resultCount && props.resultCount > perPage
        ? <Pagination
            items={props.resultCount}
            activePage={props.page}
            perPage={perPage}
            pageClick={props.getPage}
            leftArrowClick={props.previousPage}
            rightArrowClick={props.nextPage} />
        : null
      }
    </div>
  </section>
)

const ResultTable = props => (
  <div className='results-table'>
    <div className='row headers'>
      <div className='idx'>No.</div>
      <div className='id'>Shelfmark</div>
      <div className='exerpt'>Excerpt</div>
    </div>
    <div className='rows'>
      {props.results.map((r, i) => (
        <Result key={i}
          idx={(props.page * perPage) + i+1}
          result={r}
          fetchTestimony={props.fetchTestimony}
          highlightSentences={props.highlightSentences} />
      ))}
    </div>
  </div>
)

const Result = props => (
  <div className='row' onClick={
      () => {
        props.highlightSentences({
          start: props.result.token_start,
          end: props.result.token_end,
          testimonyId: props.result.testimony_id,
          lookupSentences: true,
        })
        props.fetchTestimony(props.result.testimony_id)
      }
    }>
    <div className='idx'>{props.idx}</div>
    <div className='id'>{props.result.shelfmark}</div>
    <div className='hit-left'>{getHit(props.result.left, 'left')}</div>
    <div className='hit-highlight'>{getHit(props.result.match, 'match')}</div>
    <div className='hit-right'>{getHit(props.result.right, 'right')}</div>
  </div>
)

const getHit = (str, side) => {
  const length = 20;
  const matchLen = 16;
  str = str.trim();
  switch (side) {
    case 'left':
      return '...' + clean(str.substring(str.length - length, str.length));
    case 'match':
      return str.length <= matchLen ? str :
        clean(str.substring(0, matchLen/2)) + '...' +
        clean(str.substring(str.length-matchLen/2, str.length));
    case 'right':
      return clean(str.substring(0, Math.min(length, str.length))) + '...';
  }
}

// reserved chars -/\^$*+?.()|[]{} TODO: linearize
const clean = s => {
  // reserved characters
  s = s.replace(/ \./g, '.')
  s = s.replace(/ \?/g, '?')
  // non-reserved characters
  s = s.replace(/ !/g, '!')
  s = s.replace(/ ;/g, ';')
  s = s.replace(/ ,/g , ',')
  s = s.replace(/ :/g, ':')
  s = s.replace(/ '/g, "'")
  s = s.replace(/ "/g, '"')
  s = s.replace(/ --/g, ' -- ')
  return s.trim();
}

const $ = selector => document.querySelector(selector);

Result.PropTypes = {
  fetchTestimony: PropTypes.func.isRequired,
  highlightSentences: PropTypes.func.isRequired,
  idx: PropTypes.number.isRequired,
  result: PropTypes.shape({
    left: PropTypes.string.isRequired,
    match: PropTypes.string.isRequired,
    right: PropTypes.string.isRequired,
    shelfmark: PropTypes.string.isRequired,
    testimony_id: PropTypes.string.isRequired,
    token_start: PropTypes.number.isRequired,
    token_end: PropTypes.number.isRequired,
  })
}

const sharedProps = {
  fetchTestimony: PropTypes.func.isRequired,
  highlightSentences: PropTypes.func.isRequired,
  previousPage: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired,
  getPage: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
  searchErr: PropTypes.bool,
  searching: PropTypes.bool,
  testimonyErr: PropTypes.bool,
  instructions: PropTypes.bool.isRequired,
  page: PropTypes.number.isRequired,
  resultCount: PropTypes.number,
  results: PropTypes.arrayOf({
    left: PropTypes.string.isRequired,
    match: PropTypes.string.isRequired,
    right: PropTypes.string.isRequired,
    shelfmark: PropTypes.string.isRequired,
    testimony_id: PropTypes.string.isRequired,
    token_start: PropTypes.number.isRequired,
    token_end: PropTypes.number.isRequired,
  }).isRequired,
}

Search.PropTypes = sharedProps;
Content.PropTypes = sharedProps;
Results.PropTypes = sharedProps;
ResultTable.PropTypes = sharedProps;

const mapStateToProps = state => ({
  searching: state.search.searching,
  instructions: state.search.instructions,
  results: state.search.results,
  resultCount: state.search.resultCount,
  page: state.search.page,
  selected: state.filters.selected,
  years: state.filters.years,
  searchErr: state.search.err,
  testimonyErr: state.testimony.err,
})

const mapDispatchToProps = dispatch => ({
  showInstructions: () => dispatch(showInstructions()),
  search: phrase => dispatch(fetchSearchResults(phrase)),
  previousPage: () => dispatch(previousPage()),
  nextPage: () => dispatch(nextPage()),
  getPage: page => dispatch(getPage(page)),
  fetchTestimony: testimonyId => dispatch(fetchTestimony(testimonyId)),
  highlightSentences: obj => dispatch(highlightSentences(obj)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Search);

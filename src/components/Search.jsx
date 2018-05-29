import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Hero from './Hero';
import Loader from './Loader';
import Pagination from './Pagination';
import Filters from './Filters'
import Err from './Error';
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
    let updated = false;
    Object.keys(prevProps.selected).map(f => {
      if (prevProps.selected[f] !== this.props.selected[f]) {
        updated = true;
      }
    })
    Object.keys(prevProps.years).map(y => {
      if (prevProps.years[y] !== this.props.years[y]) {
        updated = true;
      }
    })
    if (updated) this.props.search($('#search-input').value)
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
    <h2>Introduction to Search</h2>
    <p>Lorem ipsum dolor sit amet, arcu vulputate egestas dolor wisi, fugiat vestibulum etiam mattis sit, curabitur elit nulla vel, mus quis elit porttitor nulla. Amet elit in convallis, metus nam at sed, ipsum phasellus a dapibus, ornare in massa pharetra. Montes elementum pede integer ac, pulvinar aliquam non in augue, orci nulla eros nulla. Vulputate ut sed eget eu, dolor aliquam velit quisque a. Fermentum venenatis rhoncus vitae congue, suspendisse potenti pellentesque vestibulum.</p>
    <p>Amet a. Tempor eu. Dignissim nunc. Morbi faucibus, fermentum urna in, vitae nulla habitasse. A sit, vehicula eleifend, per massa vitae. Amet a. Tempor eu. Dignissim nunc. Morbi faucibus, fermentum urna in, vitae nulla habitasse.</p>
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
    <Label resultCount={props.resultCount} />
    <div>
      {props.searching
        ? <Loader />
        : null
      }
      <Filters {...props} />
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

const Label = props => (
  <div className='results-label'>
    <span><b>Results </b></span>
    <span className='results-count'>
      <span>There are </span>
      <span><b>{props.resultCount}</b> </span>
      <span>results for your search</span>
    </span>
  </div>
)

const getHit = (str, side) => {
  const length = 20;
  const matchLen = 16;
  str = str.trim();
  switch (side) {
    case 'left':
      return str.substring(str.length - length, str.length) + '...';
    case 'match':
      return str.length <= matchLen ? str :
        str.substring(0, matchLen/2).trim() + '...' +
        str.substring(str.length-matchLen/2, str.length).trim();
    case 'right':
      return str.substring(0, Math.min(length, str.length)) + '...';
  }
}

const $ = selector => document.querySelector(selector);

Label.PropTypes = {
  resultCount: PropTypes.number.isRequired,
}

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

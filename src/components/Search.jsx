import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Hero from './Hero';
import Loader from './Loader';
import Pagination from './Pagination';
import { fetchTestimony } from '../actions/testimony';
import {
  fetchSearchResults,
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

  nextPage() {
    if (this.props.page < this.props.resultCount / perPage) {
      this.props.nextPage()
    }
  }

  render() {
    return (
      <div>
        <Hero>
          <Input search={this.props.search} />
        </Hero>
        <div className='container'>
          {this.props.instructions ?
            <Instructions />
          : <Content fetchNextPage={this.nextPage} {...this.props} />
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
    if (e.keyCode === 13) {
      this.props.search(e.target.value);
    }
  }

  render() {
    return (
      <div className='search-container'>
        <div className='input-container'>
          <div className='background-image glass' />
          <input type='text' placeholder='Search Term'
            onKeyDown={this.handleKeys} />
          <select>
            <option value='basic'>Basic</option>
            <option value='advanced'>Advanced</option>
          </select>
        </div>
      </div>
    )
  }
}

const Instructions = props => (
  <div>
    <h2>Introduction to Search</h2>
    <p>Lorem ipsum dolor sit amet, arcu vulputate egestas dolor wisi, fugiat vestibulum etiam mattis sit, curabitur elit nulla vel, mus quis elit porttitor nulla. Amet elit in convallis, metus nam at sed, ipsum phasellus a dapibus, ornare in massa pharetra. Montes elementum pede integer ac, pulvinar aliquam non in augue, orci nulla eros nulla. Vulputate ut sed eget eu, dolor aliquam velit quisque a. Fermentum venenatis rhoncus vitae congue, suspendisse potenti pellentesque vestibulum.</p>
    <p>Amet a. Tempor eu. Dignissim nunc. Morbi faucibus, fermentum urna in, vitae nulla habitasse. A sit, vehicula eleifend, per massa vitae. Amet a. Tempor eu. Dignissim nunc. Morbi faucibus, fermentum urna in, vitae nulla habitasse.</p>
  </div>
)

const Content = props => (
  <div>
    {props.searching ?
     <Loader />
    : <Results {...props} />
    }
  </div>
)

const Results = props => (
  <section className='results'>
    <Label resultCount={props.resultCount} />
    {props.resultCount ?
      <div>
        <ResultTable {...props} />
        <Pagination
          items={props.resultCount}
          activePage={props.page}
          perPage={perPage}
          pageClick={props.getPage}
          leftArrowClick={props.previousPage}
          rightArrowClick={props.fetchNextPage} />
      </div>
    : null
    }
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
          fetchTestimony={props.fetchTestimony} />
      ))}
    </div>
  </div>
)

const Result = props => (
  <div className='row' onClick={
      () => props.fetchTestimony(props.result.testimony_id)
    }>
    <div className='idx'>{props.idx}</div>
    <div className='id'>{props.result.shelfmark}</div>
    <div className='hit-left'>{getHit(props.result.left, 'left')}</div>
    <div className='hit-highlight'>{props.result.match}</div>
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
  return side === 'left' ?
      str.substring(str.length - length, str.length) + '...'
    : str.substring(0, Math.min(length, str.length)) + '...';
}

const mapStateToProps = state => ({
  searching: state.search.searching,
  instructions: state.search.instructions,
  results: state.search.results,
  resultCount: state.search.resultCount,
  page: state.search.page,
  err: state.search.err,
})

const mapDispatchToProps = dispatch => ({
  search: phrase => dispatch(fetchSearchResults(phrase)),
  previousPage: () => dispatch(previousPage()),
  nextPage: () => dispatch(nextPage()),
  getPage: page => dispatch(getPage(page)),
  fetchTestimony: testimonyId => dispatch(fetchTestimony(testimonyId))
})

export default connect(mapStateToProps, mapDispatchToProps)(Search);
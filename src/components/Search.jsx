import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Hero from './Hero';
import Loader from './Loader';
import Pagination from './Pagination';
import {
  fetchSearchResults,
  previousPage,
  nextPage,
  getPage,
} from '../actions/search';

const Search = props => (
  <div>
    <Hero>
      <Input search={props.search} />
    </Hero>
    <div className='container'>
      {props.instructions ?
        <Instructions />
      : <Content {...props} />
      }
    </div>
  </div>
)

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
        <ResultTable results={props.results} />
        <Pagination
          items={props.resultCount}
          start={props.start}
          perPage={20}
          pageClick={props.getPage}
          leftArrowClick={props.previousPage}
          rightArrowClick={props.nextPage} />
      </div>
    : null
    }
  </section>
)

const ResultTable = props => (
  <div className='results-table'>
    <div className='row headers'>
      <div className='idx'>No.</div>
      <div className='id'>ID</div>
      <div className='exerpt'>Excerpt</div>
    </div>
    <div className='rows'>
      {props.results.map((r, i) => (
        <Result key={i} idx={i+1} result={r} />
      ))}
    </div>
  </div>
)

const Result = props => (
  <div className='row'>
    <div className='idx'>{props.idx}</div>
    <div className='id'>{props.result.testimony_id}</div>
    <div className='hit-left'>{getHit(props.result.full_text, 50, 'left')}</div>
    <div className='hit-highlight'>search term</div>
    <div className='hit-right'>{getHit(props.result.full_text, 80, 'right')}</div>
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

const getHit = (str, start, side) => {
  const length = 20;
  return side === 'left' ?
      str.substring(start - length, start) + '...'
    : str.substring(start, start + length) + '...'
}

const mapStateToProps = state => ({
  searching: state.search.searching,
  instructions: state.search.instructions,
  results: state.search.results,
  resultCount: state.search.resultCount,
  start: state.search.start,
  err: state.search.err,
})

const mapDispatchToProps = dispatch => ({
  search: phrase => dispatch(fetchSearchResults(phrase)),
  previousPage: () => dispatch(previousPage()),
  nextPage: () => dispatch(nextPage()),
  getPage: page => dispatch(getPage(page)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Search);
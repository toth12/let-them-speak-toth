import React from 'react';
import Hero from './Hero';
import PropTypes from 'prop-types';
import Pagination from './Pagination';
import { connect } from 'react-redux';
import { fetchTestimony } from '../actions/testimony';
import {
  fetchTableOfContents,
  previousPage,
  nextPage,
  getPage,
  pageSize,
  perPage,
} from '../actions/contents';
import Filters from './Filters';

class Contents extends React.Component {
  constructor(props) {
    super(props)
    this.nextPage = this.nextPage.bind(this);
  }

  componentWillMount() {
    this.props.getPage(0);
    this.props.fetchTableOfContents();
  }

  componentDidUpdate(prevProps) {
    // the TOC updates when filters are set -> refetch values
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
    if (updated) this.props.getPage(0)
  }

  nextPage() {
    // Don't let users request beyond the final page
    if ((this.props.page + 1) * perPage < this.props.total) {
      this.props.nextPage()
    }
  }

  render() {
    return (
      <div className='page'>
        <Hero text='Table of Contents' />
        <div className='container page-toc'>
          <h2>Holocaust Testimonials Table of Contents</h2>
          {this.props.total ?
            <div className='toc-container'>
              <Table {...this.props} />
              <Filters />
              <Pagination
                items={this.props.total}
                activePage={this.props.page}
                perPage={perPage}
                pageClick={this.props.getPage}
                leftArrowClick={this.props.previousPage}
                rightArrowClick={this.nextPage}
              />
            </div>
            : null
          }
        </div>
      </div>
    )
  }
}

const Table = props => (
  <div className='toc-table'>
    {props.testimonies.map((t, idx) => (
      <div key={idx} className='toc-row' onClick={
          () => props.fetchTestimony(t.testimony_id)}>
        <span className='number'>{(props.page * perPage) + idx + 1}.</span>
        <div className='text'>
          <div>{ t.testimony_title }</div>
          <div className='meta'>
            <span>Provenance:</span>
            <span>{ t.provenance ? t.provenance + ' .' : ''}</span>
            <span>Courtesy of the</span>
            <span>{ t.collection ? t.collection + ' Archive.' : ''}</span>
          </div>
        </div>
      </div>
    ))}
  </div>
)

const sharedTypes = {
  testimonies: PropTypes.arrayOf(PropTypes.shape({
    collection: PropTypes.string,
    testimony_id: PropTypes.string,
    testimony_title: PropTypes.string,
  })),
  page: PropTypes.number.isRequired,
  total: PropTypes.number.isRequired,
  fetchTableOfContents: PropTypes.func.isRequired,
  nextPage: PropTypes.func.isRequired,
  previousPage: PropTypes.func.isRequired,
  getPage: PropTypes.func.isRequired,
  fetchTestimony: PropTypes.func.isRequired,
}

Contents.PropTypes = sharedTypes;
Table.PropTypes = sharedTypes;

const mapStateToProps = state => ({
  testimonies: state.contents.testimonies,
  selected: state.filters.selected,
  years: state.filters.years,
  page: state.contents.page,
  total: state.contents.total,
})

const mapDispatchToProps = dispatch => ({
  fetchTableOfContents: () => dispatch(fetchTableOfContents()),
  nextPage: () => dispatch(nextPage()),
  previousPage: () => dispatch(previousPage()),
  getPage: page => dispatch(getPage(page)),
  fetchTestimony: testimonyId => dispatch(fetchTestimony(testimonyId)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Contents);

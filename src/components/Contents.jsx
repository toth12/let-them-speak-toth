import React from 'react';
import Hero from './Hero';
import Pagination from './Pagination';
import { connect } from 'react-redux';
import {
  fetchTableOfContents,
  previousPage,
  nextPage,
  getPage,
  pageSize,
} from '../actions/contents';

class Contents extends React.Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    this.props.fetchTableOfContents()
  }

  render() {
    return (
      <div>
        <Hero text='Table of Contents' />
        <div className='container'>
          <h2>The Holocaust Testimonials of the Name Collection</h2>
          <Table {...this.props} />
          <Pagination
            items={this.props.testimonies.length}
            start={this.props.start}
            perPage={10}
            pageClick={this.props.getPage}
            leftArrowClick={this.props.previousPage}
            rightArrowClick={this.props.nextPage}
          />
        </div>
      </div>
    )
  }
}

const Table = props => (
  <div className='toc-table'>
    {props.testimonies.slice(props.start, props.start + pageSize).map((t, idx) => (
      <div key={idx} className='toc-row'>
        <span className='number'>{props.start + idx + 1}.</span>
        <div className='text'>
          <div>{ 'Oral history interview with ' + t.testimony_title }</div>
          <div className='meta'>
            <span>Accession Number:</span>
            <span>{ t.accession_number }.</span>
            <span>Courtesy of the</span>
            <span>{ t.collection } Archive.</span>
          </div>
        </div>
      </div>
    ))}
  </div>
)

const mapStateToProps = state => ({
  testimonies: state.contents.testimonies,
  start: state.contents.start,
})

const mapDispatchToProps = dispatch => ({
  fetchTableOfContents: () => dispatch(fetchTableOfContents()),
  nextPage: () => dispatch(nextPage()),
  previousPage: () => dispatch(previousPage()),
  getPage: page => dispatch(getPage(page)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Contents);
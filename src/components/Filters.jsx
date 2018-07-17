import React from 'react';
import { connect } from 'react-redux';
import { Typeahead } from 'react-bootstrap-typeahead';
import Slider from 'rc-slider';
import {
  setTypeahead,
  getFilterLevels,
  setFilterValue,
  setYearRange,
} from '../actions/filters';
import * as d3 from 'd3';
import 'rc-slider/assets/index.css';

class Filter extends React.Component {
  componentWillMount() {
    this.props.getFilterLevels()
  }

  render() {
    const createSliderWithTooltip = Slider.createSliderWithTooltip;
    const Range = createSliderWithTooltip(Slider.Range);
    const years = this.props.options.recording_years.reduce((arr, i) => {
      if (Number.isInteger(i)) arr.push(i); return arr;
    }, []);
    const yearRange = years.length
      ? d3.extent(years)
      : null;

    return (
      <div className='filter-container'>
        <div className='filter'>

          <div className='filter-element'>
            <label>Collection</label>
            <Typeahead
              labelKey='Collection'
              multiple={false}
              options={this.props.options.collections}
              placeholder='Select a collection'
              onChange={selected => {
                this.props.setFilterValue('collection', selected[0])
              }} />
          </div>

          <div className='filter-element'>
            <label>Gender</label>
            <Typeahead
              labelKey='Gender'
              multiple={false}
              options={this.props.options.genders}
              placeholder='Select a gender'
              onChange={selected => {
                this.props.setFilterValue('gender', selected[0])
              }} />
          </div>

          <div className='filter-element'>
            <label>Ghetto Name</label>
            <Typeahead
              labelKey='GhettoName'
              multiple={false}
              options={this.props.options.ghetto_names}
              placeholder='Select a ghetto'
              onChange={selected => {
                this.props.setFilterValue('ghetto_names', selected[0])
              }} />
          </div>

          <div className='filter-element'>
            <label>Camp Name</label>
            <Typeahead
              labelKey='CampName'
              multiple={false}
              options={this.props.options.camp_names}
              placeholder='Select a camp'
              onChange={selected => {
                this.props.setFilterValue('camp_names', selected[0])
              }} />
          </div>

          <div className='filter-element'>
            <label>Interviewee Name</label>
            <Typeahead
              labelKey='IntervieweeName'
              multiple={false}
              options={this.props.options.interviewee_names}
              placeholder='Select interviewee'
              onChange={selected => {
                this.props.setFilterValue('interviewee_name', selected[0])
              }} />
          </div>

          <div className='filter-element'>
            <label>Interview ID</label>
            <Typeahead
              labelKey='Interview ID'
              multiple={false}
              options={this.props.options.testimony_ids}
              placeholder='Interview ID'
              onChange={selected => {
                this.props.setFilterValue('testimony_id', selected[0])
              }} />
          </div>

          {yearRange
            ? <div className='filter-element timeline-filter'>
                <label>Recording Year</label>
                <Range
                  min={yearRange[0]}
                  max={yearRange[1]}
                  defaultValue={yearRange}
                  onAfterChange={(vals) => {
                    this.props.setYearRange({
                      min: vals[0],
                      max: vals[1],
                    })
                  }} />
              </div>
            : null
          }

        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  options: state.filters.options,
})

const mapDispatchToProps = dispatch => ({
  getFilterLevels: () => dispatch(getFilterLevels()),
  setFilterValue: (field, value) => dispatch(setFilterValue(field, value)),
  setYearRange: obj => dispatch(setYearRange(obj)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Filter);

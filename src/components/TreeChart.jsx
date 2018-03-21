import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Err from './Error';
import tree from '../lib/tree.js';
import src from '../assets/images/double-arrow.svg';
import {
  fetchTestimony,
  highlightSentences
} from '../actions/testimony';
import {
  setActiveIndex,
  fetchTreeData
} from '../actions/tree';

class TreeChart extends React.Component {
  constructor(props) {
    super(props)
    this.drawTree = this.drawTree.bind(this)
    this.resetTree = this.resetTree.bind(this)
  }

  componentWillMount() {
    this.props.fetchTreeData();
  }

  componentDidMount() {
    this.drawTree();
  }

  componentDidUpdate() {
    this.drawTree();
  }

  componentWillUnmount() {
    this.resetTree();
  }

  drawTree() {
    if (!this.props.data) return;
    if (this.props.selected == null) {
      tree.init({
        data: this.props.data,
        onClick: this.props.setActiveIndex,
      });
    } else {
      tree.draw({
        data: this.props.data[this.props.selected].tree,
        onClick: ((d, idx) => {
          this.props.highlightSentences({
            start: d.data.start_sentence_index,
            end: d.data.end_sentence_index,
            testimonyId: d.data.testimony_id,
            lookupSentences: false,
          })
          this.props.fetchTestimony(d.data.testimony_id)
        }),
      })
    }
  }

  resetTree() {
    tree.reset({})
    this.props.setActiveIndex(null);
  }

  render() {
    let content = null;
    if (this.props.err) {
      content = <Err />
    } else {
      content = <div className='tree-chart'>
        <div id='hidden'></div>
        <div id='target'></div>
      </div>
    }

    return (
      <div className='tree-container'>
        <div id='reset' onClick={this.resetTree}>
          <img src={src} />
        </div>
        {content}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  data: state.tree.data,
  selected: state.tree.selected,
  err: state.tree.err,
})

const mapDispatchToProps = dispatch => ({
  setActiveIndex: (d, idx) => dispatch(setActiveIndex(idx)),
  fetchTreeData: () => dispatch(fetchTreeData()),
  fetchTestimony: id => dispatch(fetchTestimony(id)),
  highlightSentences: obj => dispatch(highlightSentences(obj))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TreeChart));
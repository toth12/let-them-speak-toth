import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Err from './Error';
import tree from '../lib/tree.js';
import src from '../assets/images/double-arrow.svg';
import {
  fetchTestimony,
  highlightSentences,
  setMediaStart,
  setMediaIndex,
} from '../actions/testimony';
import {
  setActiveIndex,
  fetchTreeData,
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
        // display a testimony on click of a child node
        onClick: d => handleClick(this.props, d)
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

const handleClick = (props, d) => {
  console.log(props, d)

  if ((d.children && d.children.length) ||
       !d.data.testimony_id) return;
  if (d.data.start_sentence_index &&
      d.data.end_sentence_index) {
    props.highlightSentences({
      start: d.data.start_sentence_index,
      end: d.data.end_sentence_index,
      testimonyId: d.data.testimony_id,
      lookupSentences: false,
    })
  }
  props.setMediaIndex(d.data.media_index || 0)
  props.setMediaStart(d.data.media_offset || 0)
  props.fetchTestimony(d.data.testimony_id)
}

const nodeProps = {
  children: PropTypes.arrayOf(nodeProps),
  label: PropTypes.string.isRequired,
  media_index: PropTypes.number,
  media_offset: PropTypes.number,
  start_sentence_index: PropTypes.number.isRequired,
  end_sentence_index: PropTypes.number.isRequired,
  testimony_id: PropTypes.string.isRequired,
}

TreeChart.PropTypes = {
  data: PropTypes.arrayOf({
    essay_id: PropTypes.string,
    label: PropTypes.string.isRequired,
    tree: PropTypes.shape()
  }),
  fetchTestimony: PropTypes.func.isRequired,
  fetchTreeData: PropTypes.func.isRequired,
  setActiveIndex: PropTypes.func.isRequired,
  setMediaStart: PropTypes.func.isRequired,
  setMediaIndex: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  data: state.tree.data,
  selected: state.tree.selected,
  err: state.tree.err,
})

const mapDispatchToProps = dispatch => ({
  setActiveIndex: (d, idx) => dispatch(setActiveIndex(idx)),
  setMediaIndex: val => dispatch(setMediaIndex(val)),
  setMediaStart: val => dispatch(setMediaStart(val)),
  fetchTreeData: () => dispatch(fetchTreeData()),
  fetchTestimony: id => dispatch(fetchTestimony(id)),
  highlightSentences: obj => dispatch(highlightSentences(obj))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TreeChart));

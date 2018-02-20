import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { setActiveIndex } from '../actions/tree';
import tree from '../lib/tree.js';
import src from '../assets/images/arrows.png';

class TreeChart extends React.Component {
  constructor(props) {
    super(props)
    this.drawTree = this.drawTree.bind(this)
    this.resetTree = this.resetTree.bind(this) 
  }

  componentDidMount() {
    this.drawTree();
  }

  componentDidUpdate() {
    this.drawTree();
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
        onClick: ((d, idx) => console.log(d, idx)),
      })
    }
  }

  resetTree() {
    tree.reset({})
    this.props.setActiveIndex(null);
  }

  render() {
    return (
      <div className='tree-container'>
        <div id='reset' onClick={this.resetTree}>
          <img src={src} />
        </div>
        <div className='tree-chart'>
          <div id='hidden'></div>
          <div id='target'></div>
        </div>
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
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TreeChart));
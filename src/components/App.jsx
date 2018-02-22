import React from 'react';
import Nav from './Nav';
import Testimony from './Testimony';

export default class AppWrapper extends React.Component {
  render() {
    return (
      <div className='app-container'>
        <Nav />
        <Testimony />
        <div className='app-wrap'>
          {this.props.children}
        </div>
      </div>
    )
  }
}
import React from 'react';
import Nav from './Nav';

export default class AppWrapper extends React.Component {
  render() {
    return (
      <div className='app-container'>
        <Nav />
        <div className='app-wrap'>
          {this.props.children}
        </div>
      </div>
    )
  }
}
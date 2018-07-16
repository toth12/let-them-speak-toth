import React from 'react';

const Err = props => (
  <div className={'center-text ' + props.className || ''}>
    <div className='error'>
      <span>Sorry, an error occurred. </span>
      <span>Please contact an administrator: dhlab@yale.edu</span>
    </div>
  </div>
)

export default Err;
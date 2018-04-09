import React from 'react';

const Hero = props => (
  <div className='hero background-image'>
    { props.text ? <h1>{ props.text }</h1> : null }
    { props.children }
  </div>
)

export default Hero;
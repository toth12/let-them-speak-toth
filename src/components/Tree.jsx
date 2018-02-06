import React from 'react';
import Diagram from './Diagram';

const Tree = (props) => (
  <div className='tree'>
    <div className='left'>
      <div className='text'>
        <h2>Anthology</h2>
        <h1>Select a word to explore stories of survivors</h1>
      </div>
    </div>
    <div className='right'>
      <Diagram />
    </div>
  </div>
)

export default Tree;
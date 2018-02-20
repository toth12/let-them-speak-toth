import React from 'react';
import TreeChart from './TreeChart';

const Tree = (props) => (
  <div className='tree'>
    <div className='left background-image'>
      <div className='text'>
        <h2>Anthology</h2>
        <h1>Select a word to explore stories of survivors</h1>
      </div>
    </div>
    <div className='right'>
      <TreeChart />
    </div>
  </div>
)

export default Tree;
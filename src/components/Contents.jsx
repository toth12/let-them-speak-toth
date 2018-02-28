import React from 'react';
import Hero from './Hero';

const Contents = props => (
  <div>
    <Hero text='Table of Contents' />
    <div className='container'>
      <h2>The Holocaust Testimonials of the Name Collection</h2>
      <Table />
    </div>
  </div>
)

const Table = props => (
  <div className='toc-table'>
    {items.map((i, idx) => (
      <div key={idx} className='toc-row'>
        <span className='number'>{idx + 1}.</span>
        <div className='text'>
          <div>{ 'Oral history interview with ' + i }</div>
          <div className='meta'>Accession Number: 1234. Courtesy of the Fortunoff Archive. Other metadata as needed.</div>
        </div>
      </div>
    ))}
  </div>
)

const items = [
  'Mario Speedwagon',
  'Petey Cruiser',
  'Anna Sthesia',
  'Paul Molive',
  'Anna Mull',
  'Gail Forcewind',
  'Paige Turner',
  'Bob Frapples',
]

export default Contents;
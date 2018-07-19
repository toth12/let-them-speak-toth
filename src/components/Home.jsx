import React from 'react';
import { Link } from 'react-router-dom';

const Home = props => (
  <div className='home background-image'>
    <div className='top'>
      <div className='brand' />
      <div>
      <div className='welcome'>An Anthology of Holocaust Testimonies:<br/>
      Yale Fortunoff Archive, USC Shoah Foundation, United States Holocaust Memorial Museum</div>
      </div>
      <Link className='button brown' to='/about'>Let's explore</Link>
    </div>
    <div className='bottom'>
      <hr/>
      <p>Gabor Mihaly Toth</p>
      <p>Funded by Fortunoff Video Archive and built in collaboration with the Yale Digital Humanities Lab</p>
    </div>
  </div>
)

export default Home;

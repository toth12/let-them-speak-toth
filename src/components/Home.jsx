import React from 'react';
import { Link } from 'react-router-dom';

const Home = props => (
  <div className='home background-image'>
    <div className='top'>
      <div className='brand' />
      <div>
        <div className='welcome'>A data-driven anthology of oral history interviews with Holocaust survivors</div>
      </div>
      <Link className='button gold' to='/about'>Let's explore</Link>
    </div>
    <div className='bottom'>
      <hr/>
      <p>A project by Gabor Mihaly Toth in collaboration with the Yale Digital Humanities Lab</p>
    </div>
  </div>
)

export default Home;
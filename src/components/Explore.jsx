import React from 'react';
import Hero from './Hero';
import { Link } from 'react-router-dom';

const Explore = props => (
  <div>
    <Hero text='Explore' />
    <div className='container'>
      <h2>Subheading here for page section</h2>
      <p>Lorem ipsum dolor sit amet, arcu vulputate egestas dolor wisi, fugiat vestibulum etiam mattis sit, curabitur elit nulla vel, mus quis elit porttitor nulla. Amet elit in convallis, metus nam at sed, ipsum phasellus a dapibus, ornare in massa pharetra. Montes elementum pede integer ac, pulvinar aliquam non in augue, orci nulla eros nulla. Vulputate ut sed eget eu, dolor aliquam velit quisque a. Fermentum venenatis rhoncus vitae congue, suspendisse potenti pellentesque vestibulum.</p>
      <p>Amet a. Tempor eu. Dignissim nunc. Morbi faucibus, fermentum urna in, vitae nulla habitasse. A sit, vehicula eleifend, per massa vitae. Amet a. Tempor eu. Dignissim nunc. Morbi faucibus, fermentum urna in, vitae nulla habitasse.</p>
      <div className='button-trio'>
        <Link className='button' to='/search'>Keyword Search</Link>
        <Link className='button' to='/contents'>Table of Contents</Link>
      </div>
    </div>
  </div>
)

export default Explore;
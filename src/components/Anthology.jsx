import React from 'react';
import Hero from './Hero';
import { Link } from 'react-router-dom';

const Anthology = props => (
  <div className='anthology'>
    <Hero text='Anthology of Fragments' />
    <div className='container'>
      <h2>A Word Tree Exploration of Holocaust Testimonies</h2>
      <p>Lorem ipsum dolor sit amet, arcu vulputate egestas dolor wisi, fugiat vestibulum etiam mattis sit, curabitur elit nulla vel, mus quis elit porttitor nulla. Amet elit in convallis, metus nam at sed, ipsum phasellus a dapibus, ornare in massa pharetra. Montes elementum pede integer ac, pulvinar aliquam non in augue, orci nulla eros nulla. Vulputate ut sed eget eu, dolor aliquam velit quisque a. Fermentum venenatis rhoncus vitae congue, suspendisse potenti pellentesque vestibulum.</p>
      <p>Amet a. Tempor eu. Dignissim nunc. Morbi faucibus, fermentum urna in, vitae nulla habitasse. A sit, vehicula eleifend, per massa vitae. Amet a. Tempor eu. Dignissim nunc. Morbi faucibus, fermentum urna in, vitae nulla habitasse.</p>
      <div className='center-text'>
        <Link className='button brown' to='/tree'>Let's explore</Link>
      </div>
    </div>
  </div>
)

export default Anthology;
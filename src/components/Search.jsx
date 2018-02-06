import React from 'react';
import { Link } from 'react-router-dom';
import Hero from './Hero';

const Search = (props) => (
  <div>
    <Hero>
      <Input />
    </Hero>
    <div className='container'>
      <h2>Introduction to Search</h2>
      <p>Lorem ipsum dolor sit amet, arcu vulputate egestas dolor wisi, fugiat vestibulum etiam mattis sit, curabitur elit nulla vel, mus quis elit porttitor nulla. Amet elit in convallis, metus nam at sed, ipsum phasellus a dapibus, ornare in massa pharetra. Montes elementum pede integer ac, pulvinar aliquam non in augue, orci nulla eros nulla. Vulputate ut sed eget eu, dolor aliquam velit quisque a. Fermentum venenatis rhoncus vitae congue, suspendisse potenti pellentesque vestibulum.</p>
      <p>Amet a. Tempor eu. Dignissim nunc. Morbi faucibus, fermentum urna in, vitae nulla habitasse. A sit, vehicula eleifend, per massa vitae. Amet a. Tempor eu. Dignissim nunc. Morbi faucibus, fermentum urna in, vitae nulla habitasse.</p>
    </div>
  </div>
)

const Input = (props) => (
  <div className='search-container'>
    <div className='input-container'>
      <div className='background-image glass' />
      <input type='text' placeholder='Search Term' />
      <select>
        <option value='basic'>Basic</option>
        <option value='advanced'>Advanced</option>
      </select>
    </div>
  </div>
)

export default Search;
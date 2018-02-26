import React from 'react';
import Hero from './Hero';
import { Link } from 'react-router-dom';

const Methods = props => (
  <div className='methods'>
    <Hero text='Methodology' />
    <div className='container'>
      <h2>Subheading here for page section</h2>
      <p>Lorem ipsum dolor sit amet, arcu vulputate egestas dolor wisi, fugiat vestibulum etiam mattis sit, curabitur elit nulla vel, mus quis elit porttitor nulla. Amet elit in convallis, metus nam at sed, ipsum phasellus a dapibus, ornare in massa pharetra. Montes elementum pede integer ac, pulvinar aliquam non in augue, orci nulla eros nulla. Vulputate ut sed eget eu, dolor aliquam velit quisque a. Fermentum venenatis rhoncus vitae congue, suspendisse potenti pellentesque vestibulum.</p>
      <p>Amet a. Tempor eu. Dignissim nunc. Morbi faucibus, fermentum urna in, vitae nulla habitasse. A sit, vehicula eleifend, per massa vitae. Amet a. Tempor eu. Dignissim nunc. Morbi faucibus, fermentum urna in, vitae nulla habitasse.</p>
      <h2>Subheading here for page section</h2>
      <table className='image-trio'>
        <tbody>
          <tr>
            <td>
              <Link to='#one'>
                <div className='background-image' />
              </Link>
            </td>
            <td>
              <Link to='#two'>
                <div className='background-image' />
              </Link>
            </td>
            <td>
              <Link to='#three'>
                <div className='background-image' />
              </Link>
            </td>
          </tr>
          <tr>
            <td>
              <Link to='#one'>
                Essay title number one<br/>Subtitle for this essay
              </Link>
            </td>
            <td>
              <Link to='#two'>
                Essay title number one<br/>Subtitle for this essay
              </Link>
            </td>
            <td>
              <Link to='#three'>
                Essay title number one<br/>Subtitle for this essay
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
)

export default Methods;
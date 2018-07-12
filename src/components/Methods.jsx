import React from 'react';
import Hero from './Hero';

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
              <a href='/assets/files/sample.pdf' target='_blank'>
                <div className='background-image' />
                <div>Essay title number one<br/>Subtitle for this essay</div>
              </a>
            </td>
            <td>
              <a href='/assets/files/sample.pdf' target='_blank'>
                <div className='background-image' />
                <div>Essay title number two<br/>Subtitle for this essay</div>
              </a>
            </td>
            <td>
              <a href='/assets/files/sample.pdf' target='_blank'>
                <div className='background-image' />
                <div>Essay title number three<br/>Subtitle for this essay</div>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
)

export default Methods;
import React from 'react';
import Hero from './Hero';

const Essays = props => (
  <div>
    <Hero text='Essays' />
    <div className='container'>
      <blockquote>
      "Lorem ipsum dolor sit amet, arcu vulputate egestas dolor wisi, fugiat vestibulum etiam mattis sit, curabitur elit nulla vel, mus quis elit porttitor nulla."
      </blockquote>
      <p className='center-text'>&mdash;Source Attribution</p>
      <p>Lorem ipsum dolor sit amet, arcu vulputate egestas dolor wisi, fugiat vestibulum etiam mattis sit, curabitur elit nulla vel, mus quis elit porttitor nulla. Amet elit in convallis, metus nam at sed, ipsum phasellus a dapibus, ornare in massa pharetra. Montes elementum pede integer ac, pulvinar aliquam non in augue, orci nulla eros nulla. Vulputate ut sed eget eu, dolor aliquam velit quisque a. Fermentum venenatis rhoncus vitae congue, suspendisse potenti pellentesque vestibulum.</p>
      <p>Amet a. Tempor eu. Dignissim nunc. Morbi faucibus, fermentum urna in, vitae nulla habitasse. A sit, vehicula eleifend, per massa vitae. Amet a. Tempor eu. Dignissim nunc. Morbi faucibus, fermentum urna in, vitae nulla habitasse.</p>
      <Titles />
      <p>Lorem ipsum dolor sit amet, arcu vulputate egestas dolor wisi, fugiat vestibulum etiam mattis sit, curabitur elit nulla vel, mus quis elit porttitor nulla. Amet elit in convallis, metus nam at sed, ipsum phasellus a dapibus, ornare in massa pharetra. Montes elementum pede integer ac, pulvinar aliquam non in augue, orci nulla eros nulla. Vulputate ut sed eget eu, dolor aliquam velit quisque a. Fermentum venenatis rhoncus vitae congue, suspendisse potenti pellentesque vestibulum.</p>
      <p>Amet a. Tempor eu. Dignissim nunc. Morbi faucibus, fermentum urna in, vitae nulla habitasse. A sit, vehicula eleifend, per massa vitae. Amet a. Tempor eu. Dignissim nunc. Morbi faucibus, fermentum urna in, vitae nulla habitasse.</p>
    </div>
  </div>
)

const essayList = [
  {
    title: 'Lorem ipsum dolor sit amet, arcu vulputate',
    file: '/assets/files/sample.pdf',
  },
  {
    title: 'Ipsum dolor sit amet, arcu vulputate',
    file: '/assets/files/sample.pdf',
  },
  {
    title: 'Dolor sit amet, arcu vulputate',
    file: '/assets/files/sample.pdf',
  },
  {
    title: 'Amet a. Tempor eu. Dignissim nunc. Morbi faucibus',
    file: '/assets/files/sample.pdf',
  },
  {
    title: 'Tempor eu. Dignissim nunc. Morbi faucibus',
    file: '/assets/files/sample.pdf',
  },
  {
    title: 'Lorem ipsum dolor sit amet, arcu vulputate',
    file: '/assets/files/sample.pdf',
  },
  {
    title: 'A. Tempor eu. Dignissim nunc. Morbi faucibus',
    file: '/assets/files/sample.pdf',
  },
  {
    title: 'Tempor eu. Dignissim nunc. Morbi faucibus',
    file: '/assets/files/sample.pdf',
  }
];

const Titles = (props) => (
  <div className='essay-titles'>
    <h2>Table of Contents</h2>
    {essayList.map((t, idx) => (
      <a href={t.file}
        className='essay-title'
        key={idx}
        target='_blank'>{idx + 1}. {t.title}
      </a>
    ))}
  </div>
)

export default Essays;
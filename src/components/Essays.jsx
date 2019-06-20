import React from 'react';
import Hero from './Hero';

const Essays = props => (
  <div>
    <Hero text='Monograph' />
    <div className='container'>
      <blockquote>"They couldn't walk, couldn't talk, kept on saying we should say "Kaddish" after them, we should remember them."</blockquote>
      <p className='center-text'>&mdash;Oral History Interview with Suzanne Claire Holzer-Wester, USHMM, RG-50.061*0010.</p>
      <p>This part of <i>Let Them Speak</i> features essays by Gabor Mihaly Toth on each experience domains presented in the anthology of fragments. Content is under development.</p>
      <Titles/>
    </div>
  </div>
)

const essayList = [
  {
    title: 'The Perspective of the Voiceless',
    file: '/assets/files/sample.pdf',
  },
  {
    title: 'Nakedness',
    file: '/assets/files/sample.pdf',
  },
  {
    title: 'Shaking',
    file: '/assets/files/sample.pdf',
  },
  {
    title: 'Yelling and screaming',
    file: '/assets/files/sample.pdf',
  },
  {
    title: 'Maltreatment',
    file: '/assets/files/sample.pdf',
  },
  {
    title: 'Running',
    file: '/assets/files/sample.pdf',
  },
  {
    title: 'Fear',
    file: '/assets/files/sample.pdf',
  },
  {
    title: 'Guilt',
    file: '/assets/files/sample.pdf',
  },
  {
    title: 'Shame',
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
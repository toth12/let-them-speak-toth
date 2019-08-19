import React from 'react';
import Hero from './Hero';

const Essays = props => (
  <div>
    <Hero text='Monograph' />
    <div className='container'>
      <blockquote>They couldn't walk, couldn't talk, kept on saying we should say "Kaddish" after them, we should remember them.</blockquote>
      <p className='center-text'>&mdash;Oral History Interview with Suzanne Claire Holzer-Wester, USHMM, RG-50.061*0010.</p>
      <p>Content not available here; please refer to sample chapters submitted as part of the proposal.</p>
      <Titles/>
    </div>
  </div>
)

const essayListPart1 = [
  {
    title: 'The Last Wish',
    epigraph: 'Sometimes think of us who have to suffer for being born.',
    //file: '/assets/files/sample.pdf',
    file: '/essays/sample'  },
  {
    title: 'The Inhumanity of Historical Memory',
    epigraph: 'Do you know that after those 6 million people, there\'s hardly one who can say kaddish?',
    //file: '/assets/files/sample.pdf',
    file: '/essays/sample'  },
  {
    title: 'Emotions, Thoughts, and the Experience of Suffering',
    epigraph: '...we were human too. We lived, we laughed and loved like you.',
    //file: '/assets/files/sample.pdf',
    file: '/essays/sample'  },
  {
    title: 'The Trap of Secondary Narration',
    epigraph: '...we just live – or better to say, struggle - one day to the next and wait for the unavoidable that awaits us...',
    //file: '/assets/files/sample.pdf',
    file: '/essays/sample'  },
  {
    title: 'The Silenced Voice of the Drowned',
    epigraph: 'I thought I would be bar mitzvah but it doesn’t look that way. And it was the only thing I wanted to live for.',
    //file: '/assets/files/sample.pdf',
    file: '/essays/sample'  },
  {
    title: 'De-memoralization',
    epigraph: 'I know nothing about your family.',
    //file: '/assets/files/sample.pdf',
    file: '/essays/sample'  },
  {
    title: 'The Grey Zone',
    epigraph: 'I am ten years older and my nerves are more battered than hers.',
    //file: '/assets/files/sample.pdf',
    file: '/essays/sample'  },
  {
    title: 'Collective Suffering',
    epigraph: 'Don\’t give yourself to despair, this is our destiny shared with millions, we have so far endured it - but until when?!',
    //file: '/assets/files/sample.pdf',
    file: '/essays/sample'  },
];

const essayListPart2= [
  {
    title: 'Possibilities',
    epigraph: 'That could have been my mother. That could have been my father. That could have been my sister or my brother.',
    //file: '/assets/files/sample.pdf',
    file: '/essays/sample'  },
  {
    title: 'Recurrence',
    epigraph: 'Here I had to march naked in front of a bunch of men. This is all humiliation.',
    //file: '/assets/files/sample.pdf',
    file: '/essays/sample'  },
  {
    title: 'Testimonial Fragments',
    epigraph: '...part of what our job is, is to try and collect some of those fragments...',
    //file: '/assets/files/sample.pdf',
    file: '/essays/sample'  },
  {
    title: 'Heterogeneity',
    epigraph: 'Women and men looked alike.',
    //file: '/assets/files/sample.pdf',
    file: '/essays/sample'  },
  {
    title: 'The Human',
    epigraph: 'They give you a haircut, make you look like -- tot -- take your individuality away.',
    //file: '/assets/files/sample.pdf',
    file: '/essays/sample'  },
];

const essayListPart3= [
  {
    title: 'Otherized',
    epigraph: 'My children to this day have been quite indifferent about the Holocaust or my background and to them I have a feeling that it is as remote as the exodus from Egypt of our forefathers.',
    //file: '/assets/files/sample.pdf',
    file: '/essays/sample'  },
  {
    title: 'Unspeakable',
    epigraph: 'You will never probably see what I\'m going to see. You are never going to hear from the graves what I am going to hear. But you will see enough.',
    //file: '/assets/files/sample.pdf',
    file: '/essays/sample'  },
  {
    title: 'Athenticity and Truth',
    epigraph: '...it could have been him, it could have been anybody else, but they did hang her...',
    //file: '/assets/files/sample.pdf',
    file: '/essays/sample'  },
];

const essayListPart4= [
  {
    title: 'The Experience of the Irrational',
    epigraph: 'I don\'t know why, why we were persecuted.',
    //file: '/assets/files/sample.pdf',
    file: '/essays/sample'  },
];

const Titles = (props) => (
  <div className='essay-titles'>
    <h2>I. The Silenced Experience of the Drowned
    </h2>
    {essayListPart1.map((t, idx) => (
      <a href={t.file}
        className='essay-title'
        key={idx}
        target='_blank'>{idx + 1}. {t.title}: <i>{t.epigraph}</i>
      </a>

    ))}
    <h2>II. Collective Suffering and its Representation</h2>
    {essayListPart2.map((t, idx) => (
      <a href={t.file}
        className='essay-title'
        key={idx}
        target='_blank'>{idx + 1}. {t.title}: <i>{t.epigraph}</i>
      </a>
    ))}

    <h2>III. Epistemology of Testimonial Fragments
    </h2>
    {essayListPart3.map((t, idx) => (
      <a href={t.file}
        className='essay-title'
        key={idx}
        target='_blank'>{idx + 1}. {t.title}: <i>{t.epigraph}</i>
      </a>
    ))}

    <h2>IV. Conclusion
    </h2>
    {essayListPart4.map((t, idx) => (
      <a href={t.file}
        className='essay-title'
        key={idx}
        target='_blank'>{idx + 1}. {t.title}: <i>{t.epigraph}</i>
      </a>
    ))}


  </div>


)



export default Essays;
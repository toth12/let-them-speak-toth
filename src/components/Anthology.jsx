import React from 'react';
import Hero from './Hero';
import { Link } from 'react-router-dom';

const Anthology = props => (
  <div className='anthology'>
    <Hero text='Testimonial Fragments' />
    <div className='container'>
      <h2>GIVING VOICE TO THE VOICELESS THROUGH PIECES OF COLLECTIVE SUFFERING</h2>
      <br/><br/>
      <p>Reconstructing the experience of the <i>Drowned</i> and telling the history of the Holocaust from their perspective is an impossible task. Their experience and perspective perished with them. Today, our only proxy to them is the survivor. However, with the passing of the last survivors, there will not be anyone to speak for them. What will remain are tens of thousands of oral testimonies. How we can trace the perspective of the <i>Drowned</i> in thousands of post-war testimonies and how we can render it ethically are the main themes of the <a href='/essays'>Monograph</a> that is part of this publication. Throughout the chapters of the Monograph a simple but powerful idea is developed: the experience of the <i>Drowned</i> can be rendered through pieces of collective suffering. Modern computing technology (described in the <a href='/methods'>Methodology</a> section) has been applied to find some and definitely not all pieces in the 2700 testimonies that this publication contains. Inspired by words of survivors, pieces of collective suffering are represented as <i>testimonial fragments</i>, a concept borrowed from philology of ancient texts. <i>Testimonial fragments</i> are short <i>de-memorialized</i> excerpts from testimonies. What <i>de-memorialization</i> means and why it is crucial to render the experience of the <i>Drowned</i> are also explained in the Monograph. In short, <i>testimonial fragments</i> as pieces of collective suffering describe cross-cultural physical, emotional, and physical experiences that any victim, both the <i>Drowned</i> and the <i>Saved</i>, had to face.</p>
      <p>
      Here, <i>testimonial fragments</i> are presented through a hierarchical tree visualization. The main leaves of the tree are different cross-cultural experience domains. By clicking on a leaf, readers are presented with groups of <i>testimonial fragments</i> describing a similar recurring experience (hence, a piece of collective suffering), as well as prototypical experiences in a given experience domain (the top branches of the opened tree). By clicking on a <i>testimonial fragment</i>, reader can read, listen or watch the <i>testimonial fragment</i> in the original testimony where computing tools found it. The playing of the original audio / video recording begins from the interview question leading to the <i>testimonial fragment</i>.  Symbolically, through <i>testimonial fragments</i> and through the voice of the <i>Saved</i>, the <i>Drowned</i> can speak up even today.
      </p>
      <div className='center-text'>
        <Link className='button brown' to='/tree'>Let's explore</Link>
      </div>
    </div>
  </div>
)

export default Anthology;

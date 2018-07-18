import React from 'react';
import Hero from './Hero';
import { Link } from 'react-router-dom';

const Anthology = props => (
  <div className='anthology'>
    <Hero text='Anthology of Fragments' />
    <div className='container'>
      <h2>GIVING VOICE TO THE VOICELESS</h2>
      <blockquote>“The best witness, the only true witness in reality, according to the specialists, is one who has not
      survived, who has gone to the end of experience and is dead. But neither the historians nor the sociologists have so far resolved this contradiction: how to invite these true witnesses, the dead, to their conferences? How can they be made to speak?</blockquote>
      <p className='center-text'>&mdash;Jorge Semprún, <i>Le mort qu’il faut</i></p>
      <p>The Spanish-French writer and survivor of Buchenwald, George Semprun, set an impossible task: giving a voice to the voiceless victim. The task is impossible because the experience of voiceless victims perished with them. Today, our only proxy to them is the survivor. However, with the passing of the last survivors, there will not be anyone to speak for them. What will remain are tens of thousands of oral testimonies. How can we trace the perspective of the nameless victim in thousands of post-war testimonies? A recollection by a survivor has helped to tackle the impossible task given by Semprun.</p>
      <blockquote>When I went back to -- to Auschwitz several years ago, back then -- ‘93, I believe, there’s a room in Auschwitz where it has all luggage, suitcases. I walked into this room and the first suitcase that stares at me is Weiss, W-e-i-s-s. That was my maiden name. Do I know if it was ours? No. Would I recognize it? No. Could it have been? Yes.</blockquote>
      <p className='center-text'>&mdash;Oral History Interview with  F.F. USHMM, RG-50.549.02.0020</p>
      <p>Just as the suitcases in the Auschswitz Museum could have belonged to anyone  who was deported to the camp, there must be a set of experiences that could have been the experience of any of the six million victims. Given a reasonably large corpus of testimonies, these shared experiences must also recur in the corpus.  Modern computing technology was used to retrieve short testimonial fragments describing recurring experiences in testimonies. These testimonial fragments allow us to piece together a picture of the collective experience of millions.</p>
      <p><i>Let Them Speak</i> features testimonial fragments in eight cross-cultural experience domains (at the moment only 5 of them are accessible). Testimonial fragments are presented as a hierarchical tree. The main leaves of the tree denote the eight experience domains. By clicking on a leaf, readers are presented with groups of testimonial fragments describing a similar recurring experience, as well as prototypical experiences in a given experience domain (the top branches of the opened tree). By clicking on a fragment, the user can read, listen or watch original testimony.</p>
      <div className='center-text'>
        <Link className='button brown' to='/tree'>Let's explore</Link>
      </div>
      <p><i>Let Them Speak</i> is not only the title of this book. It is an approach that, on the one hand, presents victims’ perspective by making survivors speak about their experiences and how they felt about it. On the other hand, it presents the experience of the voiceless by assembling pieces of the collective experience together.  We cannot reconstruct what the voiceless actually experienced, but we can reconstruct what they were likely to have experienced. The recurrence of certain experiences in interviews suggests that they could have been the possible experience of any victim. Testimonial fragments are meant to represent collective experiences; interviews behind fragments are the unique and individual manifestations of these collective experiences. <i>Let Them Speak</i> as an anthology enables an effortless oscillation between the collective and the individual by opening reading paths that guide the reader through collective experiences. <i>Let Them Speak</i> as an approach facilitates the shift from the study of testimonies as a collections of many individual experiences to the investigation of testimonies as an inventory of collective experiences.</p>
    </div>
  </div>
)

export default Anthology;

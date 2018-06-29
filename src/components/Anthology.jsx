import React from 'react';
import Hero from './Hero';
import { Link } from 'react-router-dom';

const Anthology = props => (
  <div className='anthology'>
    <Hero text='Anthology of Fragments' />
    <div className='container'>
      <h2>GIVING VOICE TO THE VOICELESS</h2>
      <p>In 1981 Suzanne Claire Holzer-Wester (1921-2013), a survivor of Auschwitz-Birkennau Camp, was interviewed by her daughter. In the interview she recalls the last wish of those who did not survive the journey to Auschwitz:</p>
      <p>“they couldn't walk, couldn't talk, kept on saying we should say "Kaddish" after them, we should remember them.”</p>
      <p>There are many ways to fulfill what voiceless victims asked. One of them is to narrate what happened to them. Mechanism and infrastructure, methods of persecutions have been throroughly studied by generations of historians. Thanks to their effort, we already know the fate of victims. Another way to remember them is to recall how they might have experienced persecutions. But individual experiences of voiceless victims perished with them. The recollection of their perspective seems to be an impossible enterprise.</p>
      <p>Nevertheless, their perspective must be also present in testimonies of survivors. When speaking about the past, interviewees also recall experiences that are shared by both the survivor and the nameless victim. They are collective experiences that recurred in the fate of millions. The goal of this anthology is to present victims’s perspective though some of these collective experiences.</p>
      <div className='center-text'>
        <Link className='button brown' to='/tree'>Let's explore</Link>
      </div>
    </div>
  </div>
)

export default Anthology;

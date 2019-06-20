import React from 'react';
import Hero from './Hero';
import { Link } from 'react-router-dom';

const Explore = props => (
  <div>
    <Hero text='Testimonies' />
    <div className='container'>
      <p>In addition to search, a traditional table of contents supports the exploration of interviews. This leads readers to complete transcripts, and to the listening or watching some but not all interviews. The table of contents is also filterable in terms of certain metadata.</p>
      <p>Transcripts are not fully accurate; they might feature occasional errors, omissions, odd formatting and deviations from the original audio / video tapes. The goal of a data edition is not to produce a completely accurate publication of data. Due to the volume of testimonies data and the fact that interviews were recorded and transcribed by many different projects using different and not always consistent transcription standards, this project cannot offer complete accuracy. Interview transcripts are undergoing a basic quality control that tries to find erroneous transcripts.  In addition to transcript errors, historical inaccuracies may be present as these are personal recollections and reflections of individual survivors and witnesses. Please take this into consideration when reading transcripts and contact the editor with suggestions for improvement. You can read more about data processing and quality control in the <a href='/methods'>Methodology</a> section.<br/><br/></p>

      <div className='center-text'>
        <Link className='button brown' to='/contents'>Let's explore</Link>
      </div>

    </div>
  </div>
)

export default Explore;

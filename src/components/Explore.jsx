import React from 'react';
import Hero from './Hero';
import { Link } from 'react-router-dom';

const Explore = props => (
  <div>
    <Hero text='Explore' />
    <div className='container'>
      <p>The volume of the data underlying <i>Let Them Speak</i> exceeds what a human reader can explore without the power of computing tools. Interviews in this edition cover approximately 45 million individual words. Existing metadata, as well as other finding aids such as indexing and summaries, have hitherto been the main resource of help in the exploration of testimonies. Nevertheless, there is also need to search in the words of survivors. This does not only mean finding words in texts. Search also targets the identification of connections, similarities, and dissimilarities between interviews. Search also implies the retrieval of certain feelings and patterns of thought in the recollection of survivors. Of course, searching through 45 million words can produce results that are still too much to read and study. Search therefore needs to be complemented with options to narrow down results to certain groups of survivors such as for instance victims of a given camp. To fulfill these requirements, interviews were transformed into a linguistically annotated corpus enriched with metadata provided by the three collections. In addition to search, a traditional table of contents supports the exploration of interviews. This leads readers to complete transcripts, and to the listening or watching some but not all interviews. The table of contents is also filterable in terms of certain metadata.</p><div className='button-trio'><Link className='button' to='/search'>Corpus Search</Link><Link className='button' to='/contents'>Table of Contents</Link></div>
      <p>Transcripts are not fully accurate; they might feature occasional errors, omissions, odd formatting and deviations from the original audio / video tapes. The goal of a data edition is not to produce a completely accurate publication of data. Due to the extraordinary large volume, and due to the fact that interviews were recorded and transcribed by many different projects using different and not always consistent transcribing standards, <i>Let Them Speak</i> cannot offer complete accuracy. Despite this, the editor and his team try their best. Interview transcripts are undergoing a basic quality control that tries to find erroneous transcripts.  In addition to transcript errors, historical inaccuracies may be present as these are personal recollections and reflections of individual survivors and witnesses. Please take this into consideration when reading transcripts, and contact the editor with suggestions for improvement. You can read more about data processing and quality control in the Methodology section.</p>
      <Link to='/methods'><b>Methodology &rarr;</b></Link><br/><br/>
      <p>At the moment, the corpus search is the main exploratory tool of <i>Let Them Speak</i>. Thanks to the generous support by the Fortunoff Archive, further exploratory tools will soon be implemented. These tools will facilitate the exploration of victims’ perspective.</p>
    </div>
  </div>
)

export default Explore;

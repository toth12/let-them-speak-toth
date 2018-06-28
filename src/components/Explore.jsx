import React from 'react';
import Hero from './Hero';
import { Link } from 'react-router-dom';

const Explore = props => (
  <div>
    <Hero text='Explore' />
    <div className='container'>
      <h2>LET THE DATA SPEAK</h2>

      <p>Even though the data underlying Let them speak cannot be considered to be Big Data, it definitely exceeds what a human reader can explore without the power of computing tools. The interview transcripts contain approximately …. million individual words, which corresponds to ….. hours of audio and video content. Beyond the size of the data, there are two other features that make the exploration even more challenging. First, transcripts are verbatim; they therefore bear the characteristics of orality such as for instance, the presence of half-sentences and long breaks. Second, interviews are by 3000 different ‘authors’ who use a great variety of vocabulary and grammatical constructions. As English is not their native language, readers may occasionally encounter odd lexical choices and grammatical constructions.</p>
      <p>On the one hand, the goal of a data edition is to provide exploratory tools that help readers to overcome these difficulties and find their way in the data. Interview transcripts underwent a linguistic processing, as a result of which the data became searchable as a linguistic corpus. Not only can readers search a given word, but they can also enrich or narrow their search by drawing on linguistic features such as dictionary form or grammatical forms. Linguistic annotation also enables the search for sequences or patterns in texts. Furthermore, when using linguistic constructions users can also integrate catalogue data into their searches. Linguistic searches helps to find connections between texts and textual contexts. By clicking on search results, readers can quickly go back to the original texts, and listen them.</p>
      <p>On the other hand, this data edition also aims to facilitate a buttom-up exploration. To fulfill this mission, various word indices have been constructed. These word indices show the vocabulary underlying the data set, and helps to see what is the vocabulary underlying the data. In addition to word indices, two further exploratory tools helps to find unexpected elements in the data. Various timelines show points in time over the interviews. Locations extracted from interviews are plotted on maps, that help to browse the content of interviews in space. These word indices are similar to traditional indices in books.</p>
      <p>Finally, a traditional table of contents enable the reader to read or listen interviews in parallel. The tool table of contents enable the simple reading and browsing of interviews in the collection. Furthermore, interviews can be filterable. So user can find specific interviews based on various extra textual criteria. These extra-textual criteria derive from the meta-data that each data provider gave us.</p>
      <p>As a whole, the exploratory tools enable a computer assisted close reading of texts, and to find connections between texts. In a data edition it is important to be transparent, and these exploratory tools are based on the processing of the data. Descriptions of data processing is described in the methodology part of this edition.</p>
      


      <div className='button-trio'>
        <Link className='button' to='/search'>Corpus Search</Link>
        <Link className='button' to='/contents'>Table of Contents</Link>
      </div>
    </div>
  </div>
)

export default Explore;
import React from 'react';
import Hero from './Hero';

const About = props => (
  <div className='about'>
    <Hero text='About' />
    <div className='container'>
      <h2>"Tell the World What Happened to Us"</h2>
      <p>Thousands of audiovisual interviews with survivors of the Holocaust have been recorded since the end of the Second World War. While each testimony is unique, the story of an individual, one commonly shared sentiment is the desire to tell the world, that their interview be shared with their families and the public, as both a document of what happened to them and their families, but also as a warning. Thanks to their willingness to speak, despite the considerable emotional difficulty of doing so, hundreds of scholars, archivists and volunteers have been able to study and learn from their experiences. By the end of the second decade of the second millennium, the last survivors will be gone, and the ability to learn from them first hand, to record their stories, will end. The responsibility of the coming generations is to keep these interviews alive, to preserve them, to make them accessible, and most importantly to let survivors speak – to “tell the world what happened” to them.</p>
      <p>The mission to let survivors tell their experience has inspired this project, Let Them Speak, which is both a monograph, a data edition, and a digital tool. In 2018, under the initiative of the Fortunoff Archive of Yale University, three leading institutions responsible for large collections of Holocaust testimonies agreed to make transcripts, and some video material, of a portion of their collection available in a data edition:</p>
      <ul>
        <li> - Fortunoff Video Archive for Holocaust Testimonies (FVAHT), Yale University</li>
        <li> - United States Holocaust Memorial Museum (USHMM)</li>
        <li> - USC Shoah Foundation (USC)</li>
      </ul>
      <p>With funding from the Fortunoff Video Archive, Let Them Speak was edited and built by Gabor M. Toth in collaboration with the Yale Digital Humanities Laboratory, and in consultation with FVAHT, USC, and USHMM. The edition brings together 3000 testimonies from these three collections for the first time, and allows for unprecedented forms of access, search and analysis of these survivor’s experiences.</p>
      <p>Let Them Speak aims not only to release interviews in a digital format, but rather to unlock testimonies by drawing on modern technologies such as natural language processing and data mining. The edition consists of several exploratory tools that help readers to search the collection of testimonies. A filterable and searchable table of contents allows readers to browse the testimonies. By clicking on titles readers can explore transcripts, and watch or listen to some of the original interviews. Let Them Speak is designed as a stark reminder that the millions of murdered victims who could never share their experience. Technology has been employed to build an anthology of fragments that represents some of the likely experiences shared between surivors, and those who did not survive – testimony fragments as a means to commemorate the millions of lives and voices lost.</p>
      <p>These exploratory tools complement the work of archivists, librarians and indexers who work to make these testimonies discoverable by employing rigorous cataloguing standards and controlled vocabulaies. In fact, as the reader shall see, this edition builds upon their important work. The edition also uses transcriptions of testimonies that were prepared by students and volunteers working for the FVAHT, USC, and USHMM. Their work significantly contributed to this publication. Even though Let Them Speak is the result of a small and dedicated team, it is based on many years of collaborative work, and designed as a project to encourage further cross-institutional cooperation.</p>
      <p>Creation of a data edition is not only a technological exercise. It also involves philological work, ethical considerations, as well as placing testimonies in current scholarly discourse. Hence, this edition is also a monograph featuring scholarship on the Holocaust, on testimonies, and on the ethical application of algorithms to study genocides.</p>
    </div>
  </div>
)

export default About;

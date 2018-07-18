import React from 'react';
import Hero from './Hero';

const About = props => (
  <div className='about'>
    <Hero text='About' />
    <div className='container'>
      <h2>Explore</h2>
      <p>Tens of thousands of audiovisual interviews with survivors of the Holocaust have been recorded since the end of the Second World War. <span className='italic'>Let Them Speak</span>, a digital monograph, a data edition, and a digital tool, makes approximately 3000 English language interviews from three collectionsavailable. The title is symbolic; it expresses the author’s intention to give voice to both murdered victims and survivors. <span className='italic'>Let Them Speak</span> makes victims’ perspective investigable through various exploratory tools and an anthology of testimonial fragments. The first prototype offers two ways to explore testimonies and Holocaust experiences (further exploratory tools are under development):</p>
      <br/><br/><br/>
      <table className='image-trio'>
        <tbody>
          <tr>
            <td>
              <a href='/contents' target='_blank'>
                <div><h3>Table of Contents</h3></div><hr/>
                <div className='teaser'>Browse testimonies of Holocaust survivors by location, date, and demographic metadata</div>
              </a>
            </td>
            <td>
              <a href='/anthology' target='_blank'>
                <div><h3>Fragments</h3></div><hr/>
                <div className='teaser'>Discover shared experiences anthologized by data-driven word tree fragments</div>
              </a>
            </td>
            <td>
              <a href='/search' target='_blank'>
                <div><h3>Corpus Search</h3></div><hr/>
                <div className='teaser'>Find keywords and topics across testimony transcripts with advanced linguistic search tools</div>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
      <br/><br/><br/>
      <h2>Scholarship</h2>
      <p><span className='italic'>Let Them Speak</span> as a data edition brings together a wide range of methods from data science, natural language processing and machine learning. <span className='italic'>Let Them Speak</span> as a monograph features essays on victim’s perspective</p>
      <br/><br/><br/>
      <table className='image-trio'>
        <tbody>
          <tr>
            <td>
              <a href='/essays' target='_blank'>
                <div><h3>Essays</h3></div><hr/>
                <div className='teaser'>Read the author's essays on victims' perspective</div>
              </a>
            </td>
            <td>
              <a href='/methods' target='_blank'>
                <div><h3>Methodology</h3></div><hr/>
                <div className='teaser'>Discover the data sets and techniques used to process them</div>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
      <br/><br/><br/>
      <h2>Introduction into <span className='italic'>Let Them Speak</span></h2>      
    <div>
    <p><span className='italic'>“Tell the world”</span></p>

    <p>Tens of thousands of audiovisual interviews with survivors of the Holocaust have been recorded since the end of the Second World War. While each testimony is the unique story of an individual, one commonly shared sentiment is the desire to tell the world. Thanks to the willingness of survivors to speak, despite the considerable emotional difficulty of doing so, hundreds of scholars, archivists and volunteers have been able to study and learn from their experiences. Nevertheless, the sheer number of available testimonies, 
    as well as lack of transcripts and appropriate search tools, have remained a significant barrier to understanding the Holocaust from the perspective of the survivor and the voiceless victim. The overall goal of <span className='italic'>Let Them Speak</span> is is to make victim’s perspective investigable and tangible for future generations. The title is therefore symbolic and it refers to the editor’s intention to put victim’s perspective at the center of this edition.</p> 
    <p>In 2018, under the initiative of the Fortunoff Video Archive for Holocaust Testimonies of Yale University (FVAHT), three leading institutions responsible for large collections of Holocaust testimonies agreed to make transcripts, and some video material, of a portion of their collection available in Let-them-speak. The Fortunoff Video Archive for Holocaust Testimonies gave access to 180 transcripts and videos recorded as part of the Holocaust Survivor Film Project in the late 1970s and early 1980s. The United States Holocaust Memorial Museum (USHMM) contributed 1500 interviews recorded between the 1970s and the late 1990s. The Visual Archive of the Shoah Foundation at the University of South California (USC VA) gave 1000 interview transcripts recorded in the 1990s. (See the complete description of the data sets underlying <span className='italic'>Let Them Speak</span> in the Methodology section). With funding from the Fortunoff Video Archive, <span className='italic'>Let Them Speak</span> was edited and built by Gabor M. Toth in collaboration with the Yale Digital Humanities Laboratory, and in consultation with FVAHT, USC VA, and USHMM. The edition brings together nearly 3000 testimonies from these three collections for the first time, and allows for unprecedented forms of access, search and analysis of these survivors’ experiences. </p> 
    <p> <span className='italic'>Let Them Speak</span> is a data edition that aims not only to release interviews in a digital format, but also to unlock testimonies by drawing on modern technologies such as natural language processing and data mining. The edition is built around Blacklab, a sophisticated engine that helps readers to explore the collection of testimonies. A filterable and searchable table of contents allows readers to browse and read transcripts or watch some but not all testimonies. The edition is in fact an ongoing effort by the Fortunoff Archive, and further exploratory tools will soon be developed in the coming years. <span className='italic'>Let Them Speak</span> also commemorates those millions of murdered victims, who could never share their experience. Technology has been employed to build an anthology of testimonial fragments that represents the experience of voiceless victims. Readers can get acquainted with the way technology has been applied under the Methodology section. </p> 
    <p> These exploratory tools complement the work of archivists, librarians and indexers who work to make these testimonies discoverable by employing rigorous cataloguing standards and controlled vocabularies. In fact, as the reader shall see, this edition builds upon their important work. The edition also uses transcriptions of testimonies that were prepared by students and volunteers working for the FVAHT, USC, and USHMM. Their work significantly contributed to this publication. Even though <span className='italic'>Let Them Speak</span> is the result of a small and dedicated team, it is based on many years of collaborative work and was designed as a project to encourage further cross-institutional cooperation. </p> 
    <p>The creation of a data edition is not only a technological exercise. It also involves philological work, ethical considerations, as well as the
    contextualization of testimonies within the current scholarship. (see Essays). Hence, this edition is also a monograph featuring scholarship on the Holocaust, 
    on testimonies, and on the ethical application of algorithms to study genocides.
    </p>
    <p>
    By the end of the second decade of the second millennium, the last survivors will be gone, and the ability to learn from them first-hand,to record their stories, will end. The responsibility of the coming generations is to keep these interviews alive, to preserve them, to make them accessible, and most importantly to let survivors speak – to <span className='italic'> “tell the world what happened” </span>to them. </p>
        
        </div>
        </div>
        </div>
)

export default About;

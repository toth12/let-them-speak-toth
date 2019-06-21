import React from 'react';
import Hero from './Hero';

const About = props => (
  <div className='about'>
    <Hero text='About' />
    <div className='container'>
    <h2>Short Introduction</h2>
    <blockquote className='center-text'><i>Let them Speak</i></blockquote>
      <p><i>Let them Speak</i> is the epigraph of this book and the name of the collaborative project between three institutions that gave rise to it. <i>Let them Speak</i> is symbolic; it expresses my intention to give voice to millions of murdered Holocaust victims, to the <i>Drowned</i>, as Primo Levi, the Italian writer and Holocaust survivor, named them. Today, when the last of the <i>Saved</i>, as Levi called survivors, die, reflecting on how to tell the experience and perspective of the <i>Drowned</i> is becoming a moral obligation for future generations. Until now, symbolically, the <i>Saved</i> could give voice to the <i>Drowned</i>. To realize the impossible, I bring together survivors’ voice, computer science, philosophy, and my own family’s memory. <i>In Search of the Drowned in the Words of the Saved</i> is a hybrid publication realized with the help of digital technology. On the one hand, it offers scholarship on the silenced experience of the <i>Drowned</i> and essays on oral history testimony in the digital age. <br/><br/></p>
      <h2>Scholarship</h2>
      <table className='image-trio'>
        <tbody>
          <tr>
            <td>
              <a href='/essays'>
                <div><h3>Monograph</h3></div><hr/>
                <div className='teaser'>Read my intellectual journey that led to finding of the Drowned in pieces of collective suffering told by the Saved and to reflections on victims’ perspective</div>
              </a>
            </td>
            <td>
              <a href='/methods'>
                <div><h3>Methodology</h3></div><hr/>
                <div className='teaser'>Discover how digital technology helped to find pieces of collective suffering in thousands of testimonies and to realize this book</div>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
      <br/><br/><br/>
      <h2>Data Edition</h2>
      <p>On the other hand, <i>In Search of the Drowned in the Words of the Saved</i> is a data edition of nearly 2700 English language Holocaust testimonies preserved in three major US collections: Yale Fortunoff Archive, USC Shoah Foundation, Visual History Archive, United States Holocaust Memorial Museum. As a data edition, it offers new ways to engage with victims’ experience. To give voice to the <i>Drowned</i>, it renders pieces of collective suffering as <i>testimonial fragments</i>. This opens reading paths along the emotional, physical, and mental suffering of victims and presents the Holocaust from their perspective. To unlock survivors’ testimonies, it makes transcripts available as a linguistic corpus. Finally, <i>In Search of the Drowned in the Words of the Saved</i> enables the reading, listening, and watching of the 2700 testimonies it features. <br/><br/><br/>
      </p>
      <table className='image-trio'>
        <tbody>
          <tr>
            <td>
              <a href='/explore'>
                <div><h3>Testimonies</h3></div><hr/>
                <div className='teaser'>Browse testimonies of Holocaust survivors by location, date, and demographic metadata and read, listen or watch their experience</div>
              </a>
            </td>
            <td>
              <a href='/anthology'>
                <div><h3>Fragments</h3></div><hr/>
                <div className='teaser'>Explore pieces of collective suffering rendered as testimonial fragments and visualized as leaves of a hierarchical tree</div>
              </a>
            </td>
            <td>
              <a href='/search'>
                <div><h3>Search</h3></div><hr/>
                <div className='teaser'>Find keywords and topics across testimony transcripts with advanced linguistic search tools</div>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
      <br/><br/><br/>
      <h2>Extended Introduction</h2>
      <div>
        <blockquote className='center-text'><i>Tell the world</i></blockquote>
        <p>Tens of thousands of audiovisual interviews with survivors of the Holocaust have been recorded since the end of the Second World War. While each testimony is the unique story of an individual, one commonly shared sentiment is the desire to <i>tell the world</i>. Thanks to the willingness of survivors to speak, despite the considerable emotional difficulty of doing so, hundreds of scholars, archivists and volunteers have been able to study and learn from their experiences. Nevertheless, the sheer number of available testimonies, as well as lack of transcripts and appropriate search tools, have remained a significant barrier to understanding the Holocaust from the perspective of the survivor and the voiceless victim. The overall goal of <i>Let Them Speak</i> as a collaborative project is to make victims’ perspective investigable and tangible for future generations. Again, the epigraph,  <i>Let Them Speak</i>, is symbolic. In addition to giving voice to the <i>Drowned</i>, it also refers to my intention to put victims’ experience and perspective at the center of future scholarship on the Holocaust.</p>
        <p>Throughout the chapters of the <a href='/essays'>Monograph</a> section I therefore address two core questions:<br/><br/>

        <ul>
        <li>- Beyond artistic representations, how can we render the silenced experience of the <i>Drowned</i> as authentic historical source?</li>
        <li>- How can we represent and approach the Holocaust from victims’ perspective?</li>
        </ul>
        <br/>
        
        To elaborate answers to these questions, I turn to my own family’s memory. Fragments from family letters and personal memories with survivors guide me through Holocaust experiences told by those who were there. In the spirit of <i>Let them Speak</i>, beyond me as narrator, only victims speak throughout the monograph; abstract ideas that have long undermined any attempt to face the experience of the <i>Drowned</i> are explained and addressed through the voice of victims. I conclude by finding the silenced experience and perspective of the <i>Drowned</i> in pieces of collective suffering to be recovered from the words of the <i>Saved</i>. To approach collective suffering as authentic historical source, I propose the reinterpretation of testimony and the concept of historical fact. Finally, I address the place of victims’ perspective in human history.</p>
        <p>
        In 2018, under the initiative of the Fortunoff Video Archive for Holocaust Testimonies of Yale University (FVAHT), three leading institutions responsible for large collections of Holocaust testimonies agreed to make transcripts, and some video material, of a portion of their collection available in this book. The Fortunoff Video Archive for Holocaust Testimonies gave access to 180 transcripts and videos recorded as part of the Holocaust Survivor Film Project in the late 1970s and early 1980s. The United States Holocaust Memorial Museum (USHMM) contributed 1500 interviews recorded between the 1970s and the late 1990s. The Visual Archive of the Shoah Foundation at the University of Southern California (USC VA) gave 1000 interview transcripts recorded in the 1990s. (See the complete description of the data sets this book in the <a href='/methods'>Methodology</a> section). With funding from the Fortunoff Video Archive, the USC Shoah Foundation, and the USC Viterbi School of Engineering, <i>In Search of the Drowned in the Words of the Saved</i> was written, edited, and built by me in collaboration with the Yale Digital Humanities Laboratory, and in consultation with FVAHT, USC VA, and USHMM. This digital book brings together nearly 2700 testimonies from these three collections for the first time, and allows for unprecedented forms of access, search and analysis of these survivors’ experiences.
        </p>
        <p>As a data edition, this publication aims not only to release interviews in a digital format, but also to unlock testimonies by drawing on modern technologies such as natural language processing and data mining. The edition is built around BlackLab, a sophisticated search engine that helps readers to explore the collection of testimonies. A filterable and searchable table of contents allows readers to browse and read transcripts or watch some but not all testimonies. All this is in fact an ongoing effort by the Fortunoff Archive; further exploratory tools will soon be developed in the coming years. This book also commemorates those millions of murdered victims, who could never share their experience. Technology has been employed to build an anthology of testimonial fragments that represents the experience of voiceless victims. Readers can get acquainted with the way technology has been applied under the <a href='/methods'>Methodology</a> section.</p>
        <p>
        These exploratory tools complement the work of archivists, librarians, and indexers who work to make these testimonies discoverable by employing rigorous cataloguing standards and controlled vocabularies. In fact, as the reader shall see, this publication builds upon their important work. It also uses transcriptions of testimonies that were prepared by students and volunteers working for the FVAHT, USC, and USHMM. Their work significantly contributed to this publication. Even though this publication is the result of a small and dedicated team, it is based on many years of collaborative work and was designed as a project to encourage further cross-institutional cooperation.
        </p>
        <p>The creation of a data edition is not only a technological exercise. It also involves philological work, ethical considerations, as well as the contextualization of testimonies within the current scholarship. My essay on Holocaust testimony in the Digital Age treats these topics, as well as the ethical application of algorithms to study genocides.
        By the end of the second decade of the second millennium, the last survivors will be gone, and the ability to learn from them first-hand, to record their stories, will end. The responsibility of the coming generations is to keep these interviews alive, to preserve them, to make them accessible, and most importantly to let survivors speak – to <i>tell the world</i> what happened to them. This responsibility called the Monograph into life. Throughout the chapters of the Monograph, I reflect on how to <i>tell the world</i> what happened from the perspective of those who never returned.</p>



      </div>
    </div>
  </div>
)

export default About;

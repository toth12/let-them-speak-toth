import React from "react";
import Hero from "./Hero";
import ReactGA from "react-ga";

const About = (props) => {
  ReactGA.pageview("/about");

  return (
    <div className="about">
      <Hero text="About" />
      <div className="container">
        <h2>Short Introduction</h2>
        <blockquote className="center-text">
          <i>Let them Speak</i>
        </blockquote>
        <p>
          <i>Let them Speak</i> is the epigraph of this digital monograph and the name of the
          collaborative project between three institutions that gave rise to it.{" "}
          <i>Let them Speak</i> is symbolic; it expresses my intention to give
          voice to millions of murdered Holocaust victims, to the <i>Drowned</i>
          , as Primo Levi, the Italian writer and Holocaust survivor, named
          them. <i>In Search of the Drowned</i> is a hybrid publication with various components bringing together survivors’ testimonies, digital history, computer science, philosophy, and personal memory.{" "}
          <br />
          <br />
        </p>
        <h2>Data Edition</h2>
        <p>
          <i>In Search of the Drowned</i> is a data
          edition of nearly 2700 complete English language Holocaust testimonies
          preserved in three major US collections: Yale Fortunoff Archive, USC
          Shoah Foundation, Visual History Archive, United States Holocaust
          Memorial Museum. To give voice to the <i>Drowned</i>, it renders
          pieces of collective suffering as <i>testimonial fragments</i>. To unlock survivors’ testimonies, it makes transcripts available as a linguistic corpus.
          <br />
          <br />
          <br />
        </p>
        <table className="image-trio">
          <tbody>
            <tr>
              <td>
                <a href="/explore">
                  <div>
                    <h3>Testimonies</h3>
                  </div>
                  <hr />
                  <div className="teaser">
                    Browse testimonies of Holocaust survivors by location, date,
                    and demographic metadata and read, listen or watch their
                    experience
                  </div>
                </a>
              </td>
              <td>
                <a href="/anthology">
                  <div>
                    <h3>Fragments</h3>
                  </div>
                  <hr />
                  <div className="teaser">
                    Explore pieces of collective suffering rendered as
                    testimonial fragments and visualized as leaves of a
                    hierarchical tree
                  </div>
                </a>
              </td>
              <td>
                <a href="/search">
                  <div>
                    <h3>Search</h3>
                  </div>
                  <hr />
                  <div className="teaser">
                    Find keywords and topics across testimony transcripts with
                    advanced linguistic search tools
                  </div>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <br />
        <br />


        <h2>Scholarship</h2>
        <table className="image-trio">
          <tbody>
            <tr>
              <td>
                <a href="/essays">
                  <div>
                    <h3>Monograph</h3>
                  </div>
                  <hr />
                  <div className="teaser">
                    Read my intellectual journey that led to finding of the
                    Drowned in pieces of collective suffering
                  </div>
                </a>
              </td>
              <td>
                <a href="/methods">
                  <div>
                    <h3>Methodology</h3>
                  </div>
                  <hr />
                  <div className="teaser">
                    Discover how digital technology helped to find pieces of
                    collective suffering in thousands of testimonies and to
                    realize this book
                  </div>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
        <br />
        <br />
        <br />
        
        <h2>Extended Introduction</h2>
        <div>
          <blockquote className="center-text">
            <i>Tell the world</i>
          </blockquote>
          <p>
            Tens of thousands of audiovisual interviews with survivors of the
            Holocaust have been recorded since the end of the Second World War.
            While each testimony is the unique story of an individual, one
            commonly shared sentiment is the desire to <i>tell the world</i>.
            Thanks to the willingness of survivors to speak, despite the
            considerable emotional difficulty of doing so, hundreds of scholars,
            archivists and volunteers have been able to study and learn from
            their experiences. Nevertheless, the sheer number of available
            testimonies, as well as lack of transcripts and appropriate search
            tools, have remained a significant barrier to understanding the
            Holocaust from the perspective of the survivor and the voiceless
            victim. The overall goal of <i>Let Them Speak</i> as a collaborative
            project is to make victims’ perspective investigable and tangible
            for future generations and for future scholarship on the Holocaust. 
            Again, the epigraph,  <i>Let Them Speak</i>, is symbolic. In addition to giving voice to the <i>Drowned</i>, it also expresses this goal.
          </p>

          <p>
            In 2018, under the initiative of the Fortunoff Video Archive for
            Holocaust Testimonies of Yale University (FVAHT), three leading
            institutions responsible for large collections of Holocaust
            testimonies agreed to make transcripts, and some video material, of
            a small portion of their large collection available in this book. The Fortunoff
            Video Archive for Holocaust Testimonies gave access to 180
            transcripts and videos recorded as part of the Holocaust Survivor
            Film Project in the late 1970s and early 1980s. The United States
            Holocaust Memorial Museum (USHMM) contributed 1500 interviews
            recorded between the 1970s and the late 1990s. The Visual Archive of
            the Shoah Foundation at the University of Southern California (USC
            VHA) gave 1000 interview transcripts recorded in the 1990s. (See the
            complete description of the data sets this book in the{" "}
            <a href="/methods">Methodology</a> section). With funding from the
            Fortunoff Video Archive, the USC Shoah Foundation, and the USC
            Viterbi School of Engineering, <i>In Search of the Drowned</i> was written, edited, and built by me in collaboration with the Yale
            Digital Humanities Laboratory, and in consultation with FVAHT, USC
            VHA, and USHMM. This digital book brings together nearly 2700
            testimonies from these three collections for the first time, and
            allows for unprecedented forms of access, search and analysis of
            victims’ experiences.
          </p>
          <p>
            As a data edition, this publication aims not only to release
            interviews in a digital format, but also to unlock testimonies by
            drawing on modern technologies such as natural language processing
            and data mining. The edition is built around BlackLab, a
            sophisticated search engine that helps readers to explore the
            collection of testimonies. A filterable and searchable table of
            contents allows readers to browse and read transcripts or watch some
            but not all testimonies. All this is in fact an ongoing effort by
            the Fortunoff Archive; further exploratory tools will soon be
            developed in the coming years. This book also commemorates those
            millions of murdered victims, who could never share their
            experience. Technology has been employed to build an anthology of
            testimonial fragments that represents the experience of voiceless
            victims. Readers can get acquainted with the way technology has been
            applied under the <a href="/methods">Methodology</a> section.
          </p>
          <p>
            These exploratory tools complement the work of archivists,
            librarians, and indexers who work to make these testimonies
            discoverable by employing rigorous cataloguing standards and
            controlled vocabularies. In fact, as the reader shall see, this
            publication builds upon their important work. It also uses
            transcriptions of testimonies that were prepared by students and
            volunteers working for the FVAHT, USC, and USHMM. Their work
            significantly contributed to this publication. Even though this
            publication is the result of a small and dedicated team, it is based
            on many years of collaborative work and was designed as a project to
            encourage further cross-institutional cooperation.
          </p>
          <p>
          <br />
          <br />
          <br />
          <br />
          <b>Cover Image</b>: <i>Martyr Monument</i> (designed by Alfred Hajos), Kozma Street Jewish Cemetery, Budapest
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;

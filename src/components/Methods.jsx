import React from 'react';
import Hero from './Hero';

const Methods = props => (
  <div className='methods'>
    <Hero text='Methodology'/>
    <div className='container'>
      <p><i>In Search of the Drowned</i> consists of several technological components that are described in this part. In addition to discussion of how technology helped to accomplish this project, the three data sets made available by data providers are presented here; this includes their quantitative (distribution of gender, nationalities, average interview length, etc) and qualitative profiling, as well as the description of interview methodologies applied when recording them.</p>
      
      

      <h2>Data Sets</h2>
      <br/><br/><br/>
      <table className='image-trio'>
        <tbody>
          <tr>
            <td>

              {/* <a href='/essays' target='_blank'>*/}
                <div><a href="/methods/MethodsDatasetDescriptionFortunoff"><h3>Yale Fortunoff<br/>Video Archive</h3></a></div><hr/>
                <div className='teaser'>Read about the interviews shared by this data provider</div>
              {/* </a> */}
            </td>
            <td>
             {/* <a href='/methods' target='_blank'>*/}
                <div><a href="/methods/MethodsDatasetDescriptionUSC"><h3>USC Shoah Foundation, Visual History Archive</h3></a></div><hr/>
                <div className='teaser'>Read about the interviews shared by this data provider</div>
              {/*</a>*/}
            </td>
            <td>
             {/* <a href='/explore' target='_blank'> */}
                <div><a href="/methods/MethodsDatasetDescriptionUSHMM"><h3>United States Holocaust Memorial Museum</h3></a></div><hr/>
                <div className='teaser'>Read about the interviews shared by this data provider</div>
             {/*</a> */}
            </td>
          </tr>
        </tbody>
      </table>
      <br/><br/><br/>
      <h2>Data Processing</h2>
      <br/><br/><br/>
      <table className='image-trio'>
        <tbody>
          <tr>
            <td>
             {/* <a href='/essays' target='_blank'> */}
                <div><a href="/methods/MethodsMetadataProcessing"><h3>Transcripts & Metadata</h3></a></div><hr/>
                <div className='teaser'>Read about how transcripts and metadata were processed</div>
             {/* </a> */}
            </td>
            <td>
              {/*<a href='/essays' target='_blank'> */}
                <div><a href="/methods/MethodsLinguisticAnnotation"><h3>Linguistic Annotation</h3></a></div><hr/>
                <div className='teaser'>Read about how transcripts were transformed into an annotated linguistic corpus</div>
              {/*</a> */}
            </td>
            <td>
              {/*<a href='/essays' target='_blank'> */}
              <div><a href="/methods/MethodsMiningFragments"><h3>Retrieval of Fragments</h3></a></div><hr/>
              <div className='teaser'>Read about how testimonial fragments were retrieved with text and data mining</div>
             {/*</a> */}
            </td>
          </tr>
        </tbody>
      </table>
      <br/><br/><br/>
      <table className='image-trio'>
        <tbody>
          <tr>
            <td>
            </td>
            <td>
                {/* <a href='/essays' target='_blank'>*/}
                <div><a href="/methods/MethodsTechnicalSpecification"><h3>Technical Specifications<br/>of This Project</h3></a></div><hr/>
                <div className='teaser'>Read about the technology empowering this project</div>
              {/* </a> */}
            </td>
            <td>
            </td>
          </tr>
        </tbody>
      </table>
      <br/><br/><br/>
    </div>
  </div>
)

export default Methods;
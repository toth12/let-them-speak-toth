import React from 'react';
import Hero from './Hero';

const Methods = props => (
  <div className='methods'>
    <Hero text='Methodology' />
    <div className='container'>
      <p>Let Them Speak consists of several technological components that are described in this part. Beyond the discussion of how technology helped to accomplish this project, the three data sets made available by data providers are presented here, including their quantitative (distribution of gender, nationalities, average interview length, etc) and qualitative profiling description of interview methodologies applied when recording the interviews. Content is under development.</p>
      <h2>Data Sets</h2>
   
     <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tincidunt cursus ipsum, ut maximus risus condimentum ut. Vivamus elementum, velit et posuere dapibus, arcu enim vulputate leo, at imperdiet urna metus ac odio. Etiam id tincidunt libero. Sed ornare libero lectus, sed fringilla leo eleifend eu.</p> 

      <br/><br/><br/>
      <table className='image-trio'>
        <tbody>
          <tr>
            <td>
              <a href='/essays' target='_blank'>
                <div><h3>Yale Fortunoff<br/>Video Archive</h3></div><hr/>
                <div className='teaser'>Testimonies of Holocaust survivors at Yale University</div>
              </a>
            </td>
            <td>
              <a href='/methods' target='_blank'>
                <div><h3>USC Shoah Foundation, Visual Archive</h3></div><hr/>
                <div className='teaser'>Lorem ipsum dolor sit amet, consectetur adipiscing elit sed fringilla leo eleifend eu</div>
              </a>
            </td>
            <td>
              <a href='/explore' target='_blank'>
                <div><h3>United States Holocaust Memorial Museum</h3></div><hr/>
                <div className='teaser'>Lorem ipsum dolor sit amet, consectetur adipiscing elit </div>
              </a>
            </td>
          </tr>
        </tbody>
      </table>
      <br/><br/><br/>        

      <h2>Data Processing</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam tincidunt cursus ipsum, ut maximus risus condimentum ut. Vivamus elementum, velit et posuere dapibus, arcu enim vulputate leo, at imperdiet urna metus ac odio. Etiam id tincidunt libero. Sed ornare libero lectus, sed fringilla leo eleifend eu.</p> 

          <br/><br/><br/>
          <table className='image-trio'>
            <tbody>
              <tr>
                <td>
                  <a href='/essays' target='_blank'>
                    <div><h3>Transcripts & Metadata</h3></div><hr/>
                    <div className='teaser'>Lorem ipsum dolor sit amet consectetur adipiscing elit</div>
                  </a>
                </td>
                <td>
                  <a href='/methods' target='_blank'>
                    <div><h3>Linguistic Annotation</h3></div><hr/>
                    <div className='teaser'>Lorem ipsum dolor sit amet, consectetur adipiscing elit sed fringilla leo eleifend eu</div>
                  </a>
                </td>
                <td>
                  <a href='/explore' target='_blank'>
                    <div><h3>Retrieval of Fragments</h3></div><hr/>
                    <div className='teaser'>Lorem ipsum dolor sit amet, consectetur adipiscing elit </div>
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
          <br/><br/><br/>    
    </div>
  </div>
)

export default Methods;
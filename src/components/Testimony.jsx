import React from 'react';
import { connect } from 'react-redux';
import { hideTestimony } from '../actions/testimony';

class Testimony extends React.Component {
  
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this);
    this.getText = this.getText.bind(this);
  }

  handleClick(e) {
    const modal = document.querySelector('.testimony');
    if (modal.contains(e.target)) return;
    this.props.hideTestimony();
  }

  getText() {
    return {__html: breakLines(this.props.testimony.full_text)}
  }

  render() {
    const testimony = this.props.testimony;
    const content = testimony === null ? null :
      <div className='testimony-modal-container' onClick={this.handleClick}>
        <div className='testimony-inner'>
          <div className='testimony'>
            <div className='content'>
              <div className='right'>
                <div className='tabs'>
                  <div className='tab'>Video</div>
                  <div className='tab'>History</div>
                </div>
                <div className='right-content'>
                  {isVideo(testimony.media_url) ? 
                    <Video url={testimony.media_url} />
                    : <Audio url={testimony.media_url} />
                  }
                  <History />
                  <div className='media-caption'>{testimony.media_caption}</div>
                </div>
              </div>
              <div className='left'>
                <div className='title'>
                  {'Transcript Title: ' + testimony.testimony_title}
                </div>
                <div className='body'
                  dangerouslySetInnerHTML={this.getText()}>
                </div>
              </div>
              <div className='footer'>
                <div>{'Courtesy of ' + testimony.collection}</div>
                <div>
                  <span>{'Copyright ' + (testimony.recording_year || '2018') + ' |'}</span>
                  <span>{'Accession number: ' + (testimony.accession_number || 'NA') + ' |'}</span>
                  <span>{'RG Number ' + testimony.rg_number || 'NA'}</span>
                </div>
              </div>
            </div>
            <div className='clear-both' />
          </div>
        </div>
      </div>
    return content;
  }
}

const isVideo = str => str.indexOf('.mp4') > -1;

const breakLines = str => str.replace(/(?:\r\n|\r|\n)/g, '<br/><br/>');

const Video = props => (
  <video width='320' height='240' controls>
    <source src={props.url} type='video/mp4' />
    Your browser does not support the video tag.
  </video>
)

const Audio = props => (
  <div className='audio-container'>
    <img src='http://via.placeholder.com/320x240' />
    <audio controls>
      <source src={props.url} type='audio/mpeg' />
      Your browser does not support the audio tag.
    </audio>
  </div>
)

const History = props => (
  <div className='history'>{props.text}</div>
)

const mapStateToProps = state => ({
  testimony: state.testimony.testimony,
  err: state.testimony.err,
})

const mapDispatchToProps = dispatch => ({
  hideTestimony: () => dispatch(hideTestimony()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Testimony);
import React from 'react';
import { connect } from 'react-redux';
import img from '../assets/images/x-close.svg';
import { hideTestimony } from '../actions/testimony';
import { smpte } from '../assets/images/smpte.png';

class Testimony extends React.Component {

  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this);
    this.activateSentences = this.activateSentences.bind(this);
    this.state = {timerId: null};
  }

  componentDidUpdate(prevProps) {
    if (!this.props.sentenceStart || !this.props.sentenceEnd) return;
    if (this.props.sentenceStart !== prevProps.sentenceStart ||
        this.props.sentenceEnd !== prevProps.sentenceEnd) {
      this.activateSentences();
    }
  }

  handleClick(e) {
    const modal = document.querySelector('.testimony');
    if (modal.contains(e.target) && e.target.className != 'close') return;
    this.props.hideTestimony();
  }

  activateSentences() {
    const container = document.querySelector('.testimony .content .left .body');
    if (!container) {
      this.setState({timerId: setTimeout(this.activateSentences, 200)});
      return;
    };
    // remove active class from any extant sentences
    const elems = container.querySelectorAll('span');
    for (let i=0; i<elems.length; i++) {
      elems[i].className = elems[i].className.replace(' active', '');
    }
    // highlight the active sentence(s)
    for (let i=this.props.sentenceStart; i<this.props.sentenceEnd+1; i++) {
      const elem = document.querySelector('#s' + i);
      elem.className += ' active';
    }
    // scroll the first sentence into view
    const elem = document.querySelector('#s' + this.props.sentenceStart);
    container.scrollTop = elem.offsetTop - 200;
  }

  render() {
    const testimony = this.props.testimony;
    const content = testimony === null ? null :
      <div className='testimony-modal-container' onClick={this.handleClick}>
        <div className='testimony-inner'>
          <div className='testimony'>
            <div className='content'>
              <Right testimony={testimony} />
              <Left testimony={testimony} />
              <Footer testimony={testimony} />
            </div>
            <div className='clear-both' />
          </div>
        </div>
      </div>
    return content;
  }
}

const Right = props => (
  <div className='right'>
    <img className='close'src={img} />
    <div className='title'>Media</div>
    <div className='right-body'>
      <Media testimony={props.testimony} />
      <Metadata testimony={props.testimony} />
    </div>
  </div>
)

const Left = props => (
  <div className='left'>
    <div className='title'>
      Transcript Excerpt: {props.testimony.testimony_title}
    </div>
    <div className='left-body'
      dangerouslySetInnerHTML={{__html: props.testimony.html_transcript}}>
    </div>
  </div>
)

const Footer = props => (
  <div className='footer'>
    <div>{'Courtesy of ' + props.testimony.collection}</div>
    <div>
      <span>Copyright </span>
      <span>{(props.testimony.recording_year || '2018') + ' | '}</span>
      <span>Provenance: </span>
      <span>{(props.testimony.provenance || 'NA')}</span>
    </div>
  </div>
)

const Media = props => (
  <div className='media'>
    {isVideo(props.testimony.media_url[0]) ?
      <Video url={props.testimony.media_url[0]} />
      : <Audio url={props.testimony.media_url[0]} />
    }
  </div>
)

const Video = props => (
  <video width='340' height='260' controls>
    <source src={props.url} type='video/mp4' />
    Your browser does not support the video tag.
  </video>
)

const Audio = props => (
  <div className='audio-container'>
    <img src='http://via.placeholder.com/340x220' />
    <audio controls>
      <source src={props.url} type='audio/mpeg' />
      Your browser does not support the audio tag.
    </audio>
  </div>
)

const Metadata = props => (
  <div className='metadata'>
    <div className='metadata-block'>
      <div><b>About the Interview</b></div>
      <div>Shelfmark: {props.testimony.shelfmark}</div>
      <div>Interview date: {props.testimony.recording_year}</div>
      {props.testimony.camp_names.length ?
        <div>Camp: {props.testimony.camp_names.join(', ')}</div>
        : null
      }
      {props.testimony.ghetto_names.length ?
        <div>Camp: {props.testimony.ghetto_names.join(', ')}</div>
        : null
      }
      <div>Provenance: {props.testimony.provenance}</div>
    </div>
    <div className='metadata-block'>
      <div><b>Interview Summary</b></div>
      <div>{props.testimony.interview_summary}</div>
    </div>
  </div>
)

const isVideo = str => str.indexOf('.mp4') > -1;

const mapStateToProps = state => ({
  testimony: state.testimony.testimony,
  err: state.testimony.err,
  sentenceStart: state.testimony.sentenceStart,
  sentenceEnd: state.testimony.sentenceEnd,
})

const mapDispatchToProps = dispatch => ({
  hideTestimony: () => dispatch(hideTestimony()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Testimony);
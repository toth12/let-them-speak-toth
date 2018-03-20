import React from 'react';
import { connect } from 'react-redux';
import img from '../assets/images/x-close.svg';
import {
  hideTestimony,
  setTestimonyTab
} from '../actions/testimony';

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
              <Right testimony={testimony}
                tab={this.props.tab}
                setTab={this.props.setTab} />
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
    <div className='tabs'>
      <Tab val='video' label='Video' {...props} />
      <Tab val='history' label='History' {...props} />
    </div>
    <div className='right-content'>
      {props.tab === 'history' ?
        <div className='history'>{props.testimony.interview_summary}</div>
        : <Media testimony={props.testimony} />
      }
    </div>
  </div>
)

const Left = props => (
  <div className='left'>
    <div className='title'>{props.testimony.testimony_title}</div>
    <div className='body'
      dangerouslySetInnerHTML={{__html: props.testimony.html_text}}>
    </div>
  </div>
)

const Footer = props => (
  <div className='footer'>
    <div>{'Courtesy of ' + props.testimony.collection}</div>
    <div>
      <span>Copyright </span>
      <span>{(props.testimony.recording_year || '2018') + ' | '}</span>
      <span>Accession number: </span>
      <span>{(props.testimony.accession_number || 'NA') + ' | '}</span>
      <span>RG Number </span>
      <span>{props.testimony.rg_number || 'NA'}</span>
    </div>
  </div>
)

const Tab = props => (
  <div className={props.tab.toLowerCase() === props.label.toLowerCase() ?
      'tab active' : 'tab'}
    onClick={props.setTab.bind(null, props.val)}>{props.label}</div>
)

const Media = props => (
  <div className='media'>
    {isVideo(props.testimony.media_url) ?
      <Video url={props.testimony.media_url} />
      : <Audio url={props.testimony.media_url} />
    }
    <div className='media-caption'>{props.testimony.media_caption}</div>
  </div>
)

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

const isVideo = str => str.indexOf('.mp4') > -1;

const breakLines = str => str.replace(/(?:\r\n|\r|\n)/g, '<br/><br/>');

const mapStateToProps = state => ({
  testimony: state.testimony.testimony,
  err: state.testimony.err,
  tab: state.testimony.tab,
  sentenceStart: state.testimony.sentenceStart,
  sentenceEnd: state.testimony.sentenceEnd,
})

const mapDispatchToProps = dispatch => ({
  hideTestimony: () => dispatch(hideTestimony()),
  setTab: tab => dispatch(setTestimonyTab(tab)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Testimony);
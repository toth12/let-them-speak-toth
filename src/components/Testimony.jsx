import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import img from '../assets/images/x-close.svg';
import placeholder from '../assets/images/placeholder.jpg';
import { hideTestimony, clearActiveMedia } from '../actions/testimony';

class Testimony extends React.Component {

  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this);
    this.activateSentences = this.activateSentences.bind(this);
    this.setMediaStart = this.setMediaStart.bind(this);
    this.state = {
      highlightId: null,
      timeId: null,
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.sentenceStart && this.props.sentenceEnd) {
      if (this.props.sentenceStart !== prevProps.sentenceStart ||
          this.props.sentenceEnd !== prevProps.sentenceEnd) {
        this.activateSentences();
      }
    }

    if (this.props.mediaStart) {
      if (this.props.mediaStart !== prevProps.mediaStart) {
        this.setMediaStart();
      }
    }
  }

  componentWillUnmount() {
    this.state = {
      highlightId: null,
      timeId: null,
    }
  }

  handleClick(e) {
    const modal = $('.testimony');
    if (modal.contains(e.target) && e.target.className != 'close') return;
    this.props.hideTestimony();
  }

  activateSentences() {
    const container = $('.testimony .content .left-body');
    if (!container || !this.props.sentenceStart || !this.props.sentenceEnd) {
      this.setState({highlightId: setTimeout(this.activateSentences, 200)});
      return;
    };
    // remove active class from any extant sentences
    const elems = container.querySelectorAll('span');
    for (let i=0; i<elems.length; i++) {
      elems[i].className = elems[i].className.replace(' active', '');
    }
    // highlight the active sentence(s)
    for (let i=this.props.sentenceStart; i<this.props.sentenceEnd+1; i++) {
      let match = $('#s' + i);
      if (match) match.className += ' active';
      else (console.log('#s' + i + ' could not be found'));
    }
    // scroll the first sentence into view
    const elem = $('#s' + this.props.sentenceStart);
    if (elem) container.scrollTop = elem.offsetTop - 200;
  }

  setMediaStart() {
    let media, selector;
    if (this.props.testimony) {
      const url = getMediaUrl(this.props.testimony, this.props.mediaIndex);
      if (isVideo(url)) selector = 'video';
      if (isAudio(url)) selector = 'audio';
      if (selector) media = $(selector);
    }
    if (!media) {
      this.setState({timeId: setTimeout(this.setMediaStart, 200)})
      return;
    }
    media.currentTime = this.props.mediaStart;
  }

  render() {
    const testimony = this.props.testimony;
    const content = !testimony ? null :
      <div className='testimony-modal-container' onClick={this.handleClick}>
        <div className='testimony-inner'>
          <div className='testimony'>
            <div className='content'>
              <Right {...this.props} />
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
    <img className='close' src={img} />
    <div className='title'>Media</div>
    <div className='right-body'>
      <Media {...props} />
      <Metadata testimony={props.testimony} />
    </div>
  </div>
)

const Left = props => (
  <div className='left'>
    <div className='title'>
      Transcript Excerpt: {props.testimony.testimony_title}
    </div>
    <div className='left-body transcript-text'
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

const Media = props => {
  return <NoMedia />;
  const url = getMediaUrl(props.testimony, props.mediaIndex);
  if (url) {
    if (isVideo(url)) {
      content = <Video url={url} />
    } else if (isAudio(url)) {
      content = <Audio url={url} />
    }
  }
  return <div className='media-container'>{content}</div>;
}

const Video = props => (
  <video width='340' height='260' controls>
    <source src={props.url} type='video/mp4' />
    Your browser does not support the video tag.
  </video>
)

const Audio = props => (
  <div className='audio-container'>
    <img src={placeholder} />
    <audio controls>
      <source src={props.url} type='audio/mpeg' />
      Your browser does not support the audio tag.
    </audio>
  </div>
)

const NoMedia = props => (
  <div className='no-media'>No media is available for this record.</div>
)

const Metadata = props => (
  <div className='metadata'>
    <div className='metadata-block'>
      <div><b>About the Interview</b></div>
      <div>Shelfmark: {props.testimony.shelfmark}</div>
      <div>Interview date: {props.testimony.recording_year}</div>
      {props.testimony.camp_names.length
        ? <div>Camps: {props.testimony.camp_names.join(', ')}</div>
        : null
      }
      {props.testimony.ghetto_names.length
        ? <div>Camp: {props.testimony.ghetto_names.join(', ')}</div>
        : null
      }
      <div>Provenance: {props.testimony.provenance}</div>
    </div>
    <div className='metadata-block'>
      {props.testimony.interview_summary
        ? <div>
            <div><b>Interview Summary</b></div>
            <div>{props.testimony.interview_summary}</div>
          </div>
        : null
      }
    </div>
  </div>
)

const $ = selector => document.querySelector(selector);

const getMediaUrl = (testimony, mediaIndex) => {
  if (Number.isInteger(mediaIndex) && testimony.media_url[mediaIndex]) {
    return testimony.media_url[mediaIndex];
  } else if (testimony.media_url) {
    return testimony.media_url[0];
  } else {
    return '';
  }
}

const isVideo = str => str.indexOf('.mp4') > -1;

const isAudio = str => str.indexOf('.mp3') > -1;

const testimonyProps = PropTypes.shape({
  camp_names: PropTypes.arrayOf(PropTypes.string),
  collection: PropTypes.string,
  gender: PropTypes.string,
  ghetto_names: PropTypes.arrayOf(PropTypes.string),
  html_transcript: PropTypes.string.isRequired,
  interview_summary: PropTypes.string.isRequired,
  interviewee_name: PropTypes.string.isRequired,
  media_url: PropTypes.arrayOf(PropTypes.string),
  provenance: PropTypes.string.isRequired,
  recording_year: PropTypes.number.isRequired,
  shelfmark: PropTypes.string.isRequired,
  testimony_id: PropTypes.string.isRequired,
  testimony_title: PropTypes.string.isRequired,
  thumbnail_url: PropTypes.string.isRequired,
})

Testimony.PropTypes = {
  err: PropTypes.bool.isRequired,
  hideTestimony: PropTypes.func.isRequired,
  mediaStart: PropTypes.number,
  sentenceStart: PropTypes.number.isRequired,
  sentenceEnd: PropTypes.number.isRequired,
  testimony: testimonyProps,
}

Right.PropTypes = testimonyProps;
Left.PropTypes = testimonyProps;
Footer.PropTypes = testimonyProps;
Media.PropTypes = testimonyProps;
Metadata.PropTypes = testimonyProps;
Audio.PropTypes = testimonyProps;

const mapStateToProps = state => ({
  testimony: state.testimony.testimony,
  err: state.testimony.err,
  sentenceStart: state.testimony.sentenceStart,
  sentenceEnd: state.testimony.sentenceEnd,
  mediaIndex: state.testimony.mediaIndex,
  mediaStart: state.testimony.mediaStart,
})

const mapDispatchToProps = dispatch => ({
  hideTestimony: () => dispatch(hideTestimony()),
  clearActiveMedia: () => dispatch(clearActiveMedia()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Testimony);

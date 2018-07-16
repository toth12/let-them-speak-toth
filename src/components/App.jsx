import React from 'react';
import Nav from './Nav';
import Testimony from './Testimony';
import Err from './Error';

class AppWrapper extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      err: false,
    }
  }

  componentWillMount() {
    const self = this;
    window.onerror = function () {
      self.setState({err: true})
    };
    window.addEventListener('error', function () {
      self.setState({err: true})
    })
  }

  render() {
    return (
      <div className='app-container'>
        <Nav />
        <Testimony />
        {this.state.err ? <Err className='top-level-err' /> : null}
        <div className='app-wrap'>
          {this.props.children}
        </div>
      </div>
    )
  }
}

export default AppWrapper;
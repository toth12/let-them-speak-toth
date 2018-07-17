import React from 'react';
import { connect } from 'react-redux';
import Loader from './Loader';

class TestimonyLoader extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const content = this.props.testimonyLoading
      ? <div className='testimony-loader'>
          <Loader />
        </div>
      : null

    return content;
  }
}

const mapStateToProps = state => ({
  testimonyLoading: state.testimony.loading,
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(TestimonyLoader);
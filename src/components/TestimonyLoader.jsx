import React from 'react';
import { connect } from 'react-redux';
import Loader from './Loader';

class TestimonyLoader extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className='testimony-loader'>
        {this.props.testimonyLoading
          ? <Loader />
          : null
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  testimonyLoading: state.testimony.loading,
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(TestimonyLoader);
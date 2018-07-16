import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { clearFilters } from '../actions/filters';
import img from '../assets/images/brand.svg';

class Nav extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidUpdate(prevProps) {
    if (prevProps.route !== this.props.route) {
      this.props.clearFilters()
    }
  }

  render() {
    return (
      <nav>
        <ul>
          <li><Link to={'/about'}>ABOUT</Link></li>
          <li><Link to={'/essays'}>ESSAYS</Link></li>
          <li><Link to={'/explore'}>EXPLORE</Link></li>
          <li className='brand'>
            <Link to={'/#'}><img src={img} /></Link>
          </li>
          <li><Link to={'/anthology'}>FRAGMENTS</Link></li>
          <li><Link to={'/methods'}>METHODOLOGY</Link></li>
        </ul>
      </nav>
    )
  }
}

const mapStateToProps = state => ({
  route: state.router.location.pathname,
})

const mapDispatchToProps = dispatch => ({
  clearFilters: () => dispatch(clearFilters()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
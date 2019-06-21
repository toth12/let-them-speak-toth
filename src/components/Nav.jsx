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
          <ActiveLink
            child={<Link to={'/about'}>ABOUT</Link>}
            routes={['/about']}
            activeRoute={this.props.route} />
          <ActiveLink
            child={<Link to={'/essays'}>MONOGRAPH</Link>}
            routes={['/essays']}
            activeRoute={this.props.route} />
          <ActiveLink
            child={<Link to={'/methods'}>METHODOLOGY</Link>}
            routes={['/methods']}
            activeRoute={this.props.route} />
          <li className='brand'>
            <Link to={'/#'}><img src={img} /></Link>
          </li>
          <ActiveLink
            child={<Link to={'/anthology'}>FRAGMENTS</Link>}
            routes={['/anthology']}
            activeRoute={this.props.route} />
          <ActiveLink
            child={<Link to={'/explore'}>TESTIMONIES</Link>}
            routes={['/contents','/explore']}
            activeRoute={this.props.route} />
          <ActiveLink
            child={<Link to={'/search'}>SEARCH</Link>}
            routes={['/search']}
            activeRoute={this.props.route} />
        </ul>
      </nav>
    )
  }
}

const ActiveLink = props => {
  return props.routes.indexOf(props.activeRoute) > -1
    ? <li className='active'>{props.child}</li>
    : <li>{props.child}</li>
}

const mapStateToProps = state => ({
  route: state.router.location.pathname,
})

const mapDispatchToProps = dispatch => ({
  clearFilters: () => dispatch(clearFilters()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Nav);
import React from 'react';
import { Link } from 'react-router-dom';
import img from '../assets/images/brand.png';

const Nav = (props) => (
  <nav>
    <ul>
      <li><Link to={'/about'}>ABOUT</Link></li>
      <li><Link to={'/essays'}>ESSAYS</Link></li>
      <li><Link to={'/explore'}>EXPLORE</Link></li>
      <li className='brand'>
        <Link to={'/#'}><img src={img} /></Link>
      </li>
      <li><Link to={'/anthology'}>ANTHOLOGY</Link></li>
      <li><Link to={'/methods'}>METHODOLOGY</Link></li>
    </ul>
  </nav>
)

export default Nav;
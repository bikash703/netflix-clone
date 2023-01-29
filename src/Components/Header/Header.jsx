import React from 'react';
import { Link } from 'react-router-dom';
import img from '../../Logonetflix.png';
import {BiSearch} from 'react-icons/bi'
 
const Header = () => {
  return (
    <div className='header'>
      <img src={img} alt="logo" />
      <div>
        <Link to={'/home'}>Home</Link>
        <Link to={'/tvshows'}>TV Shows</Link>
        <Link to={'/movies'}>Movies</Link>
        <Link to={'/recentlyadded'}>Recently Added</Link>
        <Link to={'/mylist'}>My List</Link>
      </div>
        <BiSearch/>
    </div>
  )
}

export default Header

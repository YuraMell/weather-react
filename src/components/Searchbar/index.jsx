import React from 'react'
import './index.css'
import search from './../../img/search.png'
import HomeButton from '../HomeButton'


const Searchbar = () => {
  return (
    <div className="searchbar">
      <label htmlFor="search">
        <img src={search} alt="" className='search' />
        <input type="search" name="search" id="search" placeholder='search for places ...' />
      </label>
      <HomeButton />
    </div>
  )
}

export default Searchbar
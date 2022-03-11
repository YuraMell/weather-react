import React, { useState } from 'react'
import './index.css'
import search from './../../img/search.png'
import home from './../../img/home.png'


const Searchbar = () => {
  const [searchValue, setSearchValue] = useState('second')

  const searchFunction = () => {
    alert(searchValue)
  }

  const changeHandler = (e) => setSearchValue(e.target.value)

  return (
    <div className="searchbar">
      <label htmlFor="search">
        <img
          src={search}
          alt="search"
          className='search'
          onClick={searchFunction}
        />
        <input
          type="search"
          name="search"
          id="search"
          placeholder='search for places ...'
          onChange={changeHandler}
        />
      </label>
      <img
        src={home}
        alt="home"
        className='home-button'
        onClick={searchFunction}
      />
    </div>
  )
}

export default Searchbar
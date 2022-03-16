import React, { useState } from 'react'
import './index.css'
import search from './../../img/search.png'
import home from './../../img/home.png'


const Searchbar = () => {
  const [searchValue, setSearchValue] = useState('')

  const searchFunction = () => {
    if (searchValue) {
      alert(searchValue)
    }
  }

  const changeHandler = (e) => setSearchValue(e.target.value)

  return (
    <div className="searchbar">
      <label htmlFor="search">
        <img
          src={search}
          alt="search"
          className='search-img'
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
      />
    </div>
  )
}

export default Searchbar
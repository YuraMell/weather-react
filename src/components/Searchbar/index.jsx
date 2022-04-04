import React, { useState } from 'react'
import './index.css'
import search from './../../img/search.png'
import home from './../../img/home.png'
import { useDispatch } from 'react-redux'
import Dropdown from '../Dropdown'
import { fetchData } from '../../hooks/fetchData'


const Searchbar = () => {
  const [searchValue, setSearchValue] = useState('')
  const dispatch = useDispatch()

  const searchPlace = (searchValue) => searchValue && dispatch(fetchData(searchValue))

  const resetValue = () => {
    dispatch(fetchData('Kyiv'))
  }

  return (
    <div className="searchbar">
      <label htmlFor="search">
        <img
          src={search}
          alt="search"
          className='search-img'
          onClick={() => searchPlace(searchValue)}
        />
        <Dropdown searchPlace={searchPlace} />
      </label>
      <img
        src={home}
        alt="home"
        className='home-button'
        onClick={resetValue}
      />
    </div>
  )
}

export default Searchbar
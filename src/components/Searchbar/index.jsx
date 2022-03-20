import React, { useState, useEffect } from 'react'
import './index.css'
import search from './../../img/search.png'
import home from './../../img/home.png'
import { useDispatch } from 'react-redux'
import { fetchData } from '../../store/reducers/temperatureReducer'


const Searchbar = () => {
  const [searchValue, setSearchValue] = useState('')
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchData('Kyiv'))
  }, [dispatch])

  const searchFunction = () => searchValue && dispatch(fetchData(searchValue))

  const resetValue = () => {
    setSearchValue('')
    dispatch(fetchData('Kyiv'))
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
          value={searchValue}
        />
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
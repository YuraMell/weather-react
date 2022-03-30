import React, { useState, useEffect } from 'react'
import { fetchData } from '../../store/reducers/temperatureReducer'
import { useDispatch } from 'react-redux'

import './index.css'
import axios from 'axios'

const Dropdown = ({ searchFunction }) => {
  const [searchValue, setSearchValue] = useState('')
  const [cities, setCities] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchData('Kyiv'))
  }, [dispatch])

  const fetchCities = async (url) => {
    const res = await axios.get(url)
    setCities(res.data)
    return res.data
  }

  useEffect(() => {
    fetchCities('https://raw.githubusercontent.com/aZolo77/citiesBase/master/cities.json')
  }, [])


  const changeHandler = (e) => setSearchValue(e.target.value)

  return (
    <>
      <input
        type="search"
        name="search"
        id="search"
        autoComplete='off'
        placeholder='search for places ...'
        onChange={changeHandler}
        value={searchValue}
      />
      {searchValue &&
        <div className='options'>
          {cities.city
            .filter(item => item.name.toLowerCase().includes(searchValue.toLowerCase()))
            .map(item =>
              <div
                onClick={() => searchFunction(item.name)}
                className='option'
              >
                {item.name}
              </div>
            ).slice(0, 5)
          }
        </div>
      }
    </>
  )
}

export default Dropdown
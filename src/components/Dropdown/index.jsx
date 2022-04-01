import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './index.css'
import { fetchData } from '../../hooks/fetchData'
import { useFetch } from '../../hooks/useFetch'

const Dropdown = ({ searchFunction }) => {
  const [searchValue, setSearchValue] = useState('')
  const [hide, setHide] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchData('Kyiv'))
  }, [dispatch])

  const cities = useFetch('https://raw.githubusercontent.com/aZolo77/citiesBase/master/cities.json')

  const onClickOptionFunc = (name) => {
    searchFunction(name)
    setHide(true)
  }

  const changeHandler = (e) => {
    setSearchValue(e.target.value)
    setHide(false)
  }

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
        <div className={hide ? 'options hide' : 'options'}>
          {cities.city
            .filter(city => city.name.toLowerCase().includes(searchValue.toLowerCase()))
            .map((item, index) =>
              <div
                onClick={() => onClickOptionFunc(item.name)}
                className='option'
                key={index}
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
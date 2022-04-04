import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './index.css'
import { fetchData } from '../../hooks/fetchData'
import Autocomplete from "react-google-autocomplete";

const Dropdown = ({ searchPlace }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchData('Kyiv'))
  }, [dispatch])

  return (
    <Autocomplete
      apiKey="AIzaSyAQ0zSdSTORRJk0oYmKM2u_yuwwWRoYe7s"
      onPlaceSelected={(place) => {
        const selectedPlace = place.formatted_address.split(',')[0]
        searchPlace(selectedPlace)
      }}
      id="search"
      onFocus={e => e.target.setAttribute('autocomplete', 'off')}
    />
  )
}

export default Dropdown
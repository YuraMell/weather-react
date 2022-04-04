import React, { useCallback, useState, memo } from 'react'
import './index.css'
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';

const Map = ({ lat, lon }) => {
  const containerStyle = {
    minWidth: '530px',
    minHeight: '300px',
  };

  const center = {
    lat: lat,
    lng: lon,
  };

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyAQ0zSdSTORRJk0oYmKM2u_yuwwWRoYe7s"
  })

  const [map, setMap] = useState(null)

  const onLoad = useCallback(map => {
    const bounds = new window.google.maps.LatLngBounds();
    map.fitBounds(bounds);
    setMap(map)
  }, [])

  const onUnmount = useCallback(map => setMap(null), [])

  return isLoaded &&
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onLoad}
      onUnmount={onUnmount}
    />
}

export default memo(Map)
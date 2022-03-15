import React from 'react'
import './index.css'

const Map = () => {
  return (
    <iframe
      src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d19297.756820861116!2d28.46362713796437!3d49.23202080264451!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1suk!2sua!4v1647345859243!5m2!1suk!2sua"
      title='map'
      allowFullScreen=""
      loading="lazy"
      className='map'></iframe>
  )
}

export default Map
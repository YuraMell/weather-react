import React from 'react'
import './index.css'

const CardInfo = ({ name, children }) => {
  return (
    <div className='card-info'>
      <p className='card-info-name'>{name}</p>
      {children}
    </div>
  )
}

export default CardInfo
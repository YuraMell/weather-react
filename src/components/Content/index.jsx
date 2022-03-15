import React from 'react'
import CardInfo from '../CardInfo'
import Map from '../Map'
import Tabs from '../Tabs'
import './index.css'

const Content = () => {

  const v = 7.5;

  return (
    <main>
      <Tabs />
      <div className="grid-info">
        <div className="grid-cards-info">

          <CardInfo name="UV index">
            <div className="progressbar-container">
              <div role="progressbar" aria-valuemin="0" aria-valuemax="15" style={{ "--value": v / 15 * 50 }}>
                <p>{v}</p>
              </div>
            </div>
          </CardInfo>
          <CardInfo name="UV index">
            <progress>qqqq</progress>
          </CardInfo>
          <CardInfo name="UV index">
            <progress>qqqq</progress>
          </CardInfo>
          <CardInfo name="UV index">
            <progress>qqqq</progress>
          </CardInfo>
          <CardInfo name="UV index">
            <progress>qqqq</progress>
          </CardInfo>
          <CardInfo name="UV index">
            <progress>qqqq</progress>
          </CardInfo>
        </div>
        <Map />
      </div>
    </main>
  )
}

export default Content
import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import CardWeather from '../CardWeather';
import 'react-tabs/style/react-tabs.css';
import './index.css'
import TemperatureSwitch from '../TemperatureSwitch';
import { useSelector } from 'react-redux';
import { setAnotherDay } from '../../store/reducers/temperatureReducer';
import { useDispatch } from 'react-redux';

const CustomTabs = () => {
  const apiWeather2 = useSelector(state => state.temperatureReducer.apiWeather2)
  const dispatch = useDispatch()

  const dailyAndHourlyObj = [
    { 'Today': apiWeather2?.hourly?.filter((_, index) => index % 6 === 0) },
    { 'Week': apiWeather2?.daily?.slice(0, apiWeather2?.daily?.length - 1) }
  ]

  const setAsideDay = (e, tabIndex, index) => {
    if (tabIndex === 1) {
      const cards = document.querySelectorAll('.card-weather')
      cards.forEach(card => card.classList.remove('active'))
      e.currentTarget.classList.add('active')
      dispatch(setAnotherDay(index))
    }
  }

  const setHours = (index) => `${index * 3}:00`

  const setDay = (index) => {
    const today = new Date().getDay()
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    return days[today + index < 7 ? (today + index) : (today - 7 + index)]
  }

  const setMin = (item, index) => index === 0 ? Math.floor(item.feels_like) : Math.floor(item.temp.min)
  const setMax = (item, index) => index === 0 ? Math.floor(item.temp) : Math.floor(item.temp.max)
  const setPeriod = (tab, index) => tab === 0 ? setHours(index) : setDay(index)
  const setClouds = (tab, index) => tab === 0 ? dailyAndHourlyObj[0]?.Today[index]?.clouds : dailyAndHourlyObj[1]?.Week[index]?.clouds

  return (
    <Tabs>
      <TabList>
        {dailyAndHourlyObj.map((tab, index) => <Tab key={index}>{Object.keys(tab)}</Tab>)}
      </TabList>
      <TemperatureSwitch />
      {dailyAndHourlyObj?.map((tab, tabIndex) =>
        <TabPanel key={tabIndex}>
          {Object.values(tab)[0]?.map((item, index) =>
            <CardWeather
              key={index}
              min={setMin(item, tabIndex)}
              max={setMax(item, tabIndex)}
              period={setPeriod(tabIndex, index)}
              cloudiness={setClouds(tabIndex, index)}
              onClickFunc={(e) => setAsideDay(e, tabIndex, index)}
            />
          )}
        </TabPanel>
      )}
    </Tabs>
  )
}

export default CustomTabs
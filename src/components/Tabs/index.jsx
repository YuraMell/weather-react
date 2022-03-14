import React from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import CardWeather from '../CardWeather';
import 'react-tabs/style/react-tabs.css';
import './index.css'
import TemperatureSwitch from '../TemperatureSwitch';
import { useSelector } from 'react-redux';

const CustomTabs = () => {
  const data = useSelector(state => state.temperature.temperatureArr)

  const setDay = (index) => {
    const today = new Date().getDay()
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
    return days[today + index < 7 ? (today + index) : (today - 7 + index)]
  }

  const setHours = (index) => `${index * 3}:00`

  const setPeriod = (tab, index) => tab.id === 1 ? setHours(index) : setDay(index)

  return (
    <Tabs>
      <TabList>
        {data.map(tab => <Tab key={tab.id}>{tab.tabTitle}</Tab>)}
      </TabList>
      <TemperatureSwitch />
      {data.map(tab =>
        <TabPanel key={tab.id}>
          {tab.tabContent.map((item, index) =>
            <CardWeather
              key={index}
              min={item.min}
              max={item.max}
              period={setPeriod(tab, index)}
              cloudiness={item.cloudiness}
            />
          )}
        </TabPanel>
      )}
    </Tabs>
  )
}

export default CustomTabs
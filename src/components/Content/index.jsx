import React from 'react'
import Tabs from '../Tabs'
import './index.css'


const data = [
  {
    id: 1,
    tabTitle: "Today",
    tabContent: [
      {
        min: 5,
        max: 8,
        cloudly: false
      },
      {
        min: 20,
        max: 8,
        cloudly: true
      },
      {
        min: 5,
        max: 8,
        cloudly: true
      },
      {
        min: 5,
        max: 8,
        cloudly: false
      },
      {
        min: 20,
        max: 8,
        cloudly: true
      },
      {
        min: 5,
        max: 8,
        cloudly: true
      },
      {
        min: 5,
        max: 8,
        cloudly: true
      },
      {
        min: 5,
        max: 8,
        cloudly: true
      },
    ]
  },
  {
    id: 2,
    tabTitle: "Week",
    tabContent: [
      {
        min: 5,
        max: 8,
        cloudly: false
      },
      {
        min: 20,
        max: 8,
        cloudly: true
      },
      {
        min: 5,
        max: 8,
        cloudly: true
      },
      {
        min: 5,
        max: 8,
        cloudly: false
      },
      {
        min: 20,
        max: 8,
        cloudly: true
      },
      {
        min: 5,
        max: 8,
        cloudly: true
      },
      {
        min: 5,
        max: 8,
        cloudly: true
      },
    ]
  },
]

const Content = () => {

  return (
    <main>
      <Tabs data={data} />
    </main>
  )
}

export default Content
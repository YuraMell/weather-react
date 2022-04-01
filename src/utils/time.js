export const getCurrentDay = (index) => {
  const today = new Date().getDay()
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  return days[today + index < 7 ? (today + index) : (today - 7 + index)]
}

export const getTime = (millisec) => {
  const dtFromMillisec = new Date(millisec * 1000);
  const hours = dtFromMillisec.getHours() < 10 ? '0' + dtFromMillisec.getHours() : dtFromMillisec.getHours()
  const minutes = dtFromMillisec.getMinutes() < 10 ? '0' + dtFromMillisec.getMinutes() : dtFromMillisec.getMinutes()
  return `${hours}:${minutes}`
}

export const setDay = (index) => {
  const today = new Date().getDay()
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
  return days[today + index < 7 ? (today + index) : (today - 7 + index)]
}

export const setHours = (index) => `${index * 3}:00`

export const current = `${new Date().getHours() < 10 ? '0' + new Date().getHours() : new Date().getHours()}:${new Date().getMinutes() < 10 ? '0' + new Date().getMinutes() : new Date().getMinutes()}`


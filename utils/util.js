const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[year, month, day].map(formatNumber).join('/')} ${[hour, minute, second].map(formatNumber).join(':')}`
}

const lookupTime = date => {
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  return `${[month, day].map(formatNumber).join('-')} ${[hour, minute].map(formatNumber).join(':')}`
}

const invalidTime = date => {
  const month = date.getMonth() + 1
  const day = date.getDate()
  return `${[month, day].map(formatNumber).join('-')} 24:00`
}

const formatDayTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return formatNumber(year)+"年"+formatNumber(month)+"月"+formatNumber(day)+"日"
}

const formatMinuteTime = date => {
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return `${[hour, minute, second].map(formatNumber).join(':')}`
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : `0${n}`
}

export default {
  formatTime,
  formatDayTime,
  formatMinuteTime,
  lookupTime,
  invalidTime
}

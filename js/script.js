window.onload = function() {
  refresh()
}

var time = undefined
var interval = 10
var lastSecond = undefined
var lastMinute = undefined

function refresh() {
  time = getTime()
  if (time.second !== lastSecond) {
    logTime()
    lastSecond = time.second
  }
  if (time.minute !== lastMinute) {
    if (lastMinute !== undefined) {
      dropClock()
    }
    lastMinute = time.minute
  }
  setInterval(function() {
    refresh()
  }, interval)
}

function dropClock() {
  let delay = 500
  let hour = splitTimeValue(time.hour)
  let minute = splitTimeValue(time.minute)
  let startSequence = generateRandomStartSequence([0, 1, 2, 3])
  console.log('startSequence', startSequence)
  switchElementWithDelay('pos0', hour[0], startSequence[0] * delay)
  switchElementWithDelay('pos1', hour[1], startSequence[1] * delay)
  switchElementWithDelay('pos2', minute[0], startSequence[2] * delay)
  switchElementWithDelay('pos3', minute[1], startSequence[3] * delay)
}

function generateRandomStartSequence(array) {
  let sequence = []
  array.forEach(element => {
    let randomElement = getRandomElementFromArray(array)
    sequence.push(randomElement)
    array = array.filter(e => e !== randomElement)
  })
  return sequence
}

function getRandomElementFromArray(items) {
  return items[Math.floor(Math.random() * items.length)]
}

function switchElementWithDelay(position, value, delay) {
  setInterval(function() {
    switchElement(position, value)
  }, delay)
}

function switchElement(position, value) {
  let placeholder = document.getElementById(position)
  let element = document.getElementById(value)
  removeAllChildrenFromPlaceHolder(placeholder)
  addChildToPlaceHolder(placeholder, element)
}

function addChildToPlaceHolder(placeholder, element) {
  let clone = element.cloneNode(true)
  placeholder.appendChild(clone)
}

function removeAllChildrenFromPlaceHolder(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild)
  }
}

function splitTimeValue(value) {
  return [value.substr(0, 1), value.substr(1, 1)]
}

function getTime() {
  let time = new Date()
  let hours = time.getHours()
  let minutes = time.getMinutes()
  let seconds = time.getSeconds()
  return {
    hour: getLeadingZeros(hours),
    minute: getLeadingZeros(minutes),
    second: getLeadingZeros(seconds)
  }
}

function getLeadingZeros(value) {
  return ('0' + value).slice(-2)
}

function replacePathPlaceHolder(value) {
  return assetPath.replace('$', value)
}

function logTime() {
  console.log(time.hour, time.minute, time.second)
}

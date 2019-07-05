window.onload = function() {
  refresh()
}

var time = undefined
var timer = 0
var reset = true
var cycle = 10 // ms
var delay = 1000
var lastSecond = undefined
var lastMinute = undefined
var color = 'black'

function refresh() {
  time = getTime()

  if (timer === 0 && reset === true) {
    reset = false
    dropClock()
    console.log('dropClock')
  }

  if (time.second !== lastSecond) {
    logTime()
    lastSecond = time.second
    timer++
    console.log('timer:', timer)
  }

  if (time.minute !== lastMinute) {
    if (lastMinute !== undefined) {
      reset = true
      console.log('reset')
    }
    lastMinute = time.minute
  }

  if (timer === 60) {
    timer = 0
  }

  setTimeout(function() {
    refresh()
  }, cycle)
}

function dropClock() {
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
  setTimeout(function() {
    switchElement(position, value)
  }, delay)
}

function switchElement(position, value) {
  let placeholder = document.getElementById(position)
  let element = document.getElementById(value)
  placeholder.style.opacity = 0
  setTimeout(function() {
    removeAllChildrenFromPlaceHolder(placeholder)
    addChildToPlaceHolder(placeholder, element)
    startVideoInPlaceHolder(placeholder)
    placeholder.style.opacity = 1
  }, 500)
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

function startVideoInPlaceHolder(placeholder) {
  placeholder.children[0].children[0].autoplay = true
}

function splitTimeValue(value) {
  return [value.substr(0, 1), value.substr(1, 1)]
}

function emptyAllPlaceHolders() {
  let container = document.getElementById('container')
  for (i = 0; i < container.children.length; i++) {
    let placeholder = document.getElementById('pos' + i)
    removeAllChildrenFromPlaceHolder(placeholder)
  }
}

function restart() {
  console.log('restart')
  emptyAllPlaceHolders()
  reset = true
  timer = 0
}

function invertColors() {
  let newColor = color === 'white' ? 'black' : 'white'
  console.log('switching from ' + color + ' to ' + newColor)
  let pool = document.getElementById('pool')
  for (i = 0; i < pool.children.length; i++) {
    let element = pool.children[i].children[0]
    element.innerHTML = element.innerHTML.replace(color, newColor)
    element.innerHTML = element.innerHTML.replace(color[0] + i, newColor[0] + i)
  }
  color = color === 'black' ? 'white' : 'black'
  document.body.style.backgroundColor = color === 'black' ? '#000000' : '#f3f2f4'
  restart()
}

function fadeOut(placeholder) {
  for (i = 0; i < 10; i++) {
    placeholder.style.opacity -= 0.1
  }
}

window.onkeypress = function(event) {
  // console.log(event.keyCode)
  if (event.keyCode == 105) {
    invertColors()
  } else if (event.keyCode == 114) {
    restart()
  }
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

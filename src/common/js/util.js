export function shuffle(arr) {
  let _arr = arr
  for (let index = 0; index < _arr.length; index++) {
    let j = getRandomInt(0, index)
    let t = _arr[index]
    _arr[index] = _arr[j]
    _arr[j] = t
  }
  return _arr
}

// 节流函数
export function debounce(func, delay) {
  let timer
  return function (...args) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}
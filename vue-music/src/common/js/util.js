/**
 * 获取某段区间随机值
 * @param {*} min 
 * @param {*} max 
 */
function getRandomInt(min, max) {
  return Math.floor((max - min + 1) * Math.random() + min)
}

/**
 * 数组乱序
 * @param {*} arr 
 */
export function shuffle(arr) {
  let _arr = arr.slice()
  for (let i = 0; i < _arr.length; i++) {
    let randomI = getRandomInt(0, i)
    let temp = _arr[i]
    _arr[i] = _arr[randomI]
    _arr[randomI] = temp
  }
  return _arr;
}

/**
 * 函数的节流操作
 * @param {*} func 函数
 * @param {*} delay 时间
 */
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

/**
 * 给dom添加 class
 * @param {*} el 节点
 * @param {*} className 类名
 */
export function addClass(el, className) {
  if (hasClass(el, className)) {
    return
  }
  let newClass = el.className.split(' ')
  newClass.push(className)
  el.className = newClass.join(' ')
}

/**
 * 检测dom是否有 class
 * @param {*} el 节点
 * @param {*} className 类名 
 */
export function hasClass(el, className) {
  let reg = new RegExp('^|\\s' + className + '(\\s|$)')
  return reg.test(el.className)
}

/**
 * 获取/设置节点的data属性值
 * @param {*} el 节点
 * @param {*} name 名称
 * @param {*} val 值
 */
export function getData(el, name, val) {
  let prefix = 'data-'
  name = prefix + name
  if (val) {
    return el.setAttribute(name, val)
  } else {
    return el.getAttribute(name)
  }
}

/**
 * 检测浏览器, 并在使用JS调用时自动添加所需前缀
 */
let elementStyle = document.createElement('div').style
let vendor = (() => {
  let transformNames = {
    webkit: 'webkitTransform',
    Moz: 'MozTransform',
    O: 'OTransform',
    ms: 'msTransform',
    standard: 'transform'
  }
  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key
    }
  }
  return false
})()

export function prefixStyle(style) {
  if (vendor === false) {
    return false
  }
  if (vendor === 'standard') {
    return style
  }
  return vendor + style.charAt(0).toUpperCase() + style.substring(1)
}

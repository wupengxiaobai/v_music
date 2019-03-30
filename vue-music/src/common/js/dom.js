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

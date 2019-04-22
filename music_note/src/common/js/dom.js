/**
 * 给dom添加 class
 * @param {*} el 节点
 * @param {*} className 类名
 */
export function addClass(el, className) {
    //  判断原先是否有此class，有->return
    if (hasClass(el, className)) {
        return
    }
    //  添加class
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
    }
    return el.getAttribute(name)
}
/**
 * 函数的节流操作
 * @param {*} func 函数
 * @param {*} delay 时间
 */
export function debounce(func, delay) {
    let timer;
    return function (...args) {
        if (timer) {
            clearTimeout(timer)
        }
        timer = setTimeout(() => {
            func.apply(this, args)
        }, delay)
    }
}
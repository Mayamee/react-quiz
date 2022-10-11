export default function debounce(cb, timeout) {
  let isCooldown = false
  return function () {
    if (isCooldown) return
    cb.apply(this, arguments)
    isCooldown = true
    setTimeout(() => (isCooldown = false), timeout)
  }
}

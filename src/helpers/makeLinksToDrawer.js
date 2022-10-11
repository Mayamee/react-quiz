export const makeLinkToDrawer = (to = null, label = null, icon) => ({
  to,
  label,
  icon,
})
export const removeLinksFromDrawer = (endpoints = '', links = []) => {
  return links.filter((link) => ![].concat(endpoints).includes(link.to))
}

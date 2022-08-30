export const makeLinkToDrawer = (to = null, label = null) => ({
  to,
  label,
});
export const removeLinksFromDrawer = (endpoints = "", links = []) => {
  return links.filter((link) => ![].concat(endpoints).includes(link.to));
};

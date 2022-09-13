export const hasIdFromParents = (node, id) => {
  while (node) {
    if (node.id === id) {
      return true;
    }
    node = node.parentNode;
  }
  return false;
};

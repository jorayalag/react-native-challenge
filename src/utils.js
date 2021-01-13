export function findNode(state, nodeUrl) {
  return state.list.findIndex(p => p.url === nodeUrl);
}

export function updateList(list, index, newElement) {
  return [...list.slice(0, index), newElement, ...list.slice(index + 1)];
}

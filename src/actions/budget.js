export const addItem = item => ({
  type: 'ADD_ITEM',
  item,
});

export const updateItem = (id, item) => ({
  type: 'UPDATE_ITEM',
  id,
  item,
});

export const deleteItem = id => ({
  type: 'DELETE_ITEM',
  id,
});

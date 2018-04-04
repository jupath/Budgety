import database from '../firebase/firebase';

// ADD_ITEM
export const addItem = item => ({
  type: 'ADD_ITEM',
  item,
});

export const startAddItem = itemData => (dispatch, getState) => {
  const userId = getState().auth.uid;
  const {
    itemType = '',
    description = '',
    amount = 0,
    date = 0,
    note = '',
  } = itemData;

  const item = {
    itemType, description, amount, date, note,
  };

  return database.ref(`users/${userId}/items`)
    .push(item)
    .then((ref) => {
      dispatch(addItem({
        id: ref.key,
        ...item,
      }));
    });
};

// UPDATE_ITEM
export const updateItem = (id, item) => ({
  type: 'UPDATE_ITEM',
  id,
  item,
});

export const startUpdateItem = (id, item) => (dispatch, getState) => {
  const userId = getState().auth.uid;
  return database.ref(`users/${userId}/items/${id}`)
    .update(item)
    .then(() => dispatch(updateItem(id, item)));
};

// DELETE_ITEM
export const deleteItem = id => ({
  type: 'DELETE_ITEM',
  id,
});

export const startDeleteItem = id => (dispatch, getState) => {
  const userId = getState().auth.uid;
  return database.ref(`users/${userId}/items/${id}`)
    .remove()
    .then(() => dispatch(deleteItem(id)));
};

// SET_ITEMS
export const setItems = items => ({
  type: 'SET_ITEMS',
  items,
});

export const startSetItems = () => (dispatch, getState) => {
  const userId = getState().auth.uid;

  return database.ref(`users/${userId}/items`)
    .once('value')
    .then((snapshot) => {
      const items = [];
      snapshot.forEach((childSnapshot) => {
        items.push({
          id: childSnapshot.key,
          ...childSnapshot.val(),
        });
      });
      dispatch(setItems(items));
    });
};

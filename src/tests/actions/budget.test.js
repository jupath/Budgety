import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
  addItem,
  startAddItem,
  updateItem,
  startUpdateItem,
  deleteItem,
  startDeleteItem,
  setItems,
  startSetItems
} from '../../actions/budget';
import items from '../fixtures/items';
import database from '../../firebase/firebase';

const createMockStore = configureMockStore([thunk]);
const uid = 'myuid123';
const defaultAuthState = { auth: { uid } };

beforeEach((done) => {
  const itemsData = {};
  items.forEach(({ id, description, note, amount, date, itemType }) => {
    itemsData[id] = { description, note, amount, date, itemType };
  });
  database.ref(`users/${uid}/items`).set(itemsData).then(() => done());
});

// Add new item
describe('add new item', () => {
  test('should create addItem object', () => {
    const action= addItem(items[0]);
    expect(action).toEqual({
      type: 'ADD_ITEM',
      item: items[0],
    })
  });

  test('should add item to database and store', (done) => {
    const store = createMockStore(defaultAuthState);
    const itemData = {
      itemType: 'expense',
      description: 'Buy a new laptop',
      amount: 500,
      date: 1000,
      note: 'This one is better',
    };

    store.dispatch(startAddItem(itemData)).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'ADD_ITEM',
        item: {
          id: expect.any(String),
          ...itemData,
        }
      })
      return database.ref(`users/${uid}/items/${actions[0].item.id}`).once('value');
    }).then((snapshot) => {
      expect(snapshot.val()).toEqual(itemData);
      done();
    });
  });
});

// Update item
describe('update item', () => {
  test('should create update item object', () => {
    const id = items[0].id;
    const item = {
      ...items[0],
      description: 'Updated description',
    };
    const action = updateItem(id, item);
    expect(action).toEqual({
      type: 'UPDATE_ITEM',
      id,
      item,
    });
  });

  test('should update item in database and store', (done) => {
    const store = createMockStore(defaultAuthState);
    const id = items[0].id;
    const item = {
      ...items[0],
      description: 'Updated description',
    };
    store.dispatch(startUpdateItem(id, item)).then((done) => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'UPDATE_ITEM',
        id,
        item,
      });
      return database.ref(`users/${uid}/items/${id}`).once('value');
    }).then((snapshot) => {
      expect(snapshot.val()).toEqual(item);
      done();
    });
  });
});

// Delete item
describe('delete item', () => {
  test('should create delete item object', () => {
    const id = items[1].id;
    const action = deleteItem(id);
    expect(action).toEqual({
      type: 'DELETE_ITEM',
      id,
    });
  });

  test('should delete item from database and store', (done) => {
    const store = createMockStore(defaultAuthState);
    const id = items[1].id;
    store.dispatch(startDeleteItem(id)).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'DELETE_ITEM',
        id,
      });
      return database.ref(`users/${uid}/items/${id}`).once('value');
    }).then((snapshot) => {
      expect(snapshot.val()).toBeFalsy();
      done();
    });
  });
});

// Start fetching items
describe('set items', () => {
  test('should create setItems object', () => {
    const action = setItems(items);
    expect(action).toEqual({
      type: 'SET_ITEMS',
      items,
    });
  });

  test('should fetch the items from database', (done) => {
    const store = createMockStore(defaultAuthState);
    store.dispatch(startSetItems()).then(() => {
      const actions = store.getActions();
      expect(actions[0]).toEqual({
        type: 'SET_ITEMS',
        items,
      });
      done();
    });
  });
});

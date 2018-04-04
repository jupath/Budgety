import itemsReducer from '../../reducers/items';
import items from '../fixtures/items';

test('should set initial state', () => {
  const state = itemsReducer(undefined, { type: '@@INIT' });
  expect(state).toEqual([]);
});

test('should set items state', () => {
  const action = {
    type: 'SET_ITEMS',
    items,
  };
  const state = itemsReducer(undefined, action);
  expect(state).toEqual(items);
});

test('should set add item state', () => {
  const item = {
    id: 'qwe741',
    amount: 1000,
    date: 0,
    description: 'Test description',
    itemType: 'expense',
    note: ''
  };
  const action = {
    type: 'ADD_ITEM',
    item,
  };
  const state = itemsReducer(items, action);
  expect(state).toEqual([
    ...items,
    item,
  ]);
});

test('should set update item', () => {
  const action = {
    type: 'UPDATE_ITEM',
    id: items[1].id,
    item: {
      ...items[1],
      description: 'Updated description',
    }
  };
  const state = itemsReducer(items, action);
  expect(state[1].description).toBe('Updated description');
});

test('should set delete item', () => {
  const action = {
    type: 'DELETE_ITEM',
    id: items[0].id,
  };
  const state = itemsReducer(items, action);
  expect(state).toEqual([ items[1], items[2] ]);
});

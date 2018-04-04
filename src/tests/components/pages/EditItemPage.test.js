import React from 'react';
import { shallow } from 'enzyme';
import { EditItemPage } from '../../../components/pages/EditItemPage';
import items from '../../fixtures/items';

let updateItem, deleteItem, item, history, wrapper;

beforeEach(() => {
  updateItem = jest.fn();
  deleteItem = jest.fn();
  item = items[2];
  history = { push: jest.fn() };
  wrapper = shallow(
    <EditItemPage
    updateItem={updateItem}
    deleteItem={deleteItem}
    item={item}
    history={history}
  />);
});

test('should render EditItemPage correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should open up modal to delete item', () => {
  wrapper.find('#toggle-modal').simulate('click');
  expect(wrapper.state('modal')).toBe(true);
});

test('should handle delete item correctly', () => {
  wrapper.find('#delete').simulate('click');
  expect(deleteItem).toHaveBeenLastCalledWith(item.id);
  expect(history.push).toHaveBeenLastCalledWith('/');
});

test('should handle update item correctly', () => {
  const updatedItem = {
    ...items[2],
    description: 'Updated description',
  };
  wrapper.find('AddItemForm').prop('handleAddItem')(updatedItem);
  expect(updateItem).toHaveBeenLastCalledWith(items[2].id, updatedItem);
  expect(history.push).toHaveBeenLastCalledWith('/');
});

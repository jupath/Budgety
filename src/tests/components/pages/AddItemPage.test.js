import React from 'react';
import { shallow } from 'enzyme';
import { AddItemPage } from '../../../components/pages/AddItemPage';
import items from '../../fixtures/items';

let addItem, history, itemType, wrapper;

beforeEach(() => {
  addItem = jest.fn();
  history = { push: jest.fn() };
  itemType = 'income';
  wrapper = shallow(<AddItemPage addItem={addItem} itemType={itemType} history={history} />);
});

test('should render AddItemPage correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handle handleAddItem correctly', () => {
  wrapper.find('AddItemForm').prop('handleAddItem')(items[1]);
  expect(addItem).toHaveBeenLastCalledWith(items[1]);
  expect(history.push).toHaveBeenLastCalledWith('/');
});

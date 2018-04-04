import React from 'react';
import { shallow } from 'enzyme';
import moment from 'moment';
import AddItemForm from '../../../components/forms/AddItemForm';
import items from '../../fixtures/items';

let onSubmitSpy;

beforeEach(() => {
  onSubmitSpy = jest.fn();
});

test('should render AddItemForm with item data correctly', () => {
  const wrapper = shallow(<AddItemForm item={items[0]} handleAddItem={onSubmitSpy} />);
  expect(wrapper).toMatchSnapshot();
});

test('should set description in input change correctly', () => {
  const value = 'Test description';
  const wrapper = shallow(<AddItemForm handleAddItem={onSubmitSpy} />);
  wrapper.find('#description').simulate('change', {
    target: { value }
  });
  expect(wrapper.state('description')).toBe(value);
});

test('should set amount in input change correctly', () => {
  const value = '1000';
  const wrapper = shallow(<AddItemForm handleAddItem={onSubmitSpy} />);
  wrapper.find('#amount').simulate('change', {
    target: { value }
  });
  expect(wrapper.state('amount')).toBe(value);
});

test('should set DatePicker in input change correctly', () => {
  const wrapper = shallow(<AddItemForm handleAddItem={onSubmitSpy} />);
  wrapper.find('#date').prop('onDateChange')(moment(0));
  expect(wrapper.state('date')).toEqual(moment(0));
});

test('should set textarea in input change correctly', () => {
  const value = 'Test note';
  const wrapper = shallow(<AddItemForm handleAddItem={onSubmitSpy} />);
  wrapper.find('#note').simulate('change', {
    target: { value }
  });
  expect(wrapper.state('note')).toBe(value);
});

test('should handle submit form correctly', () => {
  const wrapper = shallow(<AddItemForm item={items[0]} handleAddItem={onSubmitSpy} />);
  wrapper.find('Form').simulate('submit', {
    preventDefault: () => {}
  });
  expect(wrapper.state('error')).toBe(false);
  expect(onSubmitSpy).toHaveBeenLastCalledWith({
    itemType: items[0].itemType,
    description: items[0].description,
    amount: parseFloat(items[0].amount),
    date: items[0].date.valueOf(),
    note: items[0].note,
  });
});

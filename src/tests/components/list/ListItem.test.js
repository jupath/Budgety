import React from 'react';
import { shallow } from 'enzyme';
import items from '../../fixtures/items';
import ListItem from '../../../components/list/ListItem';

test('should render ListItem correctly', () => {
  const wrapper = shallow(<ListItem listItem={items[0]} />);
  expect(wrapper).toMatchSnapshot();
});
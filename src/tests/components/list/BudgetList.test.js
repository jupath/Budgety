import React from 'react';
import { shallow } from 'enzyme';
import { BudgetList } from '../../../components/list/BudgetList';
import items from '../../fixtures/items';

test('should render BudgetList correctly', () => {
  const wrapper = shallow(<BudgetList items={items} />);
  expect(wrapper).toMatchSnapshot();
});

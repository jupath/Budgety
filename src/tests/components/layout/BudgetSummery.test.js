import React from 'react';
import { shallow } from 'enzyme';
import { BudgetSummary } from '../../../components/layout/BudgetSummary';

test('should render correctly without items', () => {
  const wrapper = shallow(<BudgetSummary />);
  expect(wrapper).toMatchSnapshot();
});

test('should render correctly with items', () => {
  const wrapper = shallow(<BudgetSummary totalIncomes={200} totalExpenses={300} />);
  expect(wrapper).toMatchSnapshot();
});

import React from 'react';
import { shallow } from 'enzyme';
import { DashboardPage } from '../../../components/pages/DashboardPage';
import items from '../../fixtures/items';

test('should render DashboardPage correctly if there are no items', () => {
  const wrapper = shallow(<DashboardPage />);
  expect(wrapper).toMatchSnapshot();
});

test('should render DashboardPage correctly if there are items', () => {
  const incomes = [items[1]];
  const expenses = [items[0], items[2]];
  const wrapper = shallow(<DashboardPage incomes={incomes} expenses={expenses} />);
  expect(wrapper).toMatchSnapshot();
});

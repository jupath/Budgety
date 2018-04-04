import React from 'react';
import { shallow } from 'enzyme';
import { ListHeader } from '../../../components/list/ListHeader';

test('should render BudgetList correctly', () => {
  const wrapper = shallow(<ListHeader itemsType='expense' listName='Expenses' />);
  expect(wrapper).toMatchSnapshot();
});

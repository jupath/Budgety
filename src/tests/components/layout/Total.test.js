import React from 'react';
import { shallow } from 'enzyme';
import { Total } from '../../../components/layout/Total';

test('should render Total correctly with default props', () => {
  const wrapper = shallow(<Total />);
  expect(wrapper).toMatchSnapshot();
});

test('should render Total correctly with props', () => {
  const wrapper = shallow(<Total numOfIncomes={2} numOfExpenses={3} total={100} />);
  expect(wrapper).toMatchSnapshot();
});

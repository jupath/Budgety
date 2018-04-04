import React from 'react';
import { shallow } from 'enzyme';
import { Header } from '../../../components/layout/Header';

test('should render correctly without logged in user', () => {
  const wrapper = shallow(<Header />);
  expect(wrapper).toMatchSnapshot();
});

test('should render correctly with logged in user', () => {
  const userName = 'Test Man';
  const userLogout = jest.fn();
  const wrapper = shallow(<Header userName={userName} userLogout={userLogout} />);
  expect(wrapper).toMatchSnapshot();
});

test('should handle click on Log out button correctly', () => {
  const userName = 'Test Man';
  const userLogout = jest.fn();
  const wrapper = shallow(<Header userName={userName} userLogout={userLogout} />);
  wrapper.find('Button').simulate('click');
  expect(userLogout).toHaveBeenCalled();
});

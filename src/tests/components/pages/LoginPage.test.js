import React from 'react';
import { shallow } from 'enzyme';
import { LoginPage } from '../../../components/pages/LoginPage';

let loginUser, wrapper;

beforeEach(() => {
  loginUser = jest.fn();
  wrapper = shallow(<LoginPage loginUser={loginUser} />);
});

test('should render LoginPage correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should handle login user onclick', () => {
  wrapper.find('Button').simulate('click');
  expect(loginUser).toHaveBeenCalled();
});

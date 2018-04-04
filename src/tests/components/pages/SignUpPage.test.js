import React from 'react';
import { shallow } from 'enzyme';
import { SignUpPage } from '../../../components/pages/SignUpPage';

let onSubitSpy, wrapper;

beforeEach(() => {
  onSubitSpy = jest.fn();
  wrapper = shallow(<SignUpPage createUser={onSubitSpy} />);
});

test('should render SingUpPage correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should render SingUpPage correctly if there is an auth error', () => {
  const authError = 'Auth error';
  wrapper.setProps({ authError });
  expect(wrapper).toMatchSnapshot();
});

test('should set email in input change', () => {
  const value = 'test@example.com';
  wrapper.find('#email').simulate('change', {
    target: { value }
  });
  expect(wrapper.state('email')).toBe(value);
});

test('should set password in input change', () => {
  const value = 'abc123';
  wrapper.find('#password1').simulate('change', {
    target: { value }
  });
  wrapper.find('#password2').simulate('change', {
    target: { value }
  });
  expect(wrapper.state('password1')).toBe(value);
  expect(wrapper.state('password2')).toBe(value);
});

test('should handle create user submit', () => {
  const email = 'test@example';
  const password1 = 'abc123';
  const password2 = 'abc123';
  wrapper.setState({ email, password1, password2 });
  wrapper.find('Form').simulate('submit', {
    preventDefault: () => {}
  });
  expect(wrapper.state('error')).toBe('');
  expect(onSubitSpy).toHaveBeenLastCalledWith(email, password1);
});

test('should handle create user submit if the 2 passwords are different', () => {
  const email = 'test@example';
  const password1 = 'abc123';
  const password2 = '123abc';
  wrapper.setState({ email, password1, password2 });
  wrapper.find('Form').simulate('submit', {
    preventDefault: () => {}
  });
  expect(wrapper.state('error')).toBe('The passwords are different!');
  expect(onSubitSpy).not.toHaveBeenCalled();
});

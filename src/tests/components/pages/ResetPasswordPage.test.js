import React from 'react';
import { shallow } from 'enzyme';
import { ResetPasswordPage } from '../../../components/pages/ResetPasswordPage';

let onSubmitSpy, wrapper;

beforeEach(() => {
  onSubmitSpy = jest.fn();
  wrapper = shallow(<ResetPasswordPage resetPassword={onSubmitSpy} />);
});

test('should render ResetPasswordPage correctly', () => {
  expect(wrapper).toMatchSnapshot();
});

test('should render ResetPasswordPage correctly if there is an error', () => {
  const authError = 'Error message!'
  wrapper.setState({ authError });
  expect(wrapper).toMatchSnapshot();
});

test('should render ResetPasswordPage correctly with success message', () => {
  const authMessage = 'Success messege!'
  wrapper.setState({ authMessage });
  expect(wrapper).toMatchSnapshot();
});

test('should handle reset pass on click correctly', () => {
  const value = 'test@example.com';
  wrapper.find('Form').simulate('submit', {
    preventDefault: () => {},
    target: {
      elements: {
        email: {
          value
        }
      }
    }
  });
  expect(onSubmitSpy).toHaveBeenLastCalledWith(value);
});

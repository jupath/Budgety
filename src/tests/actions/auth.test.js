import {
  userLogin,
  createUserAuthFail,
  createUserAuthMessage,
  userLogout } from '../../actions/auth';

test('should create userLogin object', () => {
  const uid = 'abc123';
  const name = 'Test Man';
  const action = userLogin(uid, name);
  expect(action).toEqual({
    type: 'USER_LOGIN',
    userdata: {
      uid,
      name,
    }
  })
});

test('should create createUserAuthFail object', () => {
  const error = 'This is an error message';
  const action = createUserAuthFail(error);
  expect(action).toEqual({
    type: 'USER_AUTH_FAIL',
    error,
  })
});

test('should create createUserAuthMessage object', () => {
  const authMessage = 'This is a message';
  const action = createUserAuthMessage(authMessage);
  expect(action).toEqual({
    type: 'USER_AUTH_MESSAGE',
    authMessage,
  })
});

test('should create userLogout object', () => {
  const action = userLogout();
  expect(action).toEqual({
    type: 'LOGOUT',
  })
});

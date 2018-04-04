import authReducer from '../../reducers/auth';

test('should set login state', () => {
  const action = {
    type: 'USER_LOGIN',
    userdata: {
      uid: 'qwe741',
    }
  };
  const state = authReducer({}, action);
  expect(state).toEqual({
    uid: action.userdata.uid,
    error: undefined,
    authMessage: undefined,
  })
});

test('should set auth fail state', () => {
  const action = {
    type: 'USER_AUTH_FAIL',
    error: 'Login error',
  };
  const state = authReducer({}, action);
  expect(state).toEqual({
    error: action.error,
    authMessage: undefined,
  });
});

test('should set auth message state', () => {
  const action = {
    type: 'USER_AUTH_MESSAGE',
    authMessage: 'Auth message',
  };
  const state = authReducer({}, action);
  expect(state).toEqual({
    authMessage: action.authMessage,
    error: undefined,
  })
});

test('should set logout stata', () => {
  const action = {
    type: 'LOGOUT',
  };
  const state = authReducer({uid: 'qwe741'}, action);
  expect(state).toEqual({});
});

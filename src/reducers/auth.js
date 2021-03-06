export default (state = {}, action) => {
  switch (action.type) {
    case 'USER_LOGIN':
      return {
        ...state,
        ...action.userdata,
        error: undefined,
        authMessage: undefined,
      };
    case 'USER_AUTH_FAIL':
      return {
        ...state,
        error: action.error,
        authMessage: undefined,
      };
    case 'USER_AUTH_MESSAGE':
      return {
        ...state,
        authMessage: action.authMessage,
        error: undefined,
      };
    case 'LOGOUT':
      return {};
    default:
      return state;
  }
};

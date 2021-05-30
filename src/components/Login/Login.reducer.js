import { LOGIN_INIT, LOGOUT_INIT, LOGIN_SUCCESS, LOGIN_FAILURE } from './Login.constants';

const DEFAULT_STATE = {
  loading: false,
  errors: null,
  data: {},
};

const transformAndStoreLogingData = data => {
  return { ...data };
};

const transformErrors = data => {
  return data.error.errorMessage;
};

const LoginReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case LOGIN_INIT:
      return { ...state, loading: true };
    case LOGIN_SUCCESS: {
      const userData = transformAndStoreLogingData(action.payload);
      return { ...state, loading: false, data: userData };
    }
    case LOGIN_FAILURE: {
      const err = transformErrors(action.payload);
      return { ...state, loading: false, errors: err};
    }
    case LOGOUT_INIT: {
      return { ...state, loading: false, data: {}, errors: null};
    }
    default:
      return state;
  }
};

export default LoginReducer;

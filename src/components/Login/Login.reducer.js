import { LOGIN_INIT, LOGOUT_INIT, LOGIN_SUCCESS, LOGIN_FAILURE } from './Login.constants';

const DEFAULT_STATE = {
  loading: false,
  errors: [],
  data: {},
};

const transformAndStoreLogingData = data => {
  return { ...data };
};

const transformErrors = data => {
  return [...data];
};

const LoginReducer = (state = DEFAULT_STATE, action) => {
  switch (action.type) {
    case LOGIN_INIT:
      return { ...state, loading: true };
    case LOGIN_SUCCESS: {
      const userData = transformAndStoreLogingData(action.payload);
      return { ...state, loading: false, errors: [], data: userData };
    }
    case LOGIN_FAILURE: {
      const errors = transformErrors(action.payload);
      return { ...state, loading: false, data: {}, errors};
    }
    case LOGOUT_INIT: {
      return { ...state, loading: false, data: {}, errors: []};
    }
    default:
      return state;
  }
};

export default LoginReducer;

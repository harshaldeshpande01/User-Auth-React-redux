import { LOGIN_INIT, LOGOUT_INIT, LOGIN_SUCCESS, LOGIN_FAILURE } from './Login.actionConstants';
import Login from './Login.class';

const DEFAULT_STATE = new Login().getReduxState();

const transformAndStoreLoginData = data => {
  return { ...data };
};

const transformErrors = data => {
  return data.error;
};

const LoginReducer = (state = DEFAULT_STATE, {type, payload}) => {
  switch (type) {
    case LOGIN_INIT: {
      const details = { loading: true }
      const applicationInstance = new Login(state, details)
      const updatedState = applicationInstance.getReduxState()
      return updatedState
    }
    case LOGIN_SUCCESS: {
      const userData = transformAndStoreLoginData(payload);
      const details = { loading: false, data: userData, error: DEFAULT_STATE.error }
      const applicationInstance = new Login(state, details)
      const updatedState = applicationInstance.getReduxState()
      return updatedState
    }
    case LOGIN_FAILURE: {
      const err = transformErrors(payload);
      const details = { loading: false, data: DEFAULT_STATE.data, error: err }
      const applicationInstance = new Login(state, details)
      const updatedState = applicationInstance.getReduxState()
      return updatedState
    }
    case LOGOUT_INIT: {
      const details = { loading: false, data: DEFAULT_STATE.data, error: DEFAULT_STATE.error }
      const applicationInstance = new Login(state, details)
      const updatedState = applicationInstance.getReduxState()
      return updatedState
    }
    default:
      return state;
  }
};

export default LoginReducer;

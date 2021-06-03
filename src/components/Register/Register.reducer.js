import { REGISTER_INIT, REGISTER_SUCCESS, REGISTER_FAILURE } from './Register.actionConstants';
import Register from './Register.class';

const DEFAULT_STATE = new Register().getReduxState()

const transformAndStoreRegisterData = data => {
  return { ...data };
};

const transformErrors = data => {
  return data.error.message;
};

const RegisterReducer = (state = DEFAULT_STATE, {type, payload}) => {
  switch (type) {
    case REGISTER_INIT: {
      const details = { loading: true }
      const applicationInstance = new Register(state, details)
      const updatedState = applicationInstance.getReduxState()
      return updatedState
    }
    case REGISTER_SUCCESS: {
      const userData = transformAndStoreRegisterData(payload);
      const details = { loading: false, data: userData, error: DEFAULT_STATE.error }
      const applicationInstance = new Register(state, details)
      const updatedState = applicationInstance.getReduxState()
      return updatedState
    }
    case REGISTER_FAILURE: {
      const err = transformErrors(payload);
      const details = { loading: false, data: DEFAULT_STATE.data, error: err }
      const applicationInstance = new Register(state, details)
      const updatedState = applicationInstance.getReduxState()
      return updatedState
    }
    default:
      return state;
  }
};

export default RegisterReducer;

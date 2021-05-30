import { LOGIN_INIT, LOGOUT_INIT, LOGIN_SUCCESS, LOGIN_FAILURE} from './Login.constants';

const initLoginCreator = () => ({
  type: LOGIN_INIT,
});

const initLogoutCreator = () => ({
  type: LOGOUT_INIT,
});

const loginSuccessCreator = (data) => ({
  type: LOGIN_SUCCESS,
  payload: {
    email: data.email,
  }
});

const loginFailureCreator = () => ({
  type: LOGIN_FAILURE,
});

const performLogin = () => {
  return async (disptach, getState, { apiInstance }) => {
    disptach(initLoginCreator());
    // await setTimeout(() => {  }, 2000);
  };
};

const loginSuccess = ({ email, password }) => {
  return async (disptach, getState, { apiInstance }) => {
    disptach(loginSuccessCreator({email, password}));
  };
};

const loginFailure = () => {
  return async (disptach, getState, { apiInstance }) => {
    disptach(loginFailureCreator());
  };
};

const performLogout = () => {
  return async (disptach, getState, { apiInstance }) => {
    disptach(initLogoutCreator());
  };
};

const dummy = () => {};

export { performLogin, loginSuccess, loginFailure, performLogout, dummy };

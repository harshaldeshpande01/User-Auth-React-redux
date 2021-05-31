import { LOGIN_INIT, LOGOUT_INIT, LOGIN_SUCCESS, LOGIN_FAILURE} from './auth.constants';

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

const loginFailureCreator = (errorMessage) => ({
  type: LOGIN_FAILURE,
  payload: {
    error: errorMessage,
  }
});

const performLogin = () => {
  return async (disptach) => {
    disptach(initLoginCreator());
    // await setTimeout(() => {  }, 2000);
  };
};

const loginSuccess = ( email ) => {
  return async (disptach) => {
    disptach(loginSuccessCreator(email));
  };
};

const loginFailure = (errorMessage) => {
  return async (disptach) => {
    disptach(loginFailureCreator(errorMessage));
  };
};

const performLogout = () => {
  return async (disptach) => {
    disptach(initLogoutCreator());
  };
};

const dummy = () => {};

export { performLogin, loginSuccess, loginFailure, performLogout, dummy };

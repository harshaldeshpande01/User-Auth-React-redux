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
    password: data.passsword,
  }
});

const loginFailureCreator = () => ({
  type: LOGIN_FAILURE,
  error: 'Something went wrong',
});

const performLogin = ({ email, password }) => {
  return async (disptach, getState, { apiInstance }) => {
    disptach(initLoginCreator());

    // Make API call to authenticate and call success or failure action respectively
    setTimeout(() => { disptach(loginSuccessCreator({email, password})); }, 2000);
    // disptach(loginFailureCreator());
  };
};

const performLogout = () => {
  return async (disptach, getState, { apiInstance }) => {
    disptach(initLogoutCreator());
  };
};

const dummy = () => {};

export { performLogin, performLogout, dummy };

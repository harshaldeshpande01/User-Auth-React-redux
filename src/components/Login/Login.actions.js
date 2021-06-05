import { LOGIN_INIT, LOGOUT_INIT, LOGIN_SUCCESS, LOGIN_FAILURE} from './Login.actionConstants';
import apiRoutes from '../../configurations/network/apiRoutes';

const initLoginCreator = () => ({
  type: LOGIN_INIT,
});

const initLogoutCreator = () => ({
  type: LOGOUT_INIT,
});

const loginSuccessCreator = (email) => ({
  type: LOGIN_SUCCESS,
  payload: {
    email,
  }
});

const loginFailureCreator = (error) => ({
  type: LOGIN_FAILURE,
  payload: {
    error
  }
});

const performLogin = ({email, password}) => {
  return async (disptach, getState, {apiInstance}) => {
    disptach(initLoginCreator());
    
    const options = {
      url: `${apiRoutes.authentication.login}?email=${email}`,
      method: 'GET',
    }

    try {
      const response = await apiInstance.fetch(options);
      if(response.data[0]) {
        const user = response.data[0];
        if(user.password === password) {
          disptach(loginSuccessCreator(email));
        }
        else {
          disptach(loginFailureCreator('Incorrect password entered'));
        }
      }
      else {
        disptach(loginFailureCreator('No account linked with this email address. Please register first'));
      }
    }
    catch(error) {
      disptach(loginFailureCreator(error.message));
    }

  };
};

const performLogout = () => {
  return async (disptach) => {
    disptach(initLogoutCreator());
  };
};

const dummy = () => {};

export { performLogin, performLogout, dummy };

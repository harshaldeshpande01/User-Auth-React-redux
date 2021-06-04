import { LOGIN_INIT, LOGOUT_INIT, LOGIN_SUCCESS, LOGIN_FAILURE} from './auth.constants';
import apiRoutes from '../configurations/network/apiRoutes';

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
      if(response) {
        const user = response.data[0];
        if(user.password === password) {
          disptach(loginSuccessCreator(email));
        }
        else {
          disptach(loginFailureCreator('Incorrect password'));
        }
      }
      
    }
    catch(error) {
      disptach(loginFailureCreator('No account found with this email. Please register first'));
    }

  };
};

// const loginSuccess = ( email ) => {
//   return async (disptach) => {
//     disptach(loginSuccessCreator(email));
//   };
// };

// const loginFailure = (errorMessage) => {
//   return async (disptach) => {
//     disptach(loginFailureCreator(errorMessage));
//   };
// };

const performLogout = () => {
  return async (disptach) => {
    disptach(initLogoutCreator());
  };
};

const dummy = () => {};

export { performLogin, performLogout, dummy };

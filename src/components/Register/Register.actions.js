import { REGISTER_INIT, REGISTER_SUCCESS, REGISTER_FAILURE} from './Register.actionConstants';
import apiRoutes from '../../configurations/network/apiRoutes';

const initRegisterCreator = () => ({
  type: REGISTER_INIT,
});

const registerSuccessCreator = (email) => ({
  type: REGISTER_SUCCESS,
  payload: {
    email
  }
});

const registerFailureCreator = (message) => ({
  type: REGISTER_FAILURE,
  payload: {
    error: {
      message
    }
  }
});


const performRegister = (data) => {
  return async (disptach, getState, {apiInstance}) => {
    disptach(initRegisterCreator());

    const options = {
      url: apiRoutes.authentication.register,
      method: 'POST',
      data
    }

    try {
      const response = await apiInstance.fetch(options);
      disptach(registerSuccessCreator(response.data.email));
    }
    catch(error) {
      disptach(registerFailureCreator(error.message));
    }

  };
};

const dummy = () => {};

export { performRegister, dummy };

import Api from 'utils/Api';
import { REGISTER_INIT, REGISTER_SUCCESS, REGISTER_FAILURE} from './Register.actionConstants';

const apiInstance = new Api();

const initRegisterCreator = () => ({
  type: REGISTER_INIT,
});

const registerSuccessCreator = (email) => ({
  type: REGISTER_SUCCESS,
  payload: {
    email
  }
});

const registerFailureCreator = () => ({
  type: REGISTER_FAILURE,
  payload: {
    error: {
      message: 'Something went wrong!'
    }
  }
});


const performRegister = (data) => {
  return async (disptach) => {
    disptach(initRegisterCreator());

    const options = {
      url: 'http://localhost:3000/Users',
      method: 'POST',
      data
    }

    try {
      await apiInstance.fetch(options);
      disptach(registerSuccessCreator(data.email));
    }
    catch(err) {
      console.log(err);
      disptach(registerFailureCreator());
    }

  };
};

const dummy = () => {};

export { performRegister, dummy };

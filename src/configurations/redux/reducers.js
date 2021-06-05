import { combineReducers } from 'redux';
import LoginReducer from '../../components/Login/Login.reducer';
import RegisterReducer from '../../components/Register/Register.reducer';

const allReducer = {
  login: LoginReducer,
  register: RegisterReducer,
};

const combinedReducer = combineReducers(allReducer);

export default combinedReducer;

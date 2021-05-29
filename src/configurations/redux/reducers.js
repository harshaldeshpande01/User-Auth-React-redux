import { combineReducers } from 'redux';
import LoginReducer from 'components/Login/Login.reducer';

const allReducer = {
  login: LoginReducer,
};

const combinedReducer = combineReducers(allReducer);

export default combinedReducer;

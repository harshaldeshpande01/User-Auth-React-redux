import { combineReducers } from 'redux';
import AuthReducer from '../../reducers/auth.reducer';
import RegisterReducer from '../../components/Register/Register.reducer';

const allReducer = {
  auth: AuthReducer,
  register: RegisterReducer,
};

const combinedReducer = combineReducers(allReducer);

export default combinedReducer;

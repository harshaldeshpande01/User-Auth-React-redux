import { combineReducers } from 'redux';
import AuthReducer from '../../reducers/auth.reducer';

const allReducer = {
  auth: AuthReducer,
};

const combinedReducer = combineReducers(allReducer);

export default combinedReducer;

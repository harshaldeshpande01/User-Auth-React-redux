import {store} from '../configurations/redux/store';

const isAuthenticated = () => {
    const state = store.getState();
    console.log(state);
    const {data} = state.login;
    if(data.email) {
        return true;
    }
    console.log('here');
    return false;
};

export default isAuthenticated;

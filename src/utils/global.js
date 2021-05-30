import {store} from '../configurations/redux/store';

const isAuthenticated = () => {
    const state = store.getState();
    const {data} = state.login;
    if(data.email) {
        return true;
    }
    return false;
};

export default isAuthenticated;

import {store} from '../configurations/redux/store';

const isAuthenticated = () => {
    const state = store.getState();
    // if((state === undefined) || (state === null)) {
    //     return false;
    // }
    const {data} = state.auth;
    if(data !== undefined) {
        if(data.email) {
            return true;
        }
    }
    return false;
};

export default isAuthenticated;

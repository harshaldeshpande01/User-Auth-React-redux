import {store} from '../configurations/redux/store';

const isAuthenticated = () => false;


// const isAuthenticated = () => {
//     const data = store.getState();
//     console.log(data);
//     if(data.email) {
//         return true;
//     }
//     return false;
// };

export default isAuthenticated;

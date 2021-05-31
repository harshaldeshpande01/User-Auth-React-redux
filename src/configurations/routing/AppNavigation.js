import React, { Suspense } from 'react';
import DashboardContainer from '../../components/Dashboard/Dashboard.Container';

const LoginContainer = React.lazy(() =>
  import(
    'components/Login/Login.Container' /* webpackChunkName: "Login.Container" */
  ),
);

const Register = React.lazy(() =>
  import(
    'components/Register/Register' /* webpackChunkName: "Login.Container" */
  ),
);

const ForgotPass = React.lazy(() =>
  import(
    'components/ForgotPass/ForgotPass' /* webpackChunkName: "Login.Container" */
  ),
);

const appRoutes = {
  root: {
    defaultRoute: {
      path: '/',
      component: DashboardContainer,
      needAuth: true,
      exact: true,
    },
  },
  authentication: {
    login: {
      path: '/login',
      component: LoginContainer,
      needAuth: false,
      exact: false,
    },
    register: {
      path: '/register',
      component: Register,
      needAuth: false,
      exact: false,
    },
    forgotPass: {
      path: '/forgot-pass',
      component: ForgotPass,
      needAuth: false,
      exact: false,
    },
  },
};

const defaultAuthenticatedRoute = '/';
const defaultUnauthenticatedRoute = '/login';

const getAllRoutesArray = () =>
  Object.keys(appRoutes)
    .map(key =>
      Object.keys(appRoutes[key]).reduce((allRoutes, innerKey) => {
        allRoutes.push(appRoutes[key][innerKey]);
        return allRoutes;
      }, []),
    )
    .flat();
export {
  appRoutes,
  defaultAuthenticatedRoute,
  defaultUnauthenticatedRoute,
  getAllRoutesArray,
};

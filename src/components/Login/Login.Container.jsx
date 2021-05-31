import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import LoginWrapper from './Login.wrapper';
import { performLogin, loginSuccess, loginFailure, performLogout } from '../../actions/auth.actions';

class LoginContainer extends PureComponent {
  
  render() {
    const {loading, errors, data, actions} = this.props
    return <LoginWrapper loading={loading} errors={errors} data={data} actions={actions}/>;
  }
}

const mapStateToProps = state => ({
  loading: state.auth.loading,
  errors: state.auth.errors,
  data: state.auth.data,
});

const mapDispatchToProps = dispatch => ({
  actions: {
    login: () => {
      return dispatch(performLogin());
    },
    loginSuccess: loginDetails => {
      return dispatch(loginSuccess(loginDetails));
    },
    loginFailure: errorMessage => {
      return dispatch(loginFailure(errorMessage));
    },
    logout: () => {
      return dispatch(performLogout());
    },
  },
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LoginContainer),
);

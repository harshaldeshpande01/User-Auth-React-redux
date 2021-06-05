import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import LoginWrapper from './Login.wrapper';
import { performLogin, performLogout } from './Login.actions';

class LoginContainer extends PureComponent {
  
  render() {
    const {loading, error, data, actions} = this.props
    return <LoginWrapper loading={loading} error={error} data={data} actions={actions}/>;
  }
}

const mapStateToProps = state => ({
  loading: state.login.loading,
  error: state.login.error,
  data: state.login.data,
});

const mapDispatchToProps = dispatch => ({
  actions: {
    login: (data) => {
      return dispatch(performLogin(data));
    },
    logout: () => {
      return dispatch(performLogout());
    },
  },
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LoginContainer),
);

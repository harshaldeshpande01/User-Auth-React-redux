import React, { PureComponent } from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import LoginWrapper from './Login.wrapper';
import { performLogin, performLogout } from './Login.actions';

class LoginContainer extends PureComponent {
  // componentDidMount() {
    // actions.login({ email: 'ankit@gmail.com', password: 'password' });
  // }
  
  render() {
    const {loading, errors, data, actions} = this.props
    return <LoginWrapper loading={loading} errors={errors} data={data} actions={actions}/>;
  }
}

const mapStateToProps = state => ({
  loading: state.login.loading,
  errors: state.login.errors,
  data: state.login.data,
});

const mapDispatchToProps = dispatch => ({
  actions: {
    login: loginDetails => {
      return dispatch(performLogin(loginDetails));
    },
    logout: () => {
      return dispatch(performLogout());
    },
  },
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(LoginContainer),
);

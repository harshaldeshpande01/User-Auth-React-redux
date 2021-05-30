import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import DashboardWrapper from './Dashboard.wrapper';
import { performLogout } from '../Login/Login.actions';

class DashboardContainer extends PureComponent {
  
  render() {
    const {data, actions} = this.props;
    return <DashboardWrapper data={data} actions={actions}/>;
  }
}

const mapStateToProps = state => ({
  data: state.login.data,
});

const mapDispatchToProps = dispatch => ({
  actions: {
    logout: () => {
      return dispatch(performLogout());
    },
  },
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(DashboardContainer),
);

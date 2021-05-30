import React, { PureComponent } from 'react';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';

class DashboardWrapper extends PureComponent {

    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
      }

    handleLogout() {
        const {actions, history} = this.props;
        actions.logout();
        history.push('/login');
    }

  render() {
    const {data} = this.props
    return (
      <div>
        {Object.keys(data).length === 0 ?
          <CircularProgress/>
          :
          <div style={{ height: "75vh" }} className="container valign-wrapper">
            <div className="row">
            <div className="col s12 center-align">
                <h4>
                <b>Hey there,</b> {data.email}
                <p className="flow-text grey-text text-darken-1">
                    You are logged in successfully <span role="img" aria-label="hello">👏</span>
                </p>
                </h4>
                <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={this.handleLogout}
                >
                    Logout
                </Button>
            </div>
            </div>
          </div>
        }
      </div>
    );
  }
}

export default withRouter(DashboardWrapper);

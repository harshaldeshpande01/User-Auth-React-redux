import React, { PureComponent } from 'react';
import Button from '@material-ui/core/Button';
import { withRouter } from "react-router-dom";
import CircularProgress from '@material-ui/core/CircularProgress';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import FileUpload from '../FileUpload/FileUpload';

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
          <div>
            <AppBar>
            <Toolbar>
              <Grid
                justify="space-between"
                container 
              >
                <Grid item>
                  <Typography type="title" color="inherit">
                    Navbar
                  </Typography>
                </Grid>

                <Grid item>
                  <Button color="inherit" onClick={this.handleLogout}>
                    Logout
                  </Button>
                </Grid>
              </Grid>
            </Toolbar>
            </AppBar>

            <FileUpload />
        </div>
        }
      </div>
    );
  }
}

export default withRouter(DashboardWrapper);

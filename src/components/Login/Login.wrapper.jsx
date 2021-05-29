import React, { PureComponent } from 'react';
import { Grid, Paper, TextField, Button, Typography, Link } from '@material-ui/core'
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CircularProgress from '@material-ui/core/CircularProgress';
import './Login.css'

export default class LoginWrapper extends PureComponent {
  
  render() {
    const paperStyle={padding: 30, height:'70vh', width:'90vw', maxWidth:'400px'}
    const btnstyle={margin:'8px 0'}
    const {loading, errors, data, actions} = this.props
    const email = 'harshal@gmail.com'
    const password = 'password'

    return (
      <div>
        <Paper elevation={5} style={paperStyle}>
        <Grid>
                <Grid align='center'>
                    <h2 className='brand-header'>Login</h2>
                    <h5>{errors}</h5>
                    <h5>{data.email}</h5>
                </Grid>
                <Typography > Don&apos;t have an account ?
                     <Link href="/login" >
                        Sign Up 
                </Link>
                </Typography>
                <TextField className='input-field' label='Username' fullWidth required/>
                <TextField className='input-field' label='Password' type='password' fullWidth required/>
                <FormControlLabel className='remember-me'
                    control={
                    <Checkbox
                        name="checkedB"
                        color="primary"
                    />
                    }
                    label="Remember me"
                 />
                { loading && <CircularProgress /> }
                  <Button 
                    type='submit' 
                    color='primary' 
                    variant="contained" 
                    style={btnstyle} 
                    fullWidth
                    disabled={loading}
                    onClick={() => actions.login({ email, password})}
                  >
                    Sign in
                  </Button>
                {/* <Button 
                    type='button' 
                    color='primary' 
                    variant="contained" 
                    style={btnstyle} 
                    fullWidth
                    onClick={() => actions.logout()}
                >
                  Logout
                </Button> */}
                <div className='forgot-password'>
                  <div>
                    <Typography >
                      <Link href="/login" >
                        Forgot password ?
                      </Link>
                    </Typography>
                  </div>
                </div>
                
        </Grid>
        </Paper>
        {/* <h4>Login</h4>
        <h5>{errors}</h5>
        <h5>{data.email}</h5>
        {loading?
          <div>Loading...</div>
          :
          <button onClick={() => actions.login({ email, password})} type='submit'> 
            Submit 
          </button>
        } */}
        {/* <button onClick={() => actions.logout()} type='button'> 
            Logout
        </button> */}
      </div>
    );
  }
}

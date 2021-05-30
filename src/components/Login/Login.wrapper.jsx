import React, {useState} from 'react';
import {useHistory} from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', 
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function LoginWrapper(props) {
  const classes = useStyles();
  const {loading, errors, actions} = props
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showEmailError, setShowEmailError] = useState(false);
  const [showPasswordError, setShowPasswordError] = useState(false);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(email) {
      setEmailError('');
      setShowEmailError(false);
      if(password) {
        if(password.length >= 6) {
          setPasswordError('');
          setShowPasswordError(false);
          actions.login();

          // API call
          const response = true;
          if(response) {
            await setTimeout(() => { 
              actions.loginSuccess({email, password});
              history.push('/');
            }, 1000);
          }
          else {
            const errorMessage = "Invalid credentials";
            actions.loginFailure({errorMessage});
          }
        }
        else {
          setShowPasswordError(true);
          return setPasswordError('Minimun 6 characters');
        }
      }
      else {
        setShowPasswordError(true);
        return setPasswordError('Password required');
      }
    }
    else {
      setShowEmailError(true);
      return setEmailError('Email required');
    }
    return true;
  }

  return (
    <Container component="main" maxWidth="xs" className="login-container">
      <CssBaseline />
      <div className={classes.paper}>

        <Typography component="h1" variant="h5" style={{marginTop: '1em'}}>
          <span style={{fontWeight: 'bolder', fontSize: '1.3em'}}>Login</span>
        </Typography>

        {errors ? <Alert severity="error">{errors}</Alert> : <></>}

        <Grid container style={{marginTop: '2.5em'}}>
            <Grid item xs>
              Dont&apos; have an account?  
              <Link href="/login" variant="body2">
              &nbsp;Sign Up
              </Link>
            </Grid>
        </Grid>

        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            error = {showEmailError}
            helperText = {emailError}
            value = {email}
            onChange = {(e) => setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            error = {showPasswordError}
            helperText = {passwordError}
            value = {password}
            onChange = {(e) => setPassword(e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          {loading ? 
          <Grid container align="center">
            <Grid item xs>
              <CircularProgress/>
            </Grid>
          </Grid>
          :
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={loading}
          >
            Sign In
          </Button>
          }
          {/* <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => actions.logout()}
          >
            Logout
          </Button> */}
          <Grid container style={{display: 'flex', justifyContent: 'flex-end'}}>
            <Grid item>
              <Link href="/login" variant="body2">
                Forgot Password?
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
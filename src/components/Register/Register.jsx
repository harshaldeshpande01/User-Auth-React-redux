import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Alert from '@material-ui/lab/Alert';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
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

export default function Register() {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const ValidateEmail = (mail) => {
  if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail))
    {
      return true
    }
    return false
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(email) {
      const validEmail = ValidateEmail(email);
      if(validEmail) {
        setEmailError('');
        if(password) {
          if(password.length >= 6) {
            setPasswordError('');
            if(confirm) {
              if(confirm === password) {
                setConfirmError('');
                // Make API call
                setIsLoading(true);
                const response = true;
                if(response) {
                  await setTimeout(() => { 
                    setSeverity('success');
                    setMessage('Account created login to continue');
                    setIsLoading(false);
                  }, 1000);
                }
                else {
                  setSeverity('error');
                  setMessage('Something went wrong');
                }
              }
              else {
                setConfirmError('Passwords do not match');
              }
            }
            else {
              setConfirmError('Please confirm you password');
            }
          }
          else {
            return setPasswordError('Minimun 6 characters required');
          }
        }
        else {
          return setPasswordError('Please enter your password');
        }
      }
      else{
        setEmailError('Email address badly formatted');
      }
    }
    else {
      return setEmailError('Please enter your email address');
    }
    return true;
  }

  return (
    <Container component="main" maxWidth="xs" className="login-container">
      <CssBaseline />
      <div className={classes.paper}>

        <Typography component="h1" variant="h5" style={{marginTop: '1em'}}>
          <span style={{fontWeight: 'bolder', fontSize: '1.3em'}}>SignUp</span>
        </Typography>

        {message ? <Alert severity={severity}>{message}</Alert> : <></>}

        <Grid container style={{marginTop: '2.5em'}}>
            <Grid item xs>
              Already have an account?  
              <Link href="/login" variant="body2">
              &nbsp;Login
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
            error = {!!emailError}
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
            error = {!!passwordError}
            helperText = {passwordError}
            value = {password}
            onChange = {(e) => setPassword(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirm"
            label="Confirm"
            type="password"
            id="confirm"
            autoComplete="current-password"
            error = {!!confirmError}
            helperText = {confirmError}
            value = {confirm}
            onChange = {(e) => setConfirm(e.target.value)}
          />
          {isLoading ? 
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
            disabled={isLoading}
          >
            Sign Up
          </Button>
          }
        </form>
      </div>
    </Container>
  );
}
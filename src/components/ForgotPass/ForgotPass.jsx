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

export default function LoginWrapper() {
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
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

        setIsLoading(true);
        // API call
        const response = true;
        if(response) {
          await setTimeout(() => { 
            setSeverity('success');
            setMessage('Check your email for furthur steps');
            setIsLoading(false);
          }, 1000);
        }
        else {
          await setTimeout(() => { 
            setSeverity('error');
            setMessage('Something went wrong');
            setIsLoading(false);
          }, 1000);
        }
      }
      else{
        setEmailError('Email address badly formatted');
        return false;
      }
    }
    else{
      setEmailError('Please enter your email address');
      return false;
    }
    return true;
  }

  return (
    <Container component="main" maxWidth="xs" className="login-container">
      <CssBaseline />
      <div className={classes.paper}>

        <Typography component="h1" variant="h5" style={{marginTop: '1em'}}>
          <span style={{fontWeight: 'bolder', fontSize: '1.3em'}}>Reset Password</span>
        </Typography>

        
        {message ? <Alert severity={severity}>{message}</Alert> : <></>}

        <Grid container style={{marginTop: '2.5em'}}>
            <Grid item xs style={{display: 'flex', alignItems: 'center'}}>
              <Typography color='textSecondary' variant="body2">
                Go back to 
                <Link href="/login" variant="body2">
                  &nbsp;Login
                </Link>
              </Typography> 
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
            Submit
          </Button>
          }
        </form>
      </div>
    </Container>
  );
}
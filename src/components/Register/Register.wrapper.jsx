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

import {pageConst} from './Register.pageConstants';

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

export default function Register(props) {
  const classes = useStyles();
  const {pageTitle, pageLoginLink, pageEmail, pagePassword, pageConfirm, pageButton} = pageConst;
  const {loading, error, data, actions} = props;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmError, setConfirmError] = useState('');

  const ValidateEmail = (mail) => {
  if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(mail))
    {
      return true
    }
    return false
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(!email) {
      return setEmailError(pageEmail.empty);
    }

    if(!ValidateEmail(email)) {
      return setEmailError(pageEmail.invalid);
    }

    setEmailError('');

    if(!password) {
      return setPasswordError(pagePassword.empty);
    }

    if(password.length < 6) {
      return setPasswordError(pagePassword.invalid);
    }

    setPasswordError('');

    if(!confirm) {
      return setConfirmError(pageConfirm.empty);
    }

    if(confirm !== password) {
      return setConfirmError(pageConfirm.invalid);
    }

    setConfirmError('');

    actions.register({email, password});

    return true;
  }

  return (
    <Container key={props} component="main" maxWidth="xs" className="login-container">
      <CssBaseline />
      <div className={classes.paper}>

        <Typography component="h1" variant="h5" style={{marginTop: '1em'}}>
          <span style={{fontWeight: 'bolder', fontSize: '1.3em'}}>{pageTitle}</span>
        </Typography>

        {data && data.email ? <Alert severity='success'>{data.email}</Alert> : <></>}
        {error ? <Alert severity='error'>{error}</Alert> : <></>}

        <Grid container style={{marginTop: '2.5em'}}>
            <Grid item xs>
              <Typography color='textSecondary' variant="body2">
                {pageLoginLink.label}
                <Link href="/login" variant="body2">
                  &nbsp;{pageLoginLink.link}
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
            id={pageEmail.id}
            label={pageEmail.label}
            name={pageEmail.name}
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
            name={pagePassword.name}
            label={pagePassword.label}
            type={pagePassword.type}
            id={pagePassword.id}
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
            name={pageConfirm.name}
            label={pageConfirm.label}
            type={pageConfirm.type}
            id={pageConfirm.id}
            error = {!!confirmError}
            helperText = {confirmError}
            value = {confirm}
            onChange = {(e) => setConfirm(e.target.value)}
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
            {pageButton.label}
          </Button>
          }
        </form>
      </div>
    </Container>
  );
}
import React, {useState} from 'react';
import {Avatar, Button, CssBaseline, TextField, Snackbar, Typography, Container} from '@material-ui/core';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { makeStyles } from '@material-ui/core/styles';
import Header from './Header';
import Alert from './Alert';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn(props) {
  const classes = useStyles();
  // The password should be encoded when connect with db.
  const [state, setState] = useState({
      userName: '',
      password: '',
      serviceProvider: [
        {userName: 'yoga', password: 'atiq123', isSpecific: true},
        {userName: 'football', password: 'atiq123', isSpecific: false},
      ],
      isToastr: false,
      vertical: 'top',
      horizontal: 'right',
  })

  // handle toastr message
  function handleToastr() {
    setState({...state, isToastr: !state.isToastr})
  };

  // on change handle
  function handleChange(e){
      const {name, value} = e.target;
      setState({...state, [name]: value})
  }

  // on form submit
  function onSubmit(e){
      e.preventDefault();
    const {userName, password, serviceProvider} = state;
    serviceProvider.forEach((user) => {
      if (user.userName === userName && user.password === password){
        props.history.push({pathname: './dashboard', state: { user }})
      } else {
        handleToastr();
      }
    })
  }

  const {userName, password, isToastr, vertical, horizontal} = state;

  return (
    <div>
        <Snackbar open={isToastr}  anchorOrigin={{ vertical, horizontal }} autoHideDuration={6000} onClose={handleToastr}>
            <Alert onClose={handleToastr} severity="error">
                Username or Password are invalid!
            </Alert>
        </Snackbar>
        <Header/>
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form}>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="User Name"
                name="userName"
                value={userName}
                onChange={handleChange}
                autoFocus
            />
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                value={password}
                onChange={handleChange}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick={onSubmit}
            >
                Sign In
            </Button>
            </form>
        </div>
        </Container>
    </div>
  );
}
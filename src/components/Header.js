import React from 'react';
import {Link} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import {AppBar, Toolbar, Typography, Button} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  headerTitle: {
    textDecoration: 'none',
    color:' #000'
  }
}));

export default function Header({leftMenu}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Toolbar>
          <Typography variant="h6" className={classes.title}>
            <Link className={classes.headerTitle} to='/'>Workfam</Link>
          </Typography>
          {
            leftMenu ?
            leftMenu :
            <Link to='/login'>
              < Button color="inherit">Login</Button>
            </Link>
          }
        </Toolbar>
      </AppBar>
    </div>
  );
}
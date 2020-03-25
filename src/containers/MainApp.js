import React from 'react';
import Card from '../components/Card';
import { makeStyles } from '@material-ui/core/styles';
import {Button} from '@material-ui/core';
import Header from '../components/Header';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    width: '50%'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  header: {
    textAlign: 'center'
  },
  pos: {
    marginBottom: 12,
  },
  content: {
    textAlign: 'center'
  },
  btn: {
    marginRight: '1rem'
  }
});

function MainApp(props) {
  const classes = useStyles();

  function renderTo(e){
      e.preventDefault();
      props.history.push('/login')
  }
  return (
    <div>
      <Header/>
      <div className="main-card">
       <Card
        headerTitle={
          <div className={classes.header}>
            Fill in your availability in your schedule
          </div>
        }
        content={
          <div className={classes.content}>
            <Button onClick={renderTo} className={classes.btn} variant="contained" color="primary">
              Specific
            </Button>
            <Button onClick={renderTo} variant="contained" color="primary">
              Any Time
            </Button>
          </div>
        }
       />
      </div>
    </div>
  );
}

export default MainApp;

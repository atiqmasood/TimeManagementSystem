import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Card as MuiCard, CardActions, CardContent, CardHeader} from '@material-ui/core';

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
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function Card({headerTitle, content, action}) {
  const classes = useStyles();

  return (
    <MuiCard className={classes.root}>
      <CardHeader
        title={headerTitle && headerTitle}
      />
      <CardContent>
        {content && content}
      </CardContent>
      <CardActions>
        {action && action}
      </CardActions>
    </MuiCard>
  );
}
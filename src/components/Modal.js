import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {Modal as MuiModal, Snackbar} from '@material-ui/core';
import Alert from './Alert';


const useStyles = makeStyles(theme => ({
  paper: {
    position: 'absolute',
    width: '60%',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  modal: {
      display: 'flex',
      justifyContent: 'center',
      top: '2rem !important'
  },
  body: {
      marginBottom: '3rem'
  }
}));


export default function Modal({handleModalToggle, isOpen, title, content, footer, handleToastr, isToastr}) {
  const classes = useStyles();

  return (
    <div>
        <Snackbar onClose={handleToastr} open={isToastr}  anchorOrigin={{ vertical: 'top', horizontal: 'right' }} autoHideDuration={6000}>
            <Alert onClose={handleToastr} severity="error">
                Please schedule your time between 8:00 to 10:00
            </Alert>
        </Snackbar>
      <MuiModal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={isOpen}
        onClose={handleModalToggle}
        className={classes.modal}
      >
        <div className={classes.paper}>
            <h3>{title && title}</h3>
            <div className={classes.body}>{content && content}</div>
            <hr/>
            <div>{footer && footer}</div>
        </div>
      </MuiModal>
    </div>
  );
}
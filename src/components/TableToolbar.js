import 'date-fns';
import React, { useState } from 'react';
import { lighten, makeStyles } from '@material-ui/core/styles';
import {Toolbar, Typography, Button, TextField, Grid} from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Modal from './Modal';

const useToolbarStyles = makeStyles(theme => ({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    title: {
      flex: '1 1 50%',
    },
  }));

export default function TableToolbar({loggedInUser, addSchedule}) {
    const classes = useToolbarStyles();
    const [state, setState] = useState({
      isModalOpen: false,
      isToastr: false,
      formData: {
        date: new Date(),
        from: new Date(),
        to: new Date(),
        bookinglimit: 0,
        price: 0
      }
    })

    // handle toastr message
    function handleToastr() {
      setState({...state, isToastr: !state.isToastr})
    };

    function handleChange(e) {
      const {name, value} = e.target;

      if ((name === 'from' || name === 'to') && loggedInUser.isSpecific){
        validateTimeRange(name, value);
        return;
      }
      setState({...state, formData: {...state.formData, [name]: value}});
    };

    function validateTimeRange(name, time){
      const hours = time.getHours();
      
      if (hours >= 8 && hours <= 10){
        setState({...state, formData: {...state.formData, [name]: time}});
      } else {
        handleToastr();
      }
    }

    function handleModal(){
      setState({...state, isModalOpen: !state.isModalOpen})
    }

    function GetFormattedDate() {
      const {date} = state.formData;
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const year = date.getFullYear();
      return day + "-" + month + "-" + year;
    }

    function getFormatedTime(time){
      const mint = time.getMinutes();
      const minutes = mint < 10 ? '0'+mint : mint;
      return time.getHours() +":"+minutes
    }

    function newSchedule(){
      const {to, from} = state.formData;
      let newSchedule = state.formData;
      const date = GetFormattedDate();
      const formatedFrom = getFormatedTime(from);
      const formatedTo = getFormatedTime(to);
      newSchedule = {...newSchedule, bookings: 4, timeslot: `${formatedFrom} - ${formatedTo}`, date}
      addSchedule(newSchedule)
      handleModal();
    }

    const {date, price, bookinglimit, from, to} = state.formData;
    return (
      <div>
        <Toolbar>
          <Typography className={classes.title} variant="h6" id="tableTitle">
            Schedule List
          </Typography>
          <Button
                variant="contained"
                color="primary"
                size='small'
                className={classes.button}
                onClick={handleModal}
            >
                add schedule
            </Button>
        </Toolbar>
        {
          state.isModalOpen &&
            <Modal
             handleModalToggle={handleModal}
             isOpen={state.isModalOpen}
             title='Add new schedule'
             handleToastr={handleToastr}
             isToastr={state.isToastr}
             content={
               <div>
                 <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <form>
                      <Grid container spacing={2}>
                      <Grid item md={6}>
                        <KeyboardDatePicker
                            disableToolbar
                            autoOk
                            variant="inline"
                            inputVariant="outlined"
                            fullWidth
                            format="MM/dd/yyyy"
                            margin="normal"
                            label="Date"
                            name="date"
                            value={date}
                            onChange={(date) => handleChange({target: {name: 'date', value: date}})}
                            KeyboardButtonProps={{
                              'aria-label': 'change date',
                            }}
                        />
                      </Grid>
                      <Grid item md={6}>
                        <TextField
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          label="Price"
                          name="price"
                          type='number'
                          value={price}
                          onChange={handleChange}
                        />
                      </Grid>
                      <Grid item md={6}>
                        <KeyboardTimePicker
                          disableToolbar
                          autoOk
                          inputVariant="outlined"
                          fullWidth
                          margin="normal"
                          label="From"
                          ampm={false}
                          value={from}
                          onChange={(time) => handleChange({target: {name: 'from', value: time}})}
                          KeyboardButtonProps={{
                            'aria-label': 'change time',
                          }}
                        />
                      </Grid>
                      <Grid item md={6}>
                        <KeyboardTimePicker
                            disableToolbar
                            autoOk
                            ampm={false}
                            inputVariant="outlined"
                            fullWidth
                            margin="normal"
                            label="To"
                            value={to}
                            onChange={(time) => handleChange({target: {name: 'to', value: time}})}
                            KeyboardButtonProps={{
                              'aria-label': 'change time',
                            }}
                          />
                      </Grid>
                      <Grid item md={6}>
                        <TextField
                          variant="outlined"
                          margin="normal"
                          required
                          fullWidth
                          label="Booking limit"
                          name="bookinglimit"
                          type='number'
                          value={bookinglimit}
                          onChange={handleChange}
                        />
                      </Grid>
                      </Grid>
                  </form>
                 </MuiPickersUtilsProvider>
               </div>
             }
             footer={
               <div style={{textAlign: 'right'}}>
                <Button onClick={newSchedule} style={{marginRight: '1rem'}} size='small' variant="contained" color="primary">
                  Save
                </Button>
                <Button onClick={handleModal} size='small' variant="contained" color="secondary">
                  Cancel
                </Button>
               </div>
             }
           />
        }
      </div>
    );
  };
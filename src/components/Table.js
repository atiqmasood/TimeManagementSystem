import React, {useState, Fragment} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
    Table as MuiTable, 
    TableBody, 
    TableCell, 
    TableContainer, 
    TableHead, 
    TablePagination, 
    TableRow,
    Chip,
    IconButton,
    Paper,
    Button,
    Grid
} from '@material-ui/core';
import {Done as DoneIcon, Delete as DeleteIcon} from '@material-ui/icons';
import TableToolbar from './TableToolbar';
import Modal from './Modal';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: '3rem'
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
  tableHead: {
      background: '#A15BB5'
  },
  tableHeadCell: {
      color: 'white'
  },
  bookingChip: {
      background: 'green'
  },
  deletIconBtn: {
      color: 'firebrick',
      padding: 0
  },
  bookingPaper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

const headCells = [
  { id: 'bookings', disablePadding: true, label: 'Bookings' },
  { id: 'date', disablePadding: false, label: 'Date' },
  { id: 'timeslot', disablePadding: false, label: 'Time slot' },
  { id: 'price', disablePadding: false, label: 'Price ( AED )' },
  { id: 'action', disablePadding: false, label: 'Action' },
];
const bookingData =[
  {name: 'Atiq', email: 'atiqmasood@yahoo.com', phone: '00971505670502'},
  {name: 'rehman', email: 'rehman@yahoo.com', phone: '00971505670502'},
  {name: 'khan', email: 'khan@yahoo.com', phone: '00971505670502'},
  {name: 'Atiq', email: 'atiqmasood@yahoo.com', phone: '00971505670502'},
]

export default function Table({loggedInUser, rows}) {
  const classes = useStyles();
  const [state, setState] = useState({
      page: 0,
      rowsPerPage: 5,
      tableRows: rows,
      isModalOpen: false
  });

  function handleModal(){
    setState({...state, isModalOpen: !state.isModalOpen})
  }

  function handleChangePage(event, newPage)  {
    setState({...state, page: newPage});
  };

  function handleChangeRowsPerPage(event) {
    setState({...state, page: 0, rowsPerPage: parseInt(event.target.value, 10)});
  };

  function addSchedule(newSchedule){
    const {tableRows} = state;
    tableRows.push(newSchedule)
    setState({...state, tableRows})
  }

  function deleteSchedule(id){
    const tableRows = (state.tableRows || []).filter(x => x.id !== id)
    setState({...state, tableRows})
  }

  const {page, rowsPerPage, tableRows} = state;
  const tableData = (tableRows || []).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div className={classes.root}>
      <div>
        <TableToolbar loggedInUser={loggedInUser} deleteSchedule={deleteSchedule} addSchedule={addSchedule} />
        <TableContainer component={Paper}>
          <MuiTable
            className={classes.table}
            size={'medium'}
          >
            <TableHead className={classes.tableHead}>
                <TableRow>
                    {
                        headCells.map(headCell => (
                            <TableCell
                                key={headCell.id}
                                align={'left'}
                                className={classes.tableHeadCell}
                            >
                                {headCell.label}
                            </TableCell>
                        ))
                    }
                </TableRow>
            </TableHead>
            <TableBody>
              {
                
                (tableData || []).map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={row.id}
                    >
                      <TableCell component="th" id={labelId} scope="row">
                        <Chip
                          icon={<DoneIcon />}
                          label={row.bookings}
                          clickable
                          color="primary"
                          onClick={handleModal}
                        />
                      </TableCell>
                      <TableCell align="left">{row.date}</TableCell>
                      <TableCell align="left">{row.timeslot}</TableCell>
                      <TableCell align="left">{row.price}</TableCell>
                      <TableCell align="center">
                        <IconButton onClick={() => deleteSchedule(row.id)} className={classes.deletIconBtn} aria-label="delete">
                            <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </MuiTable>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10]}
          component="div"
          count={tableRows && tableRows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
        {
          state.isModalOpen &&
            <Modal
              handleModalToggle={handleModal}
              isOpen={state.isModalOpen}
              title={'Booking persons'}
              content={
                <Grid container spacing={3}>
                  {
                    (bookingData || []).map((booking, index) => 
                      <Fragment key={index}>
                        <Grid item xs={4}>
                          <Paper className={classes.bookingPaper}>{booking.name}</Paper>
                        </Grid>
                        <Grid item xs={4}>
                          <Paper className={classes.bookingPaper}>{booking.email}</Paper>
                        </Grid>
                        <Grid item xs={4}>
                          <Paper className={classes.bookingPaper}>{booking.phone}</Paper>
                        </Grid>
                      </Fragment>
                    )
                  }
                </Grid>
              }
              footer={
                <div style={{textAlign: 'right'}}>
                  <Button onClick={handleModal} size='small' variant="contained" color="secondary">
                    Close
                  </Button>
                </div>
              }
          />
        }
      </div>
    </div>
  );
}
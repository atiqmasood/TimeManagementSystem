import React from 'react';
import {Link} from 'react-router-dom'
import Header from '../components/Header';
import Table from '../components/Table';
import {Button, Container} from '@material-ui/core';


function createData(id, bookings, date, timeslot, price) {
    return { id, bookings, date, timeslot, price };
  }
  
  const tableRowsData = [
    createData(1, 4, '23-03-2020', '8:00 - 10:00', 5),
    createData(2, 4, '23-03-2020', '8:00 - 10:00', 5),
    createData(3, 4, '23-03-2020', '8:00 - 10:00', 5),
    createData(4, 4, '23-03-2020', '8:00 - 10:00', 5),
    createData(5, 4, '23-03-2020', '8:00 - 10:00', 5),
    createData(6, 4, '23-03-2020', '8:00 - 10:00', 5),
    createData(7, 4, '23-03-2020', '8:00 - 10:00', 5),
  ];

export default function Dashboard({location}){
    const loggedInUser = location && location.state && location.state.user;
    return(
        <div>
            <Header
                leftMenu={
                <div>
                    {loggedInUser.userName}
                    <Link to='/'>
                        < Button color="inherit">Logout</Button>
                    </Link>
                </div>
                }
            />
            <Container>
                <Table loggedInUser={loggedInUser} rows={tableRowsData} />
            </Container>
        </div>
    )
}
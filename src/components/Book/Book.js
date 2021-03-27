import DateFnsUtils from '@date-io/date-fns';
import { Button, Grid } from '@material-ui/core';
import {
    KeyboardDatePicker, MuiPickersUtilsProvider
} from '@material-ui/pickers';
import 'date-fns';
import React, { useContext, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { userContext } from '../../App';
import Books from '../Books/Books';
import './Book.css';

const Book = () => {

    const [user] = useContext(userContext)

    const [selectedDate, setSelectedDate] = useState({
        checkIn: new Date(),
        checkOut: new Date(),
    });

    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleDateCheckIn = (date) => {
        const newDate = {...selectedDate};
        newDate.checkIn = date;
        setSelectedDate(newDate);
    };

    const handleDateCheckOut = (date) => {
        const newDate = {...selectedDate};
        newDate.checkOut = date;
        setSelectedDate(newDate);
    };

    const handleBooking = () => {
        const newBooking = {...user, ...selectedDate};
        fetch('http://localhost:4000/AddBooks', {
            method: 'POST',
            body: JSON.stringify(newBooking),
            headers: {"Content-Type": 'application/json'}
        })
        .then(res=>res.json())
        .then(result =>{
            result && setIsSubmitted(true);
        });
    }

    const {bedType} = useParams();
    return (
        <div style={{textAlign: 'center'}}>
            <h1>Let's book a {bedType} Room.</h1>
            <p>Want a <Link to="/home">different room?</Link> </p>

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <Grid container justify="space-around">
                    <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Check In Date"
                    value={selectedDate.checkIn}
                    onChange={handleDateCheckIn}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                    />
                    <KeyboardDatePicker
                    margin="normal"
                    id="date-picker-dialog"
                    label="Check Out Date"
                    format="dd/MM/yyyy"
                    value={selectedDate.checkOut}
                    onChange={handleDateCheckOut}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                    />
                </Grid>
            </MuiPickersUtilsProvider>
            <Button onClick={handleBooking} variant="contained" color="primary">
                Submit
            </Button>
            {isSubmitted && <p className="success">Submitted SuccessFully</p>}

            <Books isSubmitted={isSubmitted} setIsSubmitted={setIsSubmitted} />
        </div>
    );
};

export default Book;
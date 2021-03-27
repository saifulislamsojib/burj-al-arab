import React, { useContext, useEffect, useState } from 'react';
import { userContext } from '../../App';

const Books = ({isSubmitted, setIsSubmitted}) => {
    const [books, setBooks] = useState([]);

    const [user] = useContext(userContext);

    useEffect(() => {
        const userToken = sessionStorage.getItem('userToken');
        fetch(`http://localhost:4000/bookings?email=${user.email}`, {
            method: 'GET',
            headers: {
                "Content-Type": 'application/json',
                authorization: `Bearer ${userToken}`
            }
        })
        .then(res=>res.json())
        .then(data=> setBooks(data));
        setIsSubmitted(false);
    }, [isSubmitted, setIsSubmitted, user.email]);
    return (
        <div>
            {
                books.map(book => <li key={book._id}>{book.name}- from {new Date(book.checkIn).toDateString('dd/MM/yyyy')} to {new Date(book.checkOut).toDateString('dd/MM/yyyy')}</li>)
            }
        </div>
    );
};

export default Books;
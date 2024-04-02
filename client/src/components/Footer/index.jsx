// these hooks are used to access the current location and navigate thhrought React
import { useLocation, useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

const Footer = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [events, setEvents] = useState([]);

    const createEvent = () => {
        // creating a new event instance
        const newEvent = {
            title: 'New Event',
            description: 'Description of event',
            date:'Date of event'
        };

        // react re renders with updated state when setEvents is called
        // prevEvents is the previous set of events in the array, not mutating the array but creating a new array
        // newEvent is then added to the array and the setEvents sets the new value for 'events'
        setEvents(prevEvents => [...prevEvents, newEvent]);
    };

    return(
        // setting the footer
        <footer className='w-100 mt-auto text-dark p-4'>
            {/*creating the function that will create events */}
           
            <div className='container text-center mb-5'>
                {/* if the user is not in the homepage they will get redirected to the homepage.  */}
                {/* if the user is in the homepage they will be able to create an event */}
                {location.pathname !== '/homepage' ? (
                    <button 
                        className='btn btn-dark mb-3'
                        onClick={() => navigate('/homepage')}
                    >
                        Go to Homepage
                    </button>
                ) : (
                    <button
                    className='btn btn-dark mb-3'
                    onClick={createEvent}
                    >
                        Create Event!
                    </button>
                )}
            </div>
        </footer>
    );
};

export default Footer;
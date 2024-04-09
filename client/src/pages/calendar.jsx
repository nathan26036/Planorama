import React, { useState, useEffect, useRef } from 'react';
import { Calendar } from '@fullcalendar/core';
import timeGridPlugin from '@fullcalendar/timegrid';

const Planner = () => {
  const [myEvents, setMyEvents] = useState([]);
  // calendar reference
  const calendarRef = useRef(null);

  // this useEffect is retrieving information from local storage.Only runs once.
  useEffect(() => {
    const storedEvents = localStorage.getItem('userEvents');
    if (storedEvents) {
      const calEvents = JSON.parse(storedEvents);
      setMyEvents(calEvents);
    }
  }, []); 

  // this useEffect runs whenever there is a change to myEvents
  useEffect(() => {
    // checks if the calendar container is not null. Initializes the FullCalendar instance and implements the events from myEvents
    if (calendarRef.current) {
      const calendar = new Calendar(calendarRef.current, {
        timeZone: 'GMT-4',
        plugins: [timeGridPlugin],
        initialView: 'timeGridWeek',
        events: myEvents,
        headerToolbar: {
          left: 'prev,next',
          center: 'title',
          right: 'timeGridWeek,timeGridDay' 
        }
      });
      calendar.render();
    }
    // ensures that FullCalendar is updated with the latest information
  }, [myEvents]); 

  // this line returns a div element with the calendarRef attached to it 
  return <div className='bg-light p-5' ref={calendarRef} />;
};

export default Planner;

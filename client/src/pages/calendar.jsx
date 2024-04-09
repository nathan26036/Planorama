import React, {useState, useEffect } from 'react';
import { Calendar } from '@fullcalendar/core'
import timeGridPlugin from '@fullcalendar/timegrid'



const Planner = () => {
  const [myEvent, setMyEvent] = useState([]);

  useEffect(() => {
    const myEvents = JSON.parse(localStorage.getItem('calendarEvents'));
    if (myEvents) {
      setMyEvent(...myEvent, myEvents);
      console.log(myEvent)
    }
  var calendarEl = document.getElementById('calendar');
  const calendar = new Calendar(calendarEl, {
    timeZone: 'GMT-4',
    plugins: [timeGridPlugin],
    initialView: 'timeGridWeek',
    events: [myEvent],
    headerToolbar: {
      left: 'prev,next',
      center: 'title',
      right: 'timeGridWeek,timeGridDay' // user can switch between the two
    }
  })
  calendar.render()
}, []);

  return (
    <div id='calendar'></div>
  );
};

export default Planner;

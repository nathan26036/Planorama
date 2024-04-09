import React, {useState, useEffect } from 'react';
import { Calendar } from '@fullcalendar/core'
import timeGridPlugin from '@fullcalendar/timegrid'

const Planner = () => {
  const [myEvents, setMyEvents] = useState([]);


  useEffect(() => {
    const storedEvents = localStorage.getItem('userEvents');
    if (storedEvents) {
      const calEvents = JSON.parse(storedEvents)
      const myEvent = calEvents.map(({ title, start }) => ({ title: title, start: start }))
      setMyEvents(myEvent);
      console.log(myEvents)
    }
  var calendarEl = document.getElementById('calendar');
  const calendar = new Calendar(calendarEl, {
    timeZone: 'GMT-4',
    plugins: [timeGridPlugin],
    initialView: 'timeGridWeek',
    events: myEvents,
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

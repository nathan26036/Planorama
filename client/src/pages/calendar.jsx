import React, { useEffect } from 'react';
import { Calendar } from '@fullcalendar/core'
import timeGridPlugin from '@fullcalendar/timegrid'

const Planner = () => {
  useEffect(() => {
  var calendarEl = document.getElementById('calendar');
  const calendar = new Calendar(calendarEl, {
    plugins: [timeGridPlugin],
    initialView: 'timeGridWeek',
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

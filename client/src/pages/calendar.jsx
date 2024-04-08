import React, { useEffect } from 'react';
import { Calendar } from '@fullcalendar/core'
import timeGridPlugin from '@fullcalendar/timegrid'

const Planner = () => {
  useEffect(() => {
  var calendarEl = document.getElementById('calendar');
  const calendar = new Calendar(calendarEl, {
    timeZone: 'GMT-4',
    plugins: [timeGridPlugin],
    initialView: 'timeGridWeek',
    events: [
      {
        title  : 'event1',
        start  : '2024-04-04'
      },
      {
        title  : 'event2',
        start  : '2024-04-05',
        end    : '2024-04-07'
      },
      {
        title  : 'event3',
        start  : '2024-04-02T12:30:00',
        end  :'2024-04-02T15:30:00',
        allDay : false // will make the time show
      }
    ],
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

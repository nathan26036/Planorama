import React, { useEffect } from 'react';
import FullCalendar from '@fullcalendar/react';
import resourceTimelinePlugin from '@fullcalendar/resource-timeline';
import '@fullcalendar/resource-timeline/main.css';

const Calendar = () => {
  useEffect(() => {
    const calendar = new FullCalendar.Calendar(document.getElementById('calendar'), {
      plugins: [resourceTimelinePlugin],
      initialView: 'resourceTimelineWeek'
    });
    calendar.render();

    return () => {
      calendar.destroy();
    };
  }, []);

  return (
    <div id='calendar'></div>
  );
};

export default Calendar;

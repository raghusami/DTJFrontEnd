// CalendarView.js
import React from 'react';
import FullCalendar from '@fullcalendar/react'; // FullCalendar component
import dayGridPlugin from '@fullcalendar/daygrid'; // Plugin for day grid
import { CustomEvent } from './CustomEvent'; // Import the custom event renderer
import '../styles/CalendarView.css'; // Custom CSS overrides
import { Box } from '@mui/material';

const CalendarView = ({ events }) => {
  return (
    <Box sx={{ padding: '10px' }}>
    <FullCalendar
      plugins={[dayGridPlugin]}
      initialView="dayGridMonth"
      events={events}
      eventContent={(info) => <CustomEvent info={info} />} 
      height="100%"
      contentHeight="auto" 
    />
    </Box>
  );
};

export default CalendarView;

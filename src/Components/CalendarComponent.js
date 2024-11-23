import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import 'react-big-calendar/lib/addons/dragAndDrop/styles.css';
import './CalendarComponent.css';

const localizer = momentLocalizer(moment);
const DnDCalendar = withDragAndDrop(Calendar);

const CalendarComponent = ({ events, onEventDrop, onSelectEvent }) => {
  const moveEvent = ({ event, start, end }) => {
    console.log('Original event:', event); // Debug log
    
    const updatedEvent = {
      ...event,
      id: event._id || event.id, // Handle both MongoDB _id and regular id
      title: event.title,
      start: new Date(start),
      end: new Date(end)
    };
    
    console.log('Updated event:', updatedEvent); // Debug log
    onEventDrop(updatedEvent);
  };

  // Ensure events have proper id field
  const formattedEvents = events.map(event => ({
    ...event,
    id: event._id || event.id // Handle both MongoDB _id and regular id
  }));

  return (
    <div className="calendar-container">
      <DnDCalendar
        localizer={localizer}
        events={formattedEvents}
        onEventDrop={moveEvent}
        onSelectEvent={onSelectEvent}
        style={{ height: 'calc(100vh - 100px)' }}
        defaultView="month"
        views={['month', 'week', 'day']}
        step={30}
        showMultiDayTimes
        resizable
        selectable
        popup
        draggableAccessor={() => true}
      />
    </div>
  );
};

export default CalendarComponent;

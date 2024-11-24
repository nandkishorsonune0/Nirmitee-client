import React, { useState, useEffect } from "react";
//import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import CalendarComponent from "./Components/CalendarComponent";
import EventList from "./Components/EventList";
import CreateEventModal from "./Components/CreateEventModal";
import SummaryPage from "./Components/SummaryPage";
import { fetchEvents, addEvent, updateEvent, deleteEvent } from "./utils/api";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => {
  const [events, setEvents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [newEvent, setNewEvent] = useState({
    title: '',
    start: new Date(),
    end: new Date()
  });

  useEffect(() => {
    loadEvents();
  }, []);

  const loadEvents = async () => {
    try {
      setLoading(true);
      const data = await fetchEvents();
      const formattedEvents = data.map(event => ({
        ...event,
        start: new Date(event.start),
        end: new Date(event.end)
      }));
      setEvents(formattedEvents);
    } catch (error) {
      console.error("Error loading events:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEventDrop = async (movedEvent) => {
    try {
      console.log('Event being moved:', movedEvent);
      const updatedEvent = await updateEvent(movedEvent);
      setEvents(prevEvents =>
        prevEvents.map(event =>
          event.id === movedEvent.id ? {
            ...updatedEvent,
            start: new Date(updatedEvent.start),
            end: new Date(updatedEvent.end)
          } : event
        )
      );
    } catch (error) {
      console.error('Error updating event:', error);
      loadEvents();
    }
  };

  const handleSelectEvent = async (event) => {
    if (window.confirm("Would you like to delete this event?")) {
      try {
        await deleteEvent(event.id);
        setEvents(prevEvents => 
          prevEvents.filter(e => e.id !== event.id)
        );
      } catch (error) {
        console.error("Error deleting event:", error);
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmitNewEvent = async () => {
    try {
      if (newEvent.title && newEvent.start && newEvent.end) {
        const eventToAdd = {
          ...newEvent,
          start: new Date(newEvent.start),
          end: new Date(newEvent.end)
        };
        
        const createdEvent = await addEvent(eventToAdd);
        setEvents(prev => [...prev, {
          ...createdEvent,
          start: new Date(createdEvent.start),
          end: new Date(createdEvent.end)
        }]);
        setNewEvent({ title: '', start: new Date(), end: new Date() });
        setShowModal(false);
      }
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>Appointment Calendar</h1>
          <div className="header-actions">
            <button 
              className="create-event-btn"
              onClick={() => setShowModal(true)}
            >
              <i className="fas fa-plus"></i>
              Create Appointment
            </button>
          </div>
        </div>
      </header>

      <main className="app-main">
        <div className="dashboard-layout">
          <div className="calendar-section">
            <CalendarComponent
              events={events}
              onEventDrop={handleEventDrop}
              onSelectEvent={handleSelectEvent}
            />
          </div>
          
          <div className="sidebar-section">
            <EventList events={events} />
            <div className="summary-section">
              <SummaryPage events={events} />
            </div>
          </div>
        </div>
      </main>

      {showModal && (
        <CreateEventModal
          showModal={showModal}
          newEvent={newEvent}
          handleInputChange={handleInputChange}
          handleSubmitNewEvent={handleSubmitNewEvent}
          closeModal={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default App;

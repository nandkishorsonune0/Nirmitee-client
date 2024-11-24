const BASE_URL = 'https://nirmitee-server.onrender.com/events';

export const fetchEvents = async () => {
  try {
    const response = await fetch(BASE_URL);
    const data = await response.json();
    return data.map(event => ({
      ...event,
      id: event._id || event.id,
      start: new Date(event.start),
      end: new Date(event.end)
    }));
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
};

export const updateEvent = async (event) => {
  try {
    const eventId = event._id || event.id;
    
    if (!eventId) {
      throw new Error('Event ID is required for update');
    }

    const eventForApi = {
      title: event.title,
      start: new Date(event.start).toISOString(),
      end: new Date(event.end).toISOString(),
    };

    console.log('Sending update request:', { id: eventId, ...eventForApi });

    const response = await fetch(`${BASE_URL}/${eventId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(eventForApi),
    });

    if (!response.ok) {
      throw new Error(`Failed to update event: ${response.statusText}`);
    }

    const updatedEvent = await response.json();
    return {
      ...updatedEvent,
      id: updatedEvent._id || updatedEvent.id,
      start: new Date(updatedEvent.start),
      end: new Date(updatedEvent.end)
    };
  } catch (error) {
    console.error('Error updating event:', error);
    throw error;
  }
};

export const addEvent = async (event) => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...event,
        start: event.start.toISOString(),
        end: event.end.toISOString(),
      }),
    });
    const newEvent = await response.json();
    return {
      ...newEvent,
      start: new Date(newEvent.start),
      end: new Date(newEvent.end)
    };
  } catch (error) {
    console.error('Error adding event:', error);
    throw error;
  }
};

export const deleteEvent = async (eventId) => {
  try {
    await fetch(`${BASE_URL}/${eventId}`, {
      method: 'DELETE',
    });
  } catch (error) {
    console.error('Error deleting event:', error);
    throw error;
  }
};

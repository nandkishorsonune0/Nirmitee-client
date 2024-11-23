import React from "react";
import moment from "moment";
import "./EventList.css";

const EventList = ({ events }) => {
  const todayEvents = events.filter((event) =>
    moment(event.start).isSame(new Date(), "day")
  );

  return (
    <div className="event-list-container">
      <h2 className="event-list-title">Upcoming Events</h2>
      <ul className="event-list-group">
        {todayEvents.length > 0 ? (
          todayEvents.map((event) => (
            <li key={event.id} className="event-list-item">
              <strong>{event.title}</strong>
              <br />
              <span>
                {moment(event.start).format("h:mm A")} -{" "}
                {moment(event.end).format("h:mm A")}
              </span>
            </li>
          ))
        ) : (
          <li className="event-list-item text-center text-muted">
            No events today!
          </li>
        )}
      </ul>
    </div>
  );
};

export default EventList;

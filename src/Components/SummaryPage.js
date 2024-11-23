import React from "react";
import moment from "moment";
import "./SummaryPage.css";

const SummaryPage = ({ events }) => {
  const todayEvents = events.filter(event => 
    moment(event.start).isSame(new Date(), 'day')
  );

  const upcomingEvents = events.filter(event => 
    moment(event.start).isAfter(new Date())
  ).slice(0, 5);

  return (
    <div className="summary-container">
      <h2 className="summary-header">Summary</h2>
      
      <div className="summary-stats">
        <div className="stat-card">
          <div className="stat-number">{todayEvents.length}</div>
          <div className="stat-label">Today's Events</div>
        </div>
        <div className="stat-card">
          <div className="stat-number">{upcomingEvents.length}</div>
          <div className="stat-label">Upcoming</div>
        </div>
      </div>

      <div className="upcoming-events">
        <h3>Next Events</h3>
        {upcomingEvents.map(event => (
          <div key={event.id} className="upcoming-event-item">
            <div className="event-dot"></div>
            <div className="event-info">
              <div className="event-title">{event.title}</div>
              <div className="event-date">
                {moment(event.start).format('MMM D, h:mm A')}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SummaryPage;

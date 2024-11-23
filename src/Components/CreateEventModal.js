import React from "react";
import "./CreateEventModal.css";

const CreateEventModal = ({
  showModal,
  newEvent,
  handleInputChange,
  handleSubmitNewEvent,
  closeModal,
}) => {
  if (!showModal) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Create New Appointment</h3>
          <button className="close-button" onClick={closeModal}>×</button>
        </div>
        <div className="modal-body">
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={newEvent.title}
              onChange={handleInputChange}
              className="form-control"
              placeholder="Enter appointment title"
            />
          </div>
          <div className="form-group">
            <label>Start Date & Time</label>
            <input
              type="datetime-local"
              name="start"
              value={newEvent.start}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
          <div className="form-group">
            <label>End Date & Time</label>
            <input
              type="datetime-local"
              name="end"
              value={newEvent.end}
              onChange={handleInputChange}
              className="form-control"
            />
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn-cancel" onClick={closeModal}>
            Cancel
          </button>
          <button className="btn-save" onClick={handleSubmitNewEvent}>
            Save Appointment
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateEventModal;

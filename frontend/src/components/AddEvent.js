import React, { useState } from 'react';
import Modal from 'react-modal'; // ✅ Import modal library

Modal.setAppElement('#root'); // Ensure accessibility

export const AddEventForm = ({ isOpen, onRequestClose, onSubmit, selectedDate }) => {
  const [title, setTitle] = useState("");
  const [time, setTime] = useState("12:00"); // ✅ Default time
  const [duration, setDuration] = useState(60); // ✅ Default duration
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !time) {
      alert("Please fill in all required fields.");
      return;
    }
    
    const newEvent = {
      title,
      date: selectedDate, // ✅ Set selected date from calendar
      time: `${time}:00`, // ✅ Convert to HH:MM:SS format
      duration: parseInt(duration, 10),
      description,
    };

    onSubmit(newEvent);
    onRequestClose(); // Close modal after submission
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onRequestClose={onRequestClose} 
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" 
      overlayClassName="overlay"
    >
      <div className="p-4 bg-white rounded-xl shadow-md w-96">
        <h2 className="text-lg font-bold">Add Event on {selectedDate}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="block p-2 border rounded w-full" />
          </label>
          <label>
            Time:
            <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required className="block p-2 border rounded w-full" />
          </label>
          <label>
            Duration (minutes):
            <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} required className="block p-2 border rounded w-full" />
          </label>
          <label>
            Description:
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="block p-2 border rounded w-full" />
          </label>
          <button type="submit" className="mt-2 bg-blue-600 text-white px-4 py-2 rounded w-full">Add Event</button>
        </form>
        <button onClick={onRequestClose} className="mt-2 bg-red-600 text-white px-4 py-2 rounded w-full">Cancel</button>
      </div>
    </Modal>
  );
};

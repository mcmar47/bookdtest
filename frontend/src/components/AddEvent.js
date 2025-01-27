import React, { useState } from 'react';

export const AddEventForm = ({ onSubmit }) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("12:00"); // ✅ Default time
  const [duration, setDuration] = useState(60); // ✅ Default duration
  const [description, setDescription] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !date || !time) {
      alert("Please fill in all required fields.");
      return;
    }
    
    const newEvent = {
      title,
      date,
      time: `${time}:00`, // ✅ Convert to HH:MM:SS format
      duration: parseInt(duration, 10),
      description,
    };

    onSubmit(newEvent); // ✅ Send event data to parent component
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 border rounded">
      <label>
        Title:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="block p-2 border rounded" />
      </label>
      <label>
        Date:
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required className="block p-2 border rounded" />
      </label>
      <label>
        Time:
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required className="block p-2 border rounded" />
      </label>
      <label>
        Duration (minutes):
        <input type="number" value={duration} onChange={(e) => setDuration(e.target.value)} required className="block p-2 border rounded" />
      </label>
      <label>
        Description:
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="block p-2 border rounded" />
      </label>
      <button type="submit" className="mt-2 bg-blue-600 text-white px-4 py-2 rounded">Add Event</button>
    </form>
  );
};

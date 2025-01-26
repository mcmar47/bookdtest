import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { requestBooking } from '../services/api';

function BookingRequestForm() {
  const { venueId } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ date: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    requestBooking(venueId, formData)
      .then(() => {
        alert('Booking request sent!');
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
        alert('Error sending booking request.');
      });
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-xl shadow max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Request Booking</h2>
      <label className="block mb-2 font-medium">Date</label>
      <input
        type="date"
        className="p-2 border rounded mb-4 w-full"
        value={formData.date}
        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        required
      />

      <label className="block mb-2 font-medium">Message</label>
      <textarea
        className="p-2 border rounded mb-4 w-full"
        rows={4}
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        required
      />

      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Send Request
      </button>
    </form>
  );
}

export default BookingRequestForm;

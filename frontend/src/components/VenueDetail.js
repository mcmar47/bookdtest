import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getVenueDetail, getEvents, addEvent } from '../services/api';  
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { AddEventForm } from './AddEvent';  // ✅ Import the form

function VenueDetail() {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();
  const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

  useEffect(() => {
    getVenueDetail(id)
      .then(response => setVenue(response.data))
      .catch(error => console.log(error));

    getEvents(id)  // ✅ Fetch events when page loads
      .then(response => {
        console.log("Fetched events:", response);  // ✅ Debug log
        setEvents(response);
      })
      .catch(error => console.log("Error fetching events:", error));
  }, [id]);

  // ✅ Function to handle event submission from the form
  const handleAddEvent = (newEvent) => {
    addEvent({ ...newEvent, venueId: id }) // ✅ Ensure venueId is added
      .then(() => setEvents((prevEvents) => [...prevEvents, newEvent]))
      .catch((error) => console.error("Error adding event:", error));
  };

  if (!venue) return <p>Loading...</p>;

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="text-xl font-bold">{venue.name}</h2>
      <p>{venue.address}</p>
      <p>Capacity: {venue.capacity}</p>
      <p>Price: ${venue.price_per_event}</p>
      
      <div className="mt-4">
        <iframe
          width="100%"
          height="300"
          frameBorder="0"
          style={{ border: 0 }}
          src={`https://www.google.com/maps/embed/v1/place?key=${googleMapsApiKey}&q=${encodeURIComponent(venue.address)}`}
          allowFullScreen
        ></iframe>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold">Event Calendar</h3>
        {/* ✅ AddEventForm placed here */}
        <AddEventForm onSubmit={handleAddEvent} /> 

        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
        />
      </div>

      <button
        onClick={() => navigate(`/booking-request/${venue.id}`)}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
      >
        Request Booking
      </button>
    </div>
  );
}

export default VenueDetail;

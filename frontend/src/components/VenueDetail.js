import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getVenues } from '../services/api';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { addEvent, getEvents } from '../services/api';

function VenueList() {
  const [venues, setVenues] = useState([]);
  const [filters, setFilters] = useState({ location: '', size: '' });
  const [events, setEvents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getVenues()
      .then(response => setVenues(response.data))
      .catch(error => console.log(error));
    getEvents()
      .then(response => setEvents(response.data))
      .catch(error => console.log(error));
  }, []);

  const handleDetails = (id) => {
    navigate(`/venue/${id}`);
  };

  const handleDateClick = (arg) => {
    const title = prompt('Enter event title:');
    if (title) {
      const newEvent = { title, start: arg.dateStr };
      addEvent(newEvent)
        .then(() => setEvents([...events, newEvent]))
        .catch(error => console.log(error));
    }
  };

  const filteredVenues = venues.filter((venue) =>
    venue.address.toLowerCase().includes(filters.location.toLowerCase()) &&
    (filters.size ? venue.capacity >= parseInt(filters.size, 10) : true)
  );

  return (
    <div>
      {/* Header row with page title and Add Venue button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Venues</h2>
        <Link
          to="/add-venue"
          className="px-4 py-2 bg-green-600 text-white rounded"
        >
          Add Venue
        </Link>
      </div>

      {/* Simple filter inputs */}
      <div className="mb-4 space-x-2">
        <input
          type="text"
          placeholder="Location"
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
          className="p-2 border rounded"
        />
        <input
          type="number"
          placeholder="Min Capacity"
          value={filters.size}
          onChange={(e) => setFilters({ ...filters, size: e.target.value })}
          className="p-2 border rounded"
        />
      </div>

      {/* Venue listing */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredVenues.map((venue) => (
          <div key={venue.id} className="bg-white rounded-xl shadow p-4">
            <h3 className="text-lg font-semibold">{venue.name}</h3>
            <p>{venue.address}</p>
            <p>Capacity: {venue.capacity}</p>
            <p>Price: ${venue.price_per_event}</p>
            <button
              onClick={() => handleDetails(venue.id)}
              className="mt-3 px-4 py-2 bg-blue-600 text-white rounded"
            >
              View Details
            </button>
          </div>
        ))}
      </div>

      {/* Calendar Integration */}
      <div className="mt-6 p-4 bg-white rounded-xl shadow">
        <h3 className="text-lg font-bold">Event Calendar</h3>
        <FullCalendar
          plugins={[dayGridPlugin, interactionPlugin]}
          initialView="dayGridMonth"
          events={events}
          dateClick={handleDateClick}
        />
      </div>
    </div>
  );
}

export default VenueList;

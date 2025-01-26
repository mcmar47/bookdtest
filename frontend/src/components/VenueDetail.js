import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getVenueDetail } from '../services/api';

function VenueDetail() {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    getVenueDetail(id)
      .then(response => setVenue(response.data))
      .catch(error => console.log(error));
  }, [id]);

  if (!venue) return <p>Loading...</p>;

  return (
    <div className="bg-white p-4 rounded-xl shadow">
      <h2 className="text-xl font-bold">{venue.name}</h2>
      <p>{venue.address}</p>
      <p>Capacity: {venue.capacity}</p>
      <p>Price: ${venue.price_per_event}</p>
      <button
        onClick={() => navigate(`/booking-request/\${venue.id}`)}
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded"
      >
        Request Booking
      </button>
    </div>
  );
}

export default VenueDetail;

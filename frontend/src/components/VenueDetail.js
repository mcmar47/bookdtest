import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getVenueDetail } from '../services/api';

function VenueDetail() {
  const { id } = useParams();
  const [venue, setVenue] = useState(null);
  const navigate = useNavigate();
  const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  

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
      <div className="mt-4">
        <iframe
          width="100%"
          height="300"
          frameBorder="0"
          style={{ border: 0 }}
          src={`https://www.google.com/maps/embed/v1/place?key={googleMapsApiKey}&q=${encodeURIComponent(venue.address)}`}
          allowFullScreen
        ></iframe>
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

import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { addVenue, getVenueDetail, updateVenue } from '../services/api';

function VenueForm() {
  const { id } = useParams();         // Will be undefined if we are creating
  const navigate = useNavigate();
  
  const [venueData, setVenueData] = useState({
    name: '',
    address: '',
    capacity: '',
    price_per_event: ''
  });

  // If editing, load existing data
  useEffect(() => {
    if (id) {
      getVenueDetail(id)
        .then(response => {
          setVenueData({
            name: response.data.name,
            address: response.data.address,
            capacity: response.data.capacity,
            price_per_event: response.data.price_per_event
          });
        })
        .catch(err => console.log(err));
    }
  }, [id]);

  const handleChange = (e) => {
    setVenueData({
      ...venueData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
	

    const formattedData = {
      name: venueData.name,
      address: venueData.address,
      capacity: Number(venueData.capacity),  // ✅ Convert to a number
      price_per_event: Number(venueData.price_per_event) // ✅ Convert to a number
    };

    console.log("🔍 Corrected Data Being Sent:", JSON.stringify(formattedData, null, 2));

    try {
      const response = await addVenue(formattedData);
      console.log("✅ Server Response:", response);
      alert("Venue created successfully!");
      navigate('/'); // Redirect back to venue list
    } catch (error) {
      console.error("❌ API Error:", error.response?.data || error.message);
      alert("⚠️ Failed to create venue. Check the console for details.");
    }
  };


  return (
    <div className="bg-white p-4 rounded-xl shadow max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">
        {id ? 'Edit Venue' : 'Add Venue'}
      </h2>

      <form onSubmit={handleSubmit}>
        <label className="block mb-2 font-medium">Name</label>
        <input
          type="text"
          name="name"
          value={venueData.name}
          onChange={handleChange}
          className="p-2 border rounded mb-4 w-full"
          required
        />

        <label className="block mb-2 font-medium">Address</label>
        <textarea
          name="address"
          value={venueData.address}
          onChange={handleChange}
          className="p-2 border rounded mb-4 w-full"
          required
        />

        <label className="block mb-2 font-medium">Capacity</label>
        <input
          type="number"
          name="capacity"
          value={venueData.capacity}
          onChange={handleChange}
          className="p-2 border rounded mb-4 w-full"
          required
        />

        <label className="block mb-2 font-medium">Price Per Event</label>
        <input
          type="number"
          step="0.01"
          name="price_per_event"
          value={venueData.price_per_event}
          onChange={handleChange}
          className="p-2 border rounded mb-4 w-full"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {id ? 'Update Venue' : 'Create Venue'}
        </button>
      </form>
    </div>
  );
}

export default VenueForm;

import os
import zipfile

# Define the file structure and contents for the React frontend:
file_structure = {
    "my-frontend": {
        "package.json": """{
  "name": "music-venue-frontend",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.14.1",
    "axios": "^1.3.5",
    "tailwindcss": "^3.3.2",
    "postcss": "^8.4.21",
    "autoprefixer": "^10.4.14",
    "framer-motion": "^10.12.5"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build"
  }
}
""",
        "postcss.config.js": """module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer')
  ]
};
""",
        "tailwind.config.js": """/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
""",
        "src": {
            "index.js": """import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
""",
            "index.css": """@tailwind base;
@tailwind components;
@tailwind utilities;
""",
            "App.js": """import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import VenueList from './components/VenueList';
import VenueDetail from './components/VenueDetail';
import BookingRequestForm from './components/BookingRequestForm';
import Messaging from './components/Messaging';

function App() {
  return (
    <BrowserRouter>
      <motion.div
        className=\"min-h-screen bg-gray-100\"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <header className=\"p-4 bg-gray-800 text-white\">
          <h1 className=\"text-2xl font-bold\">Music Artist & Venue Connector</h1>
        </header>
        <main className=\"p-4\">
          <Routes>
            <Route path=\"/\" element={<VenueList />} />
            <Route path=\"/venue/:id\" element={<VenueDetail />} />
            <Route path=\"/booking-request/:venueId\" element={<BookingRequestForm />} />
            <Route path=\"/messaging\" element={<Messaging />} />
          </Routes>
        </main>
      </motion.div>
    </BrowserRouter>
  );
}

export default App;
""",
            "services": {
                "api.js": """import axios from 'axios';

// Change this to match your Django backend URL
const API_URL = 'http://localhost:8000/api';

export const getVenues = async () => {
  return axios.get(\`\${API_URL}/venues/\`);
};

export const getVenueDetail = async (id) => {
  return axios.get(\`\${API_URL}/venues/\${id}/\`);
};

export const requestBooking = async (venueId, data) => {
  return axios.post(\`\${API_URL}/bookings/\`, {
    venue: venueId,
    date: data.date,
    message: data.message
  });
};

export const getMessages = async () => {
  return axios.get(\`\${API_URL}/messages/\`);
};

export const sendMessageApi = async (msg) => {
  return axios.post(\`\${API_URL}/messages/\`, msg);
};
"""
            },
            "components": {
                "VenueList.js": """import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getVenues } from '../services/api';

function VenueList() {
  const [venues, setVenues] = useState([]);
  const [filters, setFilters] = useState({ location: '', size: '' });
  const navigate = useNavigate();

  useEffect(() => {
    getVenues()
      .then(response => {
        setVenues(response.data);
      })
      .catch(error => console.log(error));
  }, []);

  const handleDetails = (id) => {
    navigate(`/venue/\${id}`);
  };

  return (
    <div>
      <h2 className=\"text-xl font-bold mb-4\">Venues</h2>
      <div className=\"mb-4 space-x-2\">
        <input
          type=\"text\"
          placeholder=\"Location\"
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
          className=\"p-2 border rounded\"
        />
        <input
          type=\"text\"
          placeholder=\"Size\"
          value={filters.size}
          onChange={(e) => setFilters({ ...filters, size: e.target.value })}
          className=\"p-2 border rounded\"
        />
      </div>
      <div className=\"grid grid-cols-1 md:grid-cols-2 gap-4\">
        {venues.map((venue) => (
          <div key={venue.id} className=\"bg-white rounded-xl shadow p-4\">
            <h3 className=\"text-lg font-semibold\">{venue.name}</h3>
            <p>{venue.address}</p>
            <p>Capacity: {venue.capacity}</p>
            <p>Price: ${venue.price_per_event}</p>
            <button
              onClick={() => handleDetails(venue.id)}
              className=\"mt-3 px-4 py-2 bg-blue-600 text-white rounded\"
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VenueList;
""",
                "VenueDetail.js": """import React, { useEffect, useState } from 'react';
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
    <div className=\"bg-white p-4 rounded-xl shadow\">
      <h2 className=\"text-xl font-bold\">{venue.name}</h2>
      <p>{venue.address}</p>
      <p>Capacity: {venue.capacity}</p>
      <p>Price: ${venue.price_per_event}</p>
      <button
        onClick={() => navigate(`/booking-request/\${venue.id}`)}
        className=\"mt-4 bg-green-600 text-white px-4 py-2 rounded\"
      >
        Request Booking
      </button>
    </div>
  );
}

export default VenueDetail;
""",
                "BookingRequestForm.js": """import React, { useState } from 'react';
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
    <form onSubmit={handleSubmit} className=\"bg-white p-4 rounded-xl shadow max-w-md mx-auto\">
      <h2 className=\"text-xl font-bold mb-4\">Request Booking</h2>
      <label className=\"block mb-2 font-medium\">Date</label>
      <input
        type=\"date\"
        className=\"p-2 border rounded mb-4 w-full\"
        value={formData.date}
        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
        required
      />

      <label className=\"block mb-2 font-medium\">Message</label>
      <textarea
        className=\"p-2 border rounded mb-4 w-full\"
        rows={4}
        value={formData.message}
        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
        required
      />

      <button type=\"submit\" className=\"bg-blue-600 text-white px-4 py-2 rounded\">
        Send Request
      </button>
    </form>
  );
}

export default BookingRequestForm;
""",
                "Messaging.js": """import React, { useState, useEffect } from 'react';
import { getMessages, sendMessageApi } from '../services/api';

function Messaging() {
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState('');

  useEffect(() => {
    getMessages()
      .then(response => setMessages(response.data))
      .catch(error => console.log(error));
  }, []);

  const handleSend = () => {
    const msgObj = {
      // Adjust fields to match your backend
      sender: 1, // placeholder user ID
      recipient: 2, // placeholder user ID
      content
    };
    sendMessageApi(msgObj)
      .then(res => {
        setMessages([...messages, res.data]);
        setContent('');
      })
      .catch(err => console.log(err));
  };

  return (
    <div className=\"bg-white p-4 rounded-xl shadow\">
      <h2 className=\"text-xl font-bold mb-4\">Messaging</h2>
      <div className=\"mb-4 space-y-2 max-h-64 overflow-auto\">
        {messages.map((m, idx) => (
          <div key={idx} className=\"p-2 border rounded\">
            <p><strong>{m.sender}</strong>: {m.content}</p>
          </div>
        ))}
      </div>
      <div className=\"flex space-x-2\">
        <input
          type=\"text\"
          className=\"flex-grow border p-2 rounded\"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder=\"Type your message...\"
        />
        <button onClick={handleSend} className=\"bg-blue-600 text-white px-4 py-2 rounded\">
          Send
        </button>
      </div>
    </div>
  );
}

export default Messaging;
"""
            }
        }
    }
}

def create_zip(zip_filename="my_frontend.zip"):
    """
    Creates a ZIP file with the React frontend structure
    """
    with zipfile.ZipFile(zip_filename, "w", zipfile.ZIP_DEFLATED) as zf:
        for folder, files in file_structure.items():
            for filename, content in files.items():
                # if content is a dict, it indicates sub-folders
                if isinstance(content, dict):
                    # create subfolder structure
                    for subfile, subcontent in content.items():
                        # handle deeper nesting
                        if isinstance(subcontent, dict):
                            # another nested dict
                            for subsubfile, subsubcontent in subcontent.items():
                                if isinstance(subsubcontent, dict):
                                    # even deeper nesting
                                    pass
                                else:
                                    subsub_path = f"{folder}/{filename}/{subfile}/{subsubfile}"
                                    zf.writestr(subsub_path, subsubcontent)
                        else:
                            sub_path = f"{folder}/{filename}/{subfile}"
                            zf.writestr(sub_path, subcontent)
                else:
                    # top-level file
                    file_path = f"{folder}/{filename}"
                    zf.writestr(file_path, content)

    print(f"Created {zip_filename} successfully.")

if __name__ == "__main__":
    create_zip()

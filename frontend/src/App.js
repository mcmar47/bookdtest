import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import VenueList from './components/VenueList';
import VenueDetail from './components/VenueDetail';
import BookingRequestForm from './components/BookingRequestForm';
import Messaging from './components/Messaging';
import VenueForm from './components/VenueForm';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Profile';

function App() {
  return (
    <BrowserRouter>
      <motion.div
        className="min-h-screen bg-gray-100"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* ✅ Add a Navbar */}
        <header className="p-4 bg-gray-800 text-white flex justify-between">
          <h1 className="text-2xl font-bold">Music Artist & Venue Connector</h1>
          <nav className="space-x-4">
            <Link to="/" className="text-white hover:underline">Home</Link>
            <Link to="/add-venue" className="text-white hover:underline">Add Venue</Link>
            <Link to="/login" className="text-white hover:underline">Login</Link>
            <Link to="/register" className="text-white hover:underline">Register</Link>
            <Link to="/profile" className="text-white hover:underline">Profile</Link>
          </nav>
        </header>

        <main className="p-4">
          <Routes>
            {/* Venue-related routes */}
            <Route path="/" element={<VenueList />} />
            <Route path="/venue/:id" element={<VenueDetail />} />
            <Route path="/booking-request/:venueId" element={<BookingRequestForm />} />
            <Route path="/messaging" element={<Messaging />} />
            <Route path="/add-venue" element={<VenueForm />} />
            <Route path="/edit-venue/:id" element={<VenueForm />} />

            {/* Authentication routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </motion.div>
    </BrowserRouter>
  );
}

export default App;

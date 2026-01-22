import React from 'react'
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Contact from './pages/Contact.jsx'
import SignUp from './pages/SignUp.jsx'
import Login from './pages/Login.jsx'
import BookAppointment from './pages/BookAppointment.jsx'
import Appointment from './pages/Appointment.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Navbar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Define which path shows which component */}
          
        <Route path="/" element={<Home />} />
          
        <Route path="/contact" element={<Contact />} />
          
        <Route path="/sign-up" element={<SignUp />} />
          
        <Route path="/login" element={<Login />} />

        <Route path="/book" element={
          <ProtectedRoute>
            <BookAppointment />
          </ProtectedRoute>
        } />

        <Route path="/appointments" element={
          <ProtectedRoute>
            <Appointment />
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;

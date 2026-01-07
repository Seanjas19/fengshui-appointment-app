import React, { useState } from "react";
import api from "../api/axios";

const BookAppointment = () => {
    const [formData, setFormData] = useState({
        appointment_date: "",
        service_type: "Home Audit", // Default value
        user_message: ""
    });
    const [status, setStatus] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus("Processing...");

        try {
            const response = await api.post("/appointment", formData);
            setStatus("Success! Your appointment is booked.");
            
            // Optional: Clear form after success
            setFormData({ appointment_date: "", service_type: "Home Audit", user_message: "" });
            
            window.location.href = "/appointments"
        } catch (err) {
            setStatus(err.response?.data?.message || "Failed to book appointment.");
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '20px auto' }}>
            <h2>Book a Feng Shui Consultation</h2>
            {status && <p>{status}</p>}
            
            <form onSubmit={handleSubmit}>
                <label>Date:</label><br />
                <input 
                    type="date" 
                    required
                    value={formData.appointment_date}
                    onChange={(e) => setFormData({...formData, appointment_date: e.target.value})}
                /><br /><br />

                <label>Service Type:</label><br />
                <select 
                    value={formData.service_type}
                    onChange={(e) => setFormData({...formData, service_type: e.target.value})}
                >
                    <option value="Home Audit">Home Audit</option>
                    <option value="Office Consultation">Office Consultation</option>
                    <option value="Personal Bazi Reading">Personal Bazi Reading</option>
                </select><br /><br />

                <label>Message (Optional):</label><br />
                <textarea 
                    value={formData.user_message}
                    onChange={(e) => setFormData({...formData, user_message: e.target.value})}
                /><br /><br />

                <button type="submit">Confirm Booking</button>
            </form>
        </div>
    );
};

export default BookAppointment;
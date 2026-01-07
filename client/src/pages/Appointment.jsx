import React, { useState, useEffect } from 'react';
import api from "../api/axios";

const Appointment = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                // Use 'api' so the interceptor sends your token!
                const response = await api.get('/appointment');
                setAppointments(response.data);
            } catch (err) {
                console.error("Error fetching appointments:", err);
            } finally {
                setLoading(false); 
            }
        };
        fetchAppointments();
    }, []);

    const handleDelete = async (id) => {
        if (!window.confirm("Cancel this appointment?")) return;
        try {
            // Check spelling: /appointment/ or /appoinment/?
            await api.delete(`/appointment/${id}`);
            setAppointments(appointments.filter(appt => appt.id !== id));
        } catch (err) {
            console.error("Delete failed:", err);
        }
    };
    
    if (loading) return <p>Loading your appointments...</p>;

    return (
        <div>
            <h1>My Feng Shui Appointments</h1>
            {appointments.length === 0 ? (
                <p>No appointments found. Book one today!</p>
            ) : (
                <table border="1" style={{ width: '100%', textAlign: 'left' }}>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Service</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {appointments.map((appt) => (
                            <tr key={appt.id}>
                                <td>{appt.appointment_date}</td>
                                <td>{appt.service_type}</td>
                                <td>{appt.status}</td>
                                <td>
                                    <button 
                                        onClick={() => handleDelete(appt.id)} 
                                        style={{ color: 'red', cursor: 'pointer'}}
                                    >
                                        Cancel
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};   

export default Appointment;
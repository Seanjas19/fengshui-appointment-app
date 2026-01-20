const express = require("express");
const cors = require("cors");
const db = require("./db");
const authorize = require("./middleware/authorization.js");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes.js"));

const PORT = process.env.PORT || 5000;

//To know server is running
app.get("/", (req, res) => {
    res.send("Feng Shui Server is Running");
});


//Let user to see their booking
app.get("/api/appointment", authorize, async (req, res) => {
    try{
        const get_appointments = await db.query("SELECT * FROM appointments WHERE user_id = $1", [req.user]);

        res.status(200).json({
            message: "Appointment Retrieved Successfully!",
            appointments: get_appointments.rows
        });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
});




//Let non-member user to create contact
app.post("/api/contact", async (req, res) => {
    try{
        //Extract Contact data from Request Body
        const {contact_name, contact_email, contact_phone, contact_message} = req.body;

        //Insert Contact data to Database. Why contacts(...) because if don't put it will assume contact_id as $1 and all the data for insertion will crash and messy
        const newContact = await db.query(
            "INSERT INTO contacts(contact_name, contact_email, contact_phone, contact_message) VALUES ($1, $2, $3, $4) RETURNING *",
            [contact_name, contact_email, contact_phone, contact_message]
        );
        
        //pass successful message to browser 
        res.status(201).json({
            message: "Message sent successfully!",
            data: newContact.rows[0]
        });

    }
    //if error it will response status as "Internal Server Error"
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }

});


//let authorized user to book their appointment
app.post("/api/appointment", authorize, async (req, res) => {

    try{

        console.log("DEBUG 1 : User ID from Token:", req.user);

        console.log("DEBUG 2 : Appointment Data Received:", req.body);

        console.log("DEBUG 3 : ID being sent to SQL:", req.user);

        const {appointment_date, appointment_status, service_type, user_message} = req.body;

        const selectedDate = new Date(appointment_date);
        const today = new Date();
        today.setUTCHours(0, 0, 0, 0);
        selectedDate.setUTCHours(0, 0, 0, 0);

        if (selectedDate <= today) {
            return res.status(400).json({message: "You cannot book an appointment in the past!"});
        }

        const newAppointment = await db.query(
            "INSERT INTO appointments(user_id, appointment_date, appointment_status, service_type, user_message) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            [req.user, appointment_date, appointment_status, service_type, user_message]
        );
        
        console.log("DEBUG 4 : New Appointment save in SQL:", newAppointment.rows[0]);

        res.status(201).json({
            message: "Appointment Successful",
            appointment: newAppointment.rows[0]
        })

    }
    catch (err) {
        console.error(err.message);
        return res.status(500).send("Server Error");
    }
});

app.delete("/api/appointment/:id", authorize, async(req, res) => {
    try {
        const {id} = req.params;

        const user_id = req.user;

        const del_appointment = await db.query("DELETE FROM appointments WHERE appointment_id = $1 AND user_id = $2 RETURNING *", [id, user_id]);

        if (del_appointment.rows.length === 0) {
            return res.status(404).json({ message: "Appointment not found or unauthorized" });
        }
        
        res.status(200).json({message: "Appointment Cancelled Successfully!"});
    }
    catch (err) {
        console.error(err.message);
        return res.status(500).send("Server Error");
    }
});

app.put("/api/appointment/:id", authorize, async(req, res) => {
    try {

        const { id } = req.params;
        const { appointment_date, service_type, user_message } = req.body;

        const selectedDate = new Date(appointment_date);
        const today = new Date();
        today.setUTCHours(0, 0, 0, 0);
        selectedDate.setUTCHours(0, 0, 0, 0);

        if (selectedDate <= today) {
            return res.status(400).json({ message: "You cannot book an appointment in the past or for today!" });
        }

        const updateData = await db.query(
            "UPDATE appointments SET appointment_date = $1, service_type = $2, user_message = $3 WHERE appointment_id = $4 AND user_id = $5 RETURNING *",
            [appointment_date, service_type, user_message, id, req.user]
        );

        if (updateData.rows.length === 0) {
            return res.status(404).json({ message: "Appointment not found or unauthorized" });
        }

        res.json({ message: "Appointment Updated Successfully!" });
    } 
    catch (err) {
        console.error(err.message);
        res.status(500).send("Server Error");
    }
})

//Backend is listen to which PORT 
app.listen(PORT, () => {
    console.log(`Server is Running on port ${PORT}`);
});


const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');
const http = require('http');
const socketIO = require('socket.io');

const patientRouter = require("./src/routers/patientRouter");
const doctorRouter = require("./src/routers/doctorRouter");
const appRouter = require("./src/routers/appointmentRouter");
const AppointmentSchema = require('./src/Schemas/Appointment.schema');
const handleAppointmentsChanges = require('./src/middleware/handleAppointmentsChanges');
const PatientSchema = require('./src/Schemas/Patient.schema');
const DoctorSchema = require('./src/Schemas/Doctor.schema');
const path = require('path');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIO(server, {
    cors: {
      origin: 'http://localhost:5173',
      methods: ['GET', 'POST'],
    },
});


app.use(express.static(path.join(__dirname + "/dist")));
app.use(express.json());
app.use(cors());


app.use(patientRouter);
app.use(doctorRouter);
app.use(appRouter);


const start = async() => {
    try {
        await mongoose.connect(process.env.MONGODB_URL || MONGODB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        app.get('/secondPage', (req, res) => {
            res.sendFile(path.join(__dirname, 'dist', 'index.html'));
        });

        const db = mongoose.connection.db;
        const collection = db.collection("appointments");

        await handleAppointmentsChanges(collection, io, AppointmentSchema);
        
        server.listen(process.env.PORT || 3000);
    } catch (err) {
        console.log("Server not connected: ", err)
    }
}

start()







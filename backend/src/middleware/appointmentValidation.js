const { body } = require("express-validator");

const isTimeValid = (time) => {
    const regex = /^(0?[0-9]|1[0-9]|2[0-4])$/;
    if (regex.test(time) || time == null) return true;
    else return false;
}

const appointmentValidaton = [
    body("patientID", "Patient ID is invalid").isNumeric(),
    body("doctorID", "Doctor ID is invalid").isNumeric(),
    body("time", "Appointment time is invalid").custom(isTimeValid)
]

module.exports = appointmentValidaton;
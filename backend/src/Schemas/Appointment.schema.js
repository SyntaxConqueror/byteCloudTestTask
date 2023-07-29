const { Schema, model } = require("mongoose");

const Appointment = new Schema({
    patientID: {type: Schema.Types.Number, ref: "Patient", required: true},
    doctorID: {type: Schema.Types.Number, ref: "Doctor",  required: true},
    time: {type: String},
    originString: {type: String}
})

module.exports = model('Appointment', Appointment);
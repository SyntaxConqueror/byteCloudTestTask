const Router = require('express');
const patientRouter = new Router();

const Patient = require("../Schemas/Patient.schema");
const Appointment = require("../Schemas/Appointment.schema");
const Doctor = require("../Schemas/Doctor.schema");

const personValidation = require("../middleware/personValidation");
const { validationResult } = require('express-validator');

patientRouter.post("/patient", personValidation, async (req, res) => {
    try {
        // Validation tests
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.send({ invalid: req.body.originString });
        }

        // Patient data from request
        const data = req.body;
        // Searching for patient in DB
        const patientExist = await Patient.findById(data._id);
        
        if (patientExist) {
            return res.send({ duplicate: data.originString });
        }

        const patient = new Patient({
            _id: data._id,
            time: data.time,
            name: data.name || null,
            birthDay: data.birthDay || null,
            originString: data.originString
        });

        await patient.save();
        return res.send({success: data.originString });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error" });
    }
});

patientRouter.delete("/clearDB", async (req, res) => {
    try {
        const appointmentDeleteCount = await Appointment.deleteMany({});
        const patientDeleteCount = await Patient.deleteMany({});
        const doctorDeleteCount = await Doctor.deleteMany({});

        return res.send({
            appointmentDeleteCount: appointmentDeleteCount.deletedCount,
            patientDeleteCount: patientDeleteCount.deletedCount,
            doctorDeleteCount: doctorDeleteCount.deletedCount,
        });
    } catch (error) {
        console.error("Error clearing collections:", error);
        res.sendStatus(500);
    }
});

module.exports = patientRouter;
const Router = require('express');
const doctorRouter = new Router();
const Doctor = require("../Schemas/Doctor.schema");
const personValidation = require("../middleware/personValidation");
const {validationResult} = require("express-validator");

doctorRouter.post("/doctor", personValidation, async (req, res) => {
    try {
        // Validation tests
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.send({ invalid: req.body.originString });
        }

        const data = req.body;
        const doctorExist = await Doctor.findById(data._id);
        if (doctorExist) {
            return res.send({ duplicate: data.originString });
        }

        const doctor = new Doctor({
            _id: data._id,
            time: data.time,
            name: data.name || null,
            birthDay: data.birthDay || null,
            originString: data.originString
        });

        await doctor.save();
        return res.send({ success: data.originString });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error" });
    }
});

module.exports = doctorRouter;
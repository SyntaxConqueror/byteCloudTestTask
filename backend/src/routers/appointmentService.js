const Appointment = require("../Schemas/Appointment.schema");
const {validationResult} = require("express-validator");
const PatientSchema = require("../Schemas/Patient.schema");
const DoctorSchema = require("../Schemas/Doctor.schema");

class AppointmentService {

    constructor() {
        // Bind the context of 'this' to the methods
        this.create = this.create.bind(this);
        this.analyze = this.analyze.bind(this);
        this.findSimilarObjects = this.findSimilarObjects.bind(this);
        this.generateRedGreenGroupArrays = this.generateRedGreenGroupArrays.bind(this);
        this.checkMeetingSuit = this.checkMeetingSuit.bind(this);
    }

    async getAllApps(req, res) {
        return res.send(await Appointment.find({}));
    }

    async create(req, res) {
        try {
            // Validation tests
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                console.log(errors);
                return res.send({ invalid: req.body.originString });
            }
    
            const data = req.body;
            
            // Check if entities already exist in DB
            const appExist = await Appointment.findOne({patientID: data.patientID, doctorID: data.doctorID, time: data.time});
            
            if(data.originString.split(", ").length > 3){
                return res.send({ invalid: req.body.originString });
            }
    
            if (appExist) {
                return res.send({duplicate: data.originString});
            }
            
            const appointment = new Appointment({
                patientID: data.patientID,
                doctorID: data.doctorID,
                time: data.time || null,
                originString: data.originString
            });
    
            await appointment.save();
    
            return res.send({ success: data.originString });
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: "Server error" });
        }
    }

    async analyze(req, res) {
        try {
            const data = req.body;
            const result = await this.findSimilarObjects(data);
            
            return res.send(result);
        } catch (err) {
            console.log(err);
            return res.status(500).json({ message: "Server error" });
        }
    }

    async findSimilarObjects(inputArray) {
        const yellowArray = [];
        const redGreenArray = [];
    
        inputArray.forEach((obj1) => {
            const isMatch = inputArray.some((obj2) => {
                
                if (obj1 == obj2) return undefined;
                
                if (
                    (obj2.time === obj1.time && obj2.patientID === obj1.patientID) 
                    ||
                    (obj2.time === obj1.time && obj2.doctorID === obj1.doctorID)
                ) {
                    return true;
                }
    
                return false;  
            });
    
            if (isMatch) yellowArray.push(obj1);
            else redGreenArray.push(obj1);
        });
        
        const {redArray, greenArray} = await this.generateRedGreenGroupArrays(redGreenArray);

        return {
            yellowArray,
            redArray,
            greenArray
        };
    }

    checkMeetingSuit(intervalStr1, intervalStr2, givenNumber) {
        function parseTimeInterval(intervalStr, gNumber) {
          const [start, end] = intervalStr.split('-').map(Number);
          if(gNumber >= end || gNumber < start) return false;
          else return true;
        }
    
        const first = parseTimeInterval(intervalStr1, givenNumber);
        const second = parseTimeInterval(intervalStr2, givenNumber);
      
        return (first && second ? true : false);
    }

    async generateRedGreenGroupArrays(redGreenArray) {
        const redArray = [];
        const greenArray = [];
    
        for (const app of redGreenArray) {
            try {
                const patient = await PatientSchema.findById(app.patientID);
                const doctor = await DoctorSchema.findById(app.doctorID);
    
                if (patient === null || doctor === null) {
                    redArray.push(app);
                    continue;
                }

                const result = this.checkMeetingSuit(patient.time, doctor.time, app.time);
                if (result) greenArray.push(app);
                else redArray.push(app);

            } catch (err) {
                console.error(err);
            }
        }

        return { redArray, greenArray };
    }

}

module.exports = new AppointmentService();
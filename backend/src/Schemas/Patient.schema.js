const { Schema, model } = require("mongoose");

const Patient = new Schema({
    _id: {type: Number, required: true},
    time: {type: String, required: true},
    name: {type: String},
    birthDay: {type: String},
    originString: {type: String}
})

module.exports = model('Patient', Patient);
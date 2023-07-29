const { body } = require("express-validator");

const isTimeValid = (time) => {
    const regex = /^(0?[0-9]|1[0-9]|2[0-4])-(0?[0-9]|1[0-9]|2[0-4])$/;
    try {
        const hours = time.split("-");
        if(regex.test(time) && (Number(hours[0]) <= Number(hours[1]))){
            return true;
        }
    } catch (err) {
        return false;
    }
}

const isNameValid = (name) => {
    const regex = /^[a-zA-Z]+(?: [a-zA-Z]+)?$/;
    if(regex.test(name) || name == null) return true; 
    else return false;
}

const isBirthdayValid = (birthDay) => {
    const regex = /^(0[1-9]|1\d|2\d|3[01])\.(0[1-9]|1[0-2])\.\d{4}$/;
    if(regex.test(birthDay) || birthDay == null) return true;
    else return false;
}

const personValidation = [
    body("_id", "Person id is not a number").isNumeric(),
    body("time", "Person time is invalid").custom(isTimeValid),
    body("name", "Person name is invalid").custom(isNameValid),
    body("birthDay", "Person birthDay is invalid").custom(isBirthdayValid)
]

module.exports = personValidation;
const Router = require('express');
const appRouter = new Router();

const appointmentValidaton = require("../middleware/appointmentValidation");
const AppointmentService = require('./appointmentService');


appRouter.post("/appointment", appointmentValidaton, AppointmentService.create);

appRouter.post("/analyze", AppointmentService.analyze);

appRouter.get("/getAllApps", AppointmentService.getAllApps);

module.exports = appRouter;
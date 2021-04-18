const authJwt = require("../middleware/authJWT");
module.exports = app => {
    const individual_events = require("../controllers/individual_event.controller");

    var router = require("express").Router();

    router.post("/create", [authJwt.verifyToken], individual_events.create);
    router.get("/getById", [authJwt.verifyToken], individual_events.getById);
    router.patch("/update", [authJwt.verifyToken], individual_events.update);
    router.delete("/delete", [authJwt.verifyToken], individual_events.delete);
    router.get("/getAll", [authJwt.verifyToken], individual_events.getAll);
    router.get("/getAllEventsWithParticipatingAthlets", [authJwt.verifyToken], individual_events.getAllEventsWithParticipatingAthlets);
    router.patch("/setEventWinner", [authJwt.verifyToken], individual_events.setEventWinner);
    
    //router.post("/addAthletToEvent", individual_events.addAthletToEvent);

    app.use('/api/individual_events', router);

};
const authJwt = require("../middleware/authJWT");
module.exports = app => {
    const athlets_individual_events = require("../controllers/athlets_individual_event.controller");

    var router = require("express").Router();

    router.post("/addAthletToEvent", [authJwt.verifyToken], athlets_individual_events.create);
    router.delete("/deleteAthletFromEvent", [authJwt.verifyToken], athlets_individual_events.deleteAthletFromEvent);
    //router.get("/getAllEventsWithParticipatingAthlets", athlets_individual_events.getAllEventsWithParticipatingAthlets);

    
    //router.post("/addAthletToEvent", individual_events.addAthletToEvent);

    app.use('/api/athlets_individual_events', router);

};
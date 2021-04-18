const authJwt = require("../middleware/authJWT");
module.exports = app => {
    const athlets = require("../controllers/athlets.controller");

    var router = require("express").Router();

    router.post("/create", [authJwt.verifyToken], athlets.create);
    router.get("/getById", [authJwt.verifyToken], athlets.getById);
    router.patch("/update", [authJwt.verifyToken], athlets.update);
    router.delete("/delete", [authJwt.verifyToken], athlets.delete);
    router.get("/getAll", [authJwt.verifyToken], athlets.getAll);
    router.get("/getAllUnderInvestigation", [authJwt.verifyToken], athlets.getAllUnderInvestigation);

    router.get("/getAllEventsWithParticipatingAthlets", [authJwt.verifyToken], athlets.getAllEventsWithParticipatingAthlets);

    app.use('/api/athlets', router);

};
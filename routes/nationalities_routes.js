const authJwt = require("../middleware/authJWT");
module.exports = app => {
    const nationalities = require("../controllers/nationalities.controller");

    var router = require("express").Router();

    router.get("/getAll", [authJwt.verifyToken], nationalities.getAll);

    app.use('/api/nationalities', router);

};
//const { authJwt } = require("../middleware");
const controller = require("../controllers/user.controller");

const authJwt = require("../middleware/authJWT");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });



  app.get(
    "/api/test/user",
    [authJwt.verifyToken],
    controller.test
  );

  app.get(
    "/api/test/mod",
    [authJwt.verifyToken],
    controller.test
  );

  app.get(
    "/api/test/admin",
    [authJwt.verifyToken],
    controller.test
  );
};
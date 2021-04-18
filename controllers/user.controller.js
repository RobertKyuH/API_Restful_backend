const db = require("../models");
const User = db.users;

const Op = db.sequelize.Op;

const sing_up_code = "the_sport_association"

exports.test = (req, res) => {

    res.send("test");

};

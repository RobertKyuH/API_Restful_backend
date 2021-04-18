const db = require("../models");
const Nationality = db.nationalities;

const Op = db.sequelize.Op;

exports.create = (name) => {
    // create user
    const tempNationality = {
        name: name
    };
    console.log("***************");

    Nationality.create(tempNationality);

};

exports.getAll = async (req, res) => {
    await Nationality.findAll().then(data => {
        res.send(data);
    })
    .catch(err=> {
        res.status(500).send({
            status: "fail"
        });
    });
};
const { Sequelize, sequelize } = require(".");
const Athlet = require("./athlet.model");

module.exports = (sequelize, Sequelize) => {
    const Nationality = sequelize.define("nationalities", {
        name:{
            type: Sequelize.STRING
        }

    },
    {
        timestamps: false
    });

    //Nationality.hasMany(Athlet);



    return Nationality;
}
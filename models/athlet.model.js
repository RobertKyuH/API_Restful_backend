const { Sequelize, sequelize } = require(".");
const IndividualEvent = require("./individual_event.model");
const Nationality = require("./nationalities.model");
//const AthletsIndividualEvents = require("./athlets_individual_events");

module.exports = (sequelize, Sequelize) => {
    const Athlet = sequelize.define("athlet", {
        name:{
            type: Sequelize.STRING
        },
        surname:{
            type: Sequelize.STRING
        },
        sport_type:{
            type: Sequelize.STRING
        },
        under_investigation:{
            type: Sequelize.BOOLEAN
        }
        // TODO: lista eventow w ktorych bral udzial
    },
    {
        timestamps: false
    });

    return Athlet;
}
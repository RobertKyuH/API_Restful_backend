const { Sequelize, sequelize } = require(".");
const IndividualEvent = require("./individual_event.model");
const Nationality = require("./nationalities.model");
//const AthletsIndividualEvents = require("./athlets_individual_events");

module.exports = (sequelize, Sequelize) => {
    const AthletsIndividualEvents = sequelize.define("athlets_individual_events", {
    },
    {
        timestamps: false
    });

    return AthletsIndividualEvents;
}
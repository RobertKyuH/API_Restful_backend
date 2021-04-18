const { Sequelize, sequelize } = require(".");
const Athlet = require("./athlet.model");

module.exports = (sequelize, Sequelize) => {
    const IndividualEvent = sequelize.define("individual_event", {
        name:{
            type: Sequelize.STRING
        },
        sport_type:{
            type: Sequelize.STRING
        },
        beginning_date:{
            type: Sequelize.DATE
        },
        ending_date:{
            type: Sequelize.DATE
        },
        winner_athlet_id:{
            type: Sequelize.INTEGER
        }
    },
    {
        timestamps: false
    });

    //IndividualEvent.belongsToMany(Athlet, {through:"test"});



    return IndividualEvent;
}
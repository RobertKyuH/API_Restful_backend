const dbConfig = require("../db.config.js");

const Sequelize = require("sequelize");
const { dialect } = require("../db.config.js");

const IndividualEvent = require("../models/individual_event.model");
const Athlet = require("../models/athlet.model");
const { Model } = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    
    pool:{
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Importing models

db.users = require("../models/user.model")(sequelize, Sequelize);
db.athlets = require("../models/athlet.model")(sequelize, Sequelize);
db.nationalities = require("../models/nationalities.model")(sequelize, Sequelize);
db.individual_events = require("../models/individual_event.model")(sequelize, Sequelize);


db.athlets_individual_events = require("../models/athlets_individual_events.model")(sequelize, Sequelize);

// Making relations between models
db.nationalities.hasMany(db.athlets);
db.athlets.belongsTo(db.nationalities);

db.athlets.belongsToMany(db.individual_events, {
    through: "athlets_individual_events",
    as: "individual_events",
    foreignKey: "athlet_id"
});

db.individual_events.belongsToMany(db.athlets, {
    through: "athlets_individual_events",
    as: "athlets",
    foreignKey: "individual_event_id"
});

// initial data


module.exports = db;

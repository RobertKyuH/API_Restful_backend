const { Sequelize, sequelize  } = require(".");

module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("user", {
        email: {
            type: Sequelize.STRING,
            unqiue: true
        },
        password: {
            type: Sequelize.STRING,
            unique: true
        }
    },
    {
        timestamps: false
    });

    return User;
}
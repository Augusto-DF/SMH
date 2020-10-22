//Connection
const { sequelize, Sequelize } = require('./connection');

//User table
const User = sequelize.define('User', {
  //First Name
  userFirstName: {
    type: Sequelize.STRING,
    allowNull: false,
    defaltValue: false,
  },
  //Second Name
  userLastName: {
    type: Sequelize.STRING,
    allowNull: true,
    defaltValue: false,
  },

  userEmail: {
    type: Sequelize.STRING,
    allowNull: false,
    defaltValue: false,
    unique: true,
  },

  userPassword: {
    type: Sequelize.STRING,
    allowNull: false,
    defaltValue: false,
  },

  userNickName: {
    type: Sequelize.STRING,
    allowNull: false,
    defaltValue: false,
    unique: true,
  },
});

//User.sync({ force: true });
exports.module = User;

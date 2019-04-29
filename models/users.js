const Sequelize = require('sequelize');
const db = require('../db.js');

const users = db.sequelize.define(
	'users', {
		username: {
			type: Sequelize.STRING,
			primaryKey: true,
		}, 
		password: {
			type: Sequelize.STRING,
		}
	},{
			timestamps: false,
		}
)

module.exports = (sequelize, DataTypes)=>{return users};

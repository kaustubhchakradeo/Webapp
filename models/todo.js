const Sequelize = require('sequelize');
const db = require('../db.js');
const user = require('./users')

const todo = db.sequelize.define(
	'todos', {
			item: {
				type: Sequelize.STRING,
			}, priority: {
				type: Sequelize.INTEGER
			
			},username: {
				type: Sequelize.STRING,
				references: {
		                model: user(),           
            		    key: 'username',
            		  }
			}, no: {
			 type: Sequelize.INTEGER,
			 primaryKey: true,
			 autoIncrement: true
			} 
	},{
			timestamps: false,
	}
)

module.exports = (sequelize, DataTypes)=>{return todo};

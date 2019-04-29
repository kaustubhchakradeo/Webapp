const Sequelize = require('sequelize');
const db ={};

/*const sequelize = new Sequelize('webapp', 'postgres', 'booo', {
  host: 'localhost',
  dialect:  'postgres',
});*/
const sequelize = new Sequelize(process.env.DATABASE_URL);

db.sequelize = sequelize;
db.Sequelize = Sequelize;



module.exports = db;

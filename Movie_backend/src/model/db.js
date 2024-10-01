const { Sequelize, DataTypes } = require("sequelize");


const sequelize = new Sequelize(
  "movie",
  "nuel",
  "Nuel@090#",
  {
    host: "localhost",
    dialect: "mysql",
  }
);


async function sequelizeCall(){

    try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    } catch (error) {
        
    }

}

module.exports ={
    sequelize,
    sequelizeCall,
    DataTypes
}
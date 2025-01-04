const { config } = require("dotenv");
const { Sequelize, DataTypes } = require("sequelize");
require("dotenv").config()

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.USER_NAME,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
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
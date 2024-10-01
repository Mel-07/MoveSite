const port = 8000
const http = require(`http`)
const app = require('./src/app')
const express = require('express')
const server =  http.createServer(app)
const {sequelize,sequelizeCall} = require('./src/model/db')

async function startSever(){

  try {
    await sequelizeCall()
        
    server.listen(port, () => {
          console.log(`listening on port ${port}`);
        });
  } catch (error) {
    console.error("Unable to connect to the database: ", error);
  }
}

startSever()


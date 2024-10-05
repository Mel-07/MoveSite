const port = 8000
const http = require(`http`)
const app = require('./src/app')
const os = require("os");
const {sequelize,sequelizeCall} = require('./src/model/db')
const { sync } = require("./src/model/users.model");
const cluster = require("cluster");




async function startSever(){

  try {

    await sequelizeCall()
    await sync()

    const server = http.createServer(app);
    server.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database: ", error);
  }
}

startSever()


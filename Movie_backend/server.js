require("dotenv").config()

const port = process.env.PORT;
const http = require(`http`)
const app = require('./src/app')
const {sequelizeCall} = require('./src/model/db')
const sync = require("./src/model/sync");




async function startSever(){

  try {

    await sequelizeCall()
    await sync(/* {force:true } */ /* { alter: true } */);

    const server = http.createServer(app);
    server.listen(port, () => {
      console.log(`listening on port ${port}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database: ", error);
  }
}

startSever()


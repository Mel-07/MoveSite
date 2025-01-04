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

// module.exports = async (req, res) => {
//   try {
//     await sequelizeCall();
//     await sync();
//     app(req, res); // Pass the request/response directly to your Express app
//   } catch (error) {
//     console.error("Server error:", error);
//     res.status(500).json({ message: "Internal Server Error" });
//   }
// };


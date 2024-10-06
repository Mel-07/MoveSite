const{sequelize} = require('./db')
const {Users} = require('./users.model')
const {Bookmark} = require("./bookmark.model")
async function sync(va) {
  try {
    await sequelize.sync(va);

    console.log("table synced");
  } catch (error) {
    console.error(error);
  }
}

module.exports = sync
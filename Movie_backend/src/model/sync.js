const{sequelize} = require('./db')
/**
 * call the Tables to sync to the database */ 
const {Users} = require('./users.model')
const {Bookmark} = require("./bookmark.model")
async function sync(va) {
  try {
    if(va && typeof va === 'object'){
      await sequelize.sync(va);
    }else{
      await sequelize.sync();
    }

    console.log("table synced");
  } catch (error) {
    console.error(error);
  }
}

module.exports = sync
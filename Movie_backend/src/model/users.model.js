const {sequelize,DataTypes} = require('./db')

const Users = sequelize.define("users", {
  image: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  userName: {
    type: DataTypes.STRING,
    allowNull: false,
    unique:true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique:true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

 async function sync(){

    try {

        await Users.sync();

        console.log("table synced")
        
    } catch (error) {
        console.error(error)
    }
}

module.exports = {
  Users,
  sync
};
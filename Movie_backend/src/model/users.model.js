const { Bookmark } = require('./bookmark.model');
const {sequelize,DataTypes} = require('./db')
const crypto = require("crypto")

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
    set(val){
    const salt = crypto.randomBytes(16).toString("hex"); 
    const derivedKey = crypto.scryptSync(val, salt, 64); 
    this.setDataValue("password", `${salt}:${derivedKey.toString("hex")}`);
    }
  },
});

Users.hasMany(Bookmark)
Bookmark.belongsTo(Users)
module.exports = {
  Users,
};
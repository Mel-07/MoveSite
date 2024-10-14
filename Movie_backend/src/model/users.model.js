const { Bookmark } = require('./bookmark.model');
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

Users.hasMany(Bookmark)
module.exports = {
  Users,
};
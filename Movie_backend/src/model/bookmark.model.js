const {sequelize,DataTypes}  = require('./db')

const Bookmark = sequelize.define(
  "bookmarks",
  {
    id:{
      type:DataTypes.INTEGER,
      autoIncrement:true,
      primaryKey:true
    },
    backdrop_path: {
      type: DataTypes.STRING(150),
    },
    id_movie: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(100),
    },
    original_title: {
      type: DataTypes.STRING(100),
    },
    overview: {
      type: DataTypes.STRING(1000),
    },
    poster_path: {
      type: DataTypes.STRING(150),
    },
    media_type: {
      type: DataTypes.STRING(10),
    },
    adult: {
      type: DataTypes.BOOLEAN,
    },
    original_language: {
      type: DataTypes.STRING(150),
    },
    genre_ids: {
      type: DataTypes.STRING(150),
    },
    popularity: {
      type: DataTypes.DECIMAL,
    },
    release_date: {
      type: DataTypes.DATEONLY,
    },
    video: {
      type: DataTypes.BOOLEAN,
    },
    vote_average: {
      type: DataTypes.FLOAT,
    },
    vote_count: {
      type: DataTypes.INTEGER,
    },
    origin_country: {
      type: DataTypes.STRING(150),
    },
  },
);
module.exports = {
    Bookmark
}
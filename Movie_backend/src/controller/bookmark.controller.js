const { where,Op, or } = require('sequelize');
const {Bookmark} = require('../model/bookmark.model')
async function addOrRemoveBookmark(req,res){

  const {
    id,
    title,
    name,
    original_name,
    original_title,
    release_date,
    first_air_date,
    genre_ids,
    origin_country,
    backdrop_path,
    overview,
    poster_path,
    media_type,
    adult,
    original_language,
    popularity,
    video,
    vote_average,
    vote_count,
  } = req.body
  const {
    id:userId
  } = req.user

    try {

        const bookmarkCreated = await Bookmark.create({
          backdrop_path,
          overview,
          poster_path,
          media_type,
          adult,
          original_language,
          popularity,
          video,
          vote_average,
          vote_count,
          id_movie:id,
          title: name ? name : title,
          original_title: original_name
            ? original_name
            : original_title,
          release_date: first_air_date
            ? first_air_date
            : release_date,
          genre_ids: genre_ids.join("-").toString(),
          origin_country: origin_country? origin_country.toString() :null,
          userId
        });

        console.log(bookmarkCreated.toJSON())
        return res.status(200).json({
          success: true,
        });
    } catch (error) {

        console.error(error)
        
    }
}

async function getBookmark(req,res){
  const {user} = req
try {

  const bookmarkList = await Bookmark.findAll({
    where:{
      userId:user.id,
    },
    raw:true
  })
  let newBookmarkLists;
  if(bookmarkList){
     if( bookmarkList){
      newBookmarkLists =bookmarkList.map((v)=>({
        backdrop_path:v.backdrop_path,
        id:v.id_movie,
        title:v.title,
        original_title:v.original_title,
        overview:v.overview,
        poster_path:v.poster_path,
        media_type:v.media_type,
        adult:v.adult=== 0 ?false:true,
        original_language:v.original_language,
        genre_ids:v.genre_ids.split('-'),
        popularity:v.popularity,
        release_date:v.release_date,
        video:v.video === 0 ?false:true,
        vote_average:v.vote_average,
        origin_country: v.origin_country !== null ? v.origin_country.split('-'):null,
      }))
     }
  }
    console.log(newBookmarkLists.length);
    return res.status(200).json({
      newBookmarkLists,
      numberOfBookmark:newBookmarkLists.length
    });
} catch (error) {
      res.status(400).json({
        message: error.message,
        success: false,
      });
}
}

async function deleteBookmark(req,res){
  const { body:{
    id:id_movie,
    title
  } } = req;
  const {id:userId} = req.user

  console.log(userId)


  try {
    const bookmark = await Bookmark.destroy({
      where:{
        [Op.and]:[{
          id_movie
        },{
          title
        },
      {
        userId
      }]
      },
      raw:true
    })
    console.log(bookmark)
    res.status(200).json({
      success:true
    })
  } catch (error) {
    res.status(400).json({
      message:error.message,
      success:false
    })
  }
}

module.exports={
    addOrRemoveBookmark,
    getBookmark,
    deleteBookmark
}
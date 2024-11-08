const {Bookmark} = require('../model/bookmark.model')
async function addOrRemoveBookmark(req,res){
  const {body} = req;

    try {
        console.log(body)

        const bookmarkCreated = await Bookmark.create({
          ...req.body,
          title: req.body.name ? req.body.name : req.body.title,
          original_title: req.body.original_name
            ? req.body.original_name
            : req.body.original_title,
          release_date: req.body.first_air_date
            ? req.body.first_air_date
            : req.body.release_date,
          genre_ids: req.body.genre_ids.join("-").toString(),
          origin_country: req.body.origin_country ? req.body.origin_country.join("-").toString() :null,
          userId: req.user.id,
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
        id:v.id,
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
  
}
}

module.exports={
    addOrRemoveBookmark,
    getBookmark
}
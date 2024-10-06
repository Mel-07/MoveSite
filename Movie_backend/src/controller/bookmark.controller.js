const {Bookmark} = require('../model/bookmark.model')
async function addOrRemoveBookmark(req,res){
    try {
        

        const bookmarkCreated = await Bookmark.create({
          ...req.body,
          genre_ids: req.body.genre_ids.join().toString(),
          origin_country: req.body.genre_ids.join().toString(),
        });

        console.log(bookmarkCreated.toJSON())
        return res.status(200).json({
          success: true,
        });
    } catch (error) {

        console.error(error)
        
    }
}

module.exports={
    addOrRemoveBookmark
}
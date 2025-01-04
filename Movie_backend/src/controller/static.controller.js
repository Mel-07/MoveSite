
const path = require('path')
/**
 * function for serving the build html.index file**/
 async function staticServer (req,res){
    try {

    return res
      .status(200)
      .sendFile(
        path.join(__dirname, "..", "..", "Public", "dist", "index.html")
      );
} catch (error) {
    return res.status(401).json({
      error:error.message,
    });
}
}
module.exports={
    staticServer
}

const path = require('path')
async function getLoginFrom (req,res){

  try {
return res.sendFile(path.join(__dirname, "..", "..", "Public", "dist", "index.html"));
  } catch (error) {
    return res.status(400).json({
      error:error.message
    })
  }
}
// function loginUser (_, res) {
//     res.redirect("/");
// }

module.exports = {
  // loginUser,
  getLoginFrom,
};

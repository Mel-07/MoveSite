
const path = require('path')
async function getLoginFrom (req,res){

  try {
return console.log(res)
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

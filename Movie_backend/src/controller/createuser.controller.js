const { Users } = require("../model/users.model");
async function createUser(req,res,next){
    const {userName,email,password} = req.body

    try {
    const createNewUser = await Users.create({
        userName,
        email,
        password,
    });
    if(createNewUser){
      req.login(createNewUser, function (err) {
        if (err) {
          return next(err);
        }
        return res.status(200).json({ redirect: "/app" });
      });
    }
    } catch (err) {

        if (err.name === "SequelizeUniqueConstraintError") {
            const message = err?.errors[0]?.message.split(' ')
            const value = err?.errors[0]?.value;
          return res.status(400).json({
            error: `${message[0]} ${value} already in use`,
          });
        }else{
            next(err)
        }
    }
}

module.exports = {
    createUser
}
const { Users } = require("../model/users.model");
async function createUser(req,res){
    const {userName,email,password} = req.body

    try {
    const createNewUser = await Users.create({
        userName,
        email,
        password,
    });
    
    return res.status(201).json(createNewUser);
    } catch (err) {

        if (err.name === "SequelizeUniqueConstraintError") {
            const message = err?.errors[0]?.message.split(' ')
            const value = err?.errors[0]?.value;
          return res.status(400).json({
            error: `${message[0]} ${value} already in use`,
          });
        }
    }
}

module.exports = {
    createUser
}
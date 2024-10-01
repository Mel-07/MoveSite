const Users = require('../model/users.model')
async function createUser(req,res){
    const {image,userName,email,password} = req.body

    try {
    const createNewUser = await Users.create({
        image,
        userName,
        email,
        password,
    });
    return res.status(200).json(createNewUser);
    } catch (error) {
        res.status(400).json(error)
    }
}

module.exports = {
    createUser
}
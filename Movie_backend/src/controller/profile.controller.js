const validate = require('../utility')
const {Users} = require('../model/users.model')

async function getProfile(req,res){
    try {
        Users.findOne()
    } catch (error) {
        
    }
}

async function updateProfile(req,res){

    const {userName,email,image,password} = req.body
    console.log(!validate.email(email));
    try {
      /*--> update user and send a respond that the user as been updated <--*/
              if (
                validate.email(email) ||
                validate.userName(userName) ||
                validate.password(password)
              ) {               
                await Users.update(
                  {
                    userName,
                    email,
                    image,
                    password,
                  },
                  {
                    where: {
                      id: 22,
                    },
                  }
                );
                return res.status(200).json({
                    user: "updated",
                    success:true
                });
              }
              else{                  
                return res.status(400).json({
                error: "Invalid Data",
                success: false,
              });     
              }

    } catch (error) {
        res.status(401).json({
            error:"failed to update",
            messageError:error.message
        })
    }
    // res.status(200).json([...newUser,req.body]);
}

module.exports ={
    getProfile,
    updateProfile
}

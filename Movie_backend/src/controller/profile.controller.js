const validate = require('../utility')
const {Users} = require('../model/users.model')

async function getProfile(req,res){
    try {
        const user = await Users.findOne({ where:req?.user?.id})
        const{userName,image,email} = user?.dataValues
        if(user){
          res.status(200).json({
            userName,
            image,
            email
          })
        }else{
          res.status(401).json({
            error:"User not found"
          })
        }

    } catch (error) {

      res.status(400).json({
        message:error.message,
        success: false
      })
        
    }
}

async function updateProfile(req,res){

    const {userName,email,image,password} = req.body
    try {
      /*--> update user and send a respond that the user as been updated <--*/
              if (
                validate.email(email) &&
                validate.userName(userName) &&
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
                      userName
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

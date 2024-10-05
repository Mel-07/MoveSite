const express = require('express')
const app = express();
const cors = require('cors')
const {
  getProfile,
  updateProfile,
  loginUser,
  createUser,
} = require("./controller");
const {userName,email,password} = require('./utility')

app.use(express.json())
app.use(cors({
    origin:'http://localhost:5173'
}))
app.use((req,res,next)=>{

    if(email(req.body.email) === false||userName(req.body.userName)===false||password(req.body.password)=== false){
       return res.status(400).json({
            error:"Invalid Data"
        })
    }

    next()
})
app.post('/login',loginUser)
app.post("/sign-in", createUser);
app.get('/profile',getProfile)
app.post("/profile", updateProfile);


module.exports =app
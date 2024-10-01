const express = require('express')
const app = express();
const cors = require('cors')
const {getProfile,sendProfile,loginUser,createUser}  = require('./controller')
const {userName,email,password} = require('./utility')

app.use(express.json())
app.use(cors({
    origin:'http://localhost:5174'
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
app.post('/sign-in',createUser)
app.get('/profile',getProfile)
app.post('/profile',sendProfile)


module.exports =app
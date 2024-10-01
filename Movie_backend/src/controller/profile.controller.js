const newUser = [{
    image:'/djdjdksdjjdks',
    name:"ella",
    email:'ella405@gmail.com',
    password:'#$#Eeww2',

}]

function getProfile(req,res){

return res.status(200).json(newUser)
}

function sendProfile(req,res){
    if(!req.body.userName){
        return res.status(400).json({
            error:"set username"
        })
    }
    console.log(res.body)
    // res.status(200).json([...newUser,req.body]);
}

module.exports ={
    getProfile,
    sendProfile
}

const validateEmail =(email:string)=>{

    const testEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);

    return testEmail

}

const validatePassWord = (password:string) =>{

}

const validateUserName = (username:string) =>{

    const testUsername = /^[a-zA-Z]{2,}$/.test(username) && username.length >= 2;

    return testUsername
}

export{
    validateEmail,
    validatePassWord,
    validateUserName
}
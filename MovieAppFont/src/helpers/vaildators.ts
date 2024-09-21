const validateEmail =(email:string)=>{

    const testEmail = /^[\w-\\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email);

    return testEmail

}

const validatePassWord = (password:string) =>{

    const testPassword =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{6,18}$/.test(password);

      return testPassword
}

const validateUserName = (username:string) =>{

    const testUsername = /^[a-zA-Z]{1,}$/.test(username) && username.length >= 2;

    return testUsername
}

type SizeLimit = number;
type SizeType = ('mb'|'kb')
interface Options{
    sizeLimit?:SizeLimit,
    sizeType?:SizeType,
    operator?:'<'|'>'
}
const checkFileSize = (file:File,{sizeLimit=2,sizeType='kb',operator='>'}:Options={}):boolean|null=>{

    if(!file){
        return null
    }

    const sizeInKb = parseInt((file.size / 1024).toFixed(2));
    const sizeInMb = parseInt((sizeInKb / 1024).toFixed(2));


    if (sizeType.toLowerCase() === 'mb'){
                switch (operator) {
                  case "<": {
                    return sizeInMb < sizeLimit ? true : false;
                  }
                  case ">": {
                    return sizeInMb > sizeLimit ? true : false;
                  }

                  default:
                    return null;
                }
    }
    else if(sizeType.toLowerCase() === 'kb'){
                switch (operator) {
                  case "<": {
                    return sizeInKb < sizeLimit ? true : false;
                  }
                  case ">": {
                    return sizeInKb > sizeLimit ? true : false;
                  }

                  default:
                    return null;
                }
    }


    return null
}

export{
    validateEmail,
    validatePassWord,
    validateUserName,
    checkFileSize
}
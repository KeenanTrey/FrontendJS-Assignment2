const fileService = require('./fileService')

exports.validate = (credential)=>{
 
   const {fullname, email, password} = {...credential}
   const users = fileService.getFileContents('../data/users.json');
   console.log(users)

   let add = fileService.writeFileContents('../data/users.json', credential)
   // flush the authentication

}
 
const formatErrors = function(user){
  let passwordWarning = ""
  let emailWarning = ""

  if(user.validPassword === false){passwordWarning= `password doesn't seem to be correct`}
  if(user.validEmail === false){ emailWarning= `email doesn't seem to be correct`}

  return {user:null, emailWarning, passwordWarning}
}

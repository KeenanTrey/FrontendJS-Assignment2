
const fileService = require('./fileService')
 
// common js module  import === require
// export import es modules  Browser...
// exports or module.exports  requre commonjs  NODE (BUNDLER RUN BROWSER)
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

const fileService = require('./fileService')
 
exports.authenticate = (credential)=>{
   const {email, password} = {...credential}
   const users = fileService.getFileContents('../data/users.json');
   console.log(users)
  //  Validate 
 const authUser =  users.reduce((authObj, user)=>{
    //  Check Email
    if(user.email === email){
      authObj.validEmail = true;
    }
    // Check password
    if(user.password === password){
      authObj.validPassword = true;
    }
    // Assign user a value; default null
    if(authObj.validEmail===true && authObj.validPassword===true){
        authObj.user = user;
    }
    return authObj
   }, {validEmail:false, validPassword:false, user:null})

   const auth0 = authUser.user ? {user:authUser.user}: formatErrors(authUser);
   return auth0

}
 
const formatErrors = function(user){
  let passwordWarning = ""
  let emailWarning = ""

  if(user.validPassword === false){passwordWarning= `password doesn't seem to be correct`}
  if(user.validEmail === false){ emailWarning= `email doesn't seem to be correct`}

  return {user:null, emailWarning, passwordWarning}
}

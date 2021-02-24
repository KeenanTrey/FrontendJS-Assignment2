/* 
  Login Service Will Authenticate an email and password
  return a true or false response.
  false returns will keep users on the login page with errors
  true will redirect user to the dashboard.html
*/
const fileService = require('./fileService')
 
exports.authenticate = (credential)=>{
  
   const {email, password} = {...credential}
   const users = fileService.getFileContents('../data/users.json');
 
   // authUser = {validEmail, validPassword, user}
  const authUser = users.reduce((authObj, user)=>{

       // Authentication Checks
       if(user.email === email){
         authObj.validEmail = true;
       }

       if(user.password === password){
         authObj.validPassword = true;
       }

       if(authObj.validEmail === true && authObj.validPassword === true){
         authObj.user = user
       }
       
       // YOU MUST RETURN THE ACCUMULATOR OR THE VALUE WILL BE UNDEFINED.....
       return authObj
    
   }, {validEmail:false, validPassword:false, user:null})
    // ternary opertor   (statement/condition)?true:false;    if else short block
    // truthy and falsy

   const auth0 =  authUser.user? authUser.user : formatErrors(authUser)

}

const formatErrors = function (authObj){
     // create error warnings...
     let emailWarning = ''
     let passwordWarning = ''

     if(authObj.validEmail === false){
       emailWarning = "couldn't find user with this email address"
     }

     if(authObj.validPassword === false){
      passwordWarning = "the password doesn't match this email address"
    }

    return {user:null, emailWarning, passwordWarning}
}
 
 
 
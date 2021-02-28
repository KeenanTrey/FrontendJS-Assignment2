require('dotenv').config()
//import the express module
const express = require('express');
const validator = require('express-validator');
// import the path utils from Node.
const path = require('path')
const cors = require('cors')

const loginService = require('./services/loginService')
const fileService = require('./services/fileService')
const signupService = require('./services/signupService')
//UUID
const { v4: uuidv4 } = require('uuid');
// create an instance of express
const app = express()
 
const PORT =  process.env.PORT || 5000 

 
// Middleware For Cross Origin Resource SHaring
app.use(cors())

//To get access to the name value pairs send in the message Body of POST Request.
 app.use(express.urlencoded({extended:true}))
 app.use(express.json())

// Setup Template Engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './views'))
 


//Middleware Serving Static Pages from client directory
// second parameter is an configuration object of how we want
// the static file server to run.
 
app.use(express.static(path.join(__dirname, "../client"), {extensions: ["html", 'htm']})
);

 
 // Routing Middleware.  
 app.get('/login', (req, res)=>{
  res.render('login', {passwordWarning:"", emailWarning:""})
  })

  app.get('/signup', (req, res)=>{
    res.render('signup')
})
  

  app.get('/dashboard', (req, res)=>{
      res.render('dashboard')
})

 app.post('/login', (req, res)=>{
   // POST name value pairs in body request
   const credentials = {
     email:req.body.email,
     password:req.body.password
    }
    const isValidUser = loginService.authenticate(credentials)
    if( isValidUser.user !== null){
      res.redirect('dashboard')
    }

    if(isValidUser.user === null){
        res.render('login', {
          emailWarning:isValidUser.emailWarning, 
          passwordWarning:isValidUser.passwordWarning,
          email:req.body.email,
          password:req.body.password
        })
    }
    res.end()
 })

//  SIGNUP
 app.post('/signup', (req, res)=>{
  // POST name value pairs in body request
  const credentials = {
    username: req.body.fullname,
    email:req.body.email,
    password:req.body.password
   }
   console.log(req.body)
   
   //TEST WRITE
    let valid = signupService.validate(credentials)
    //let newUser = fileService.validate(credentials)
   res.redirect('login')
   res.end()
})

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "../client/404.html"));
});

app.listen(PORT, () => {
  console.log(`server started on http://localhost:5000`);
});

require('dotenv').config()
const express = require('express');

const { body, validationResult } = require('express-validator');
const path = require('path')
const cors = require('cors')

const loginService = require('./services/loginService')
const fileService = require('./services/fileService')
//UUID
const { v4: uuidv4 } = require('uuid');

const app = express()
 
const PORT =  process.env.PORT || 5000 


app.use(cors())


 app.use(express.urlencoded({extended:true}))
 app.use(express.json())

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './views'))

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
 app.post('/signup', body('fullname').notEmpty(), body('email').isEmail(), body('password').notEmpty(), (req, res)=>{
   let newUId = uuidv4()

   const errors = validationResult(req);
   if (errors.isEmpty()) {
    const credentials = {
      UUID: newUId,
      username: req.body.fullname,
      email:req.body.email,
      password:req.body.password
     }
     console.log(req.body)
  
     let valid = fileService.writeFileContents('../data/users.json', credentials)
     res.redirect('login')
     res.end()
   }
   else {
    return res.status(400).json({ errors: errors.array() });
   }
})

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "../client/404.html"));
});

app.listen(PORT, () => {
  console.log(`server started on http://localhost:5000`);
});

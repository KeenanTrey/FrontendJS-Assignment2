require('dotenv').config()
const express = require('express');
//express validator import
const { body, validationResult } = require('express-validator');
const path = require('path')
const cors = require('cors')
//Call both services
const loginService = require('./services/loginService')
const fileService = require('./services/fileService')
const departmentRoutes = require('./routes/departmentRouter')
//UUID
const { v4: uuidv4 } = require('uuid');

const app = express()
 
const PORT =  process.env.PORT || 5000 

//cross orgin resource sharing
app.use(cors())

 app.use(express.urlencoded({extended:true}))
 app.use(express.json())
 app.use(express.raw())

 //Set EJS
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, './views'))

app.use(express.static(path.join(__dirname, "../www"), {extensions: ["html", 'htm']})
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
   //Pull info in body
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

//  SIGNUP, express validation in app.POST
 app.post('/signup', body('fullname').notEmpty(), body('email').isEmail(), body('password').notEmpty(), (req, res)=>{
   //Create new uuid
   let newUId = uuidv4()
  
   //if no errors are reported
   const errors = validationResult(req);
   if (errors.isEmpty()) {
    //  Pull info and add new uuid to the new user
    const credentials = {
      UUID: newUId,
      username: req.body.fullname,
      email:req.body.email,
      password:req.body.password
     }
     console.log(req.body)
     //Write to file
     let valid = fileService.writeFileContents('../data/users.json', credentials)
     //Redirect to login
     res.redirect('login')
     res.end()
   }
   else {
     //If Errors are present then this is called
    return res.status(400).json({ errors: errors.array() });
   }
})

app.get('/users', (req, res)=>{
  // read using the file service
  // return as json
  const data = fileService.readFile('../data/user.json')
  res.json(data)
})

app.use('/api/departments', departmentRoutes())

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, "../client/404.html"));
});

app.listen(PORT, () => {
  console.log(`server started on http://localhost:5000`);
});

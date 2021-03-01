# Keenan Philip Assignment 2

### Overview
Assignment to demonstrate custom apis and processing POST data to register a user as well as serving protected routes. Login route renders login template and add warnings messages. Sign up is validated by express-validation and required tags on the form itself. If the registration is valid the new user is written to the users.json with a unique UUID for each user and redirect to the login screen. The user can then sign in user the username and password provided to login. If it is a valid login combination the user is redirected to the dashboard by the system.

### Installiation
Once the project has been cloned from git, running 
```
npm install 
```
to get all node modules required and then running the command
```
npm run server
```
will allow you to use this project and see any logged data in your terminal

example output
https://assign2-keenanphilip.herokuapp.com/



 


 
  
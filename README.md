# wantcardserver

Wantcard app's server

It was written in Node.js 

# How to use 

-- npm install 

-- nodemon app.js

# Update Log 
 | 2023.02.28 | Solved the error when injecting string data into SQL. 

 | 2023.03.09 | We made a module for database connection. - ./utils/db.js
 
 | 2023.03.23 | Add function that card/index.js read card list and send into json type

 | 2023.03.26 | Add AutoIncrement in Database, Divide SignUp and Login API w
  + When Login and SignUp, Returns User id
  + Add Id check API 

 | 2023.04.07 | Add password hash algorithm
  
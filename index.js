require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express()
const PORT = process.env.PORT ?? 1234;

//Routes managment to distinct services
const authentication = require('./routes/auth/userOptions');

// Middleware to format json 
app.use(express.json());

//Cors solution
app.use(cors());

//Router
app.use('/auth',authentication);


app.listen(PORT,()=>{
    console.log('\n API is listening at port '+ PORT);
})

const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const helmet = require('helmet')

const dotenv = require('dotenv');           // importing .env module
dotenv.config({path:'./development.env'});    // configuring the dot .enve before we use it

const server =express(); 
server.use(cors());
server.use(helmet());

server.use(bodyParser.json());   

// configer entites
const users = require('./database/users')

// health-check route
server.get('/health-check',(req,res)=>{
    res.status(200).json({
        message: 'Server is running'
    })
})

mongoose
.connect(process.env.DATABASE_CONNECTION)
.then(result =>{
    console.log('Database connected!')
    server.listen(process.env.PORT);
    console.log(`Server is runnig at http://localhost:${process.env.PORT}`);
})
.catch(err => console.log(err));
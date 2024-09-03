// REQUIRING/GATHERING ALL MODULES
const express           = require('express')
const mongoose          = require('mongoose')
const morgan            = require('morgan')
const bodyParser        = require('body-parser')
const fs                = require('fs')
const path              = require('path')
const connectDB         = require('./connect-db')

const dotenv = require('dotenv')
dotenv.config()

const studentRoute      = require('./routes/student-route')

const { v4:uuidv4 }     = require('uuid')

connectDB();

// INITIALIZING EXPRESS APP
const app = express()

// BODY PARSER TO DIRECTLY GET DATA OF BODY WHEN WE TEST IN POSTMAN IN JSON FORMAT
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.get('/',(req,res)=> res.json({msg:"Heyyy Brooo!!"}))

const HOST = process.env.HOST || 'localhost'
const PORT = process.env.PORT || 8000

// MORGAN TOKENS FOR SERVER SIDE LOGGING INFORMATION OF USER WHENEVER HE MAKES AN API CALL
// morgan.token('id', function getID(req){
//     return req.id
// })

// morgan.token('param', function(req,res,param){
//     return 'userToken'
// })

// app.use(assignID)
// app.use(morgan(':id :method :status :url "HTTP/:http-version"'))

// let accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags:'a'})

// app.use(morgan(':id :param :method :status :url "HTTP/:http-version"',{stream: accessLogStream}))

function assignID(req,res,next){
    req.id = uuidv4()
    next()
}

app.listen(PORT, ()=>{
    console.log(`Server is running on http://${HOST}:${PORT}/`);
})

app.use('/api/student', studentRoute)
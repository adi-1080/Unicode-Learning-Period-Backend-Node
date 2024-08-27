// REQUIRING/GATHERING ALL MODULES
const express           = require('express')
const mongoose          = require('mongoose')
const morgan            = require('morgan')
const bodyParser        = require('body-parser')
const fs                = require('fs')
const path              = require('path')

const dotenv            = require('dotenv')
dotenv.config()

const studentRoute      = require('./routes/student-route')

const { v4:uuidv4 }     = require('uuid')

// CONNECTING TO MONGODB ATLAS USING MONGOOSE
mongoose.connect(`mongodb+srv://${process.env.MONGODB_ATLAS_UNICODE_USERNAME}:${process.env.MONGODB_ATLAS_UNICODE_PASSWORD}@${process.env.UNICODE_CLUSTER}/?retryWrites=true&w=majority&appName=${process.env.UNICODE_CLUSTER_NAME}`, {useNewUrlParser: true, useUnifiedTopology: true})

const db = mongoose.connection

// FUNCTIONS TO EXECUTE ON CONNECTING WITH ATLAS
db.on('error', (err)=>{
    console.log("Error");
})

db.once('open', ()=>{
    console.log('Database Connection Established');
})

// INITIALIZING EXPRESS APP
const app = express()

// BODY PARSER TO DIRECTLY GET DATA OF BODY WHEN WE TEST IN POSTMAN IN JSON FORMAT
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.get('/',(req,res)=> res.json({msg:"Heyyy Brooo!!"}))

const HOST = process.env.HOST || 'localhost'
const PORT = process.env.PORT || 3000

// MORGAN TOKENS FOR SERVER SIDE LOGGING INFORMATION OF USER WHENEVER HE MAKES AN API CALL
morgan.token('id', function getID(req){
    return req.id
})

morgan.token('param', function(req,res,param){
    return 'userToken'
})

app.use(assignID)
app.use(morgan(':id :method :status :url "HTTP/:http-version"'))

let accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags:'a'})

app.use(morgan(':id :param :method :status :url "HTTP/:http-version"',{stream: accessLogStream}))

function assignID(req,res,next){
    req.id = uuidv4()
    next()
}

app.use(assignID)

app.listen(PORT, ()=>{
    console.log(`Server is running on http://${HOST}:${PORT}/`);
})

app.use('/api/student', studentRoute)
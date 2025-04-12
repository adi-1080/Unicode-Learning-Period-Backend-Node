// REQUIRING/GATHERING ALL MODULES
import express from 'express'
import mongoose from 'mongoose'
import morgan from 'morgan'
import bodyParser from 'body-parser'
import connectDB from './db/connect-db.js'
import cors from 'cors'
import pino from 'pino'
import pinoHTTP from 'pino-http'
import fs from 'fs'

import dotenv from 'dotenv'
dotenv.config()

import userRoute from './routes/user-route.js'
import companyRoute from './routes/company-route.js'
import recruiterRoute from './routes/recruiter-route.js'
import jobRoute from './routes/job-route.js'
import applicationRoute from './routes/application-route.js'
import followRoute from './routes/follow-route.js'
import blogRoute from './routes/blog-route.js'

import { v4 as uuidv4 } from 'uuid';

connectDB();

// INITIALIZING EXPRESS APP
const app = express()

// BODY PARSER TO DIRECTLY GET DATA OF BODY WHEN WE TEST IN POSTMAN IN JSON FORMAT
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

app.use('./public/uploads',express.static('uploads'))
app.get('/',(req,res)=> res.json({msg:"Heyyy Brooo!!"}))

const HOST = process.env.HOST || 'localhost'
const PORT = process.env.PORT || 4000

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

// function assignID(req,res,next){
//     req.id = uuidv4()
//     next()
// }

const logger = pino({
    transport:{
        target:'pino-pretty',
        options:{
            colorize:true
        }
    }
},fs.createWriteStream('./access.log', { flags: 'a' }))
// app.use(pinoHTTP({logger}))

const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions))

// Only start the server if the environment is not 'test'
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`Server is running on http://${HOST}:${PORT}/`);
        console.log(`Node.js application running in ${process.env.NODE_ENV} environment`);
    });
}

app.use('/user',userRoute)
app.use('/company',companyRoute)
app.use('/recruiter',recruiterRoute)
app.use('/job',jobRoute)
app.use('/application',applicationRoute)
app.use('/followmodel',followRoute)
app.use('/blog',blogRoute)

export default app
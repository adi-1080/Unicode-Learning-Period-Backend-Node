const Company = require('../models/company-model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const uploadOnCloudinary = require('../utils/cloudinary');

const signup = async(req,res,next)=>{
    try {

        const {company_id,email,password,company_name,description,website_url} = req.body;
        const comExists = Company.findOne({company_id});
        if(!comExists){
            res.status(400).json({message: 'Company already exists'})
        }

        bcrypt.hash(req.body.password, 12, function(err, hashedPass){
            if(err){
                res.json({
                    error: err
                })
            }

            let company = new Company({
                company_id: req.body.company_id,
                email: req.body.email,
                password: req.body.email,
                company_name: req.body.name,
                description: req.body.description,
                website_url: req.body.website_url
            })

            company.save()
            .then((result)=>{
                res.json({
                    message: 'Company Registered Successfully'
                })
            })
            .catch((err)=>{
                res.json({
                    message: 'Couldn\'t register company'
                })
            })
        })
    } catch (err) {
        console.log('Error signing up',err);
        res.status(400).json({error: err});
    }
}

const login = async(req,res,next)=>{
    try {
        const {email,password} = req.body;
        const comDoesNotExists = await Company.findOne({email})
        if(comDoesNotExists){
            res.status(400).json({message: 'Company doesn\'t exists'})
        }
        Company.findOne({email})
        .then((company)=>{
            bcrypt.compare(password, company.password, function(err,result){
                if(result){
                    let token = jwt.sign({company_id: company.company_id}, process.env.COM_SECRET, {expiresIn: '5m'})
                    res.json({
                        message: 'Login Success',
                        token: token
                    })
                }
                else{
                    res.json({
                        message: 'Password didn\'t match'
                    })
                }
            })
        })

        let mailTransporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        })

        let details = {
            from: 'adityagupta5277@gmail.com',
            to: req.body.email,
            subject: 'Notify Login',
            text: 'Company Logged In'
        }

        mailTransporter.sendMail(details, (err)=>{
            if(err){
                res.json({err})
            }
            else{
                res.json({message: 'Email sent to company'})
            }
        })
    } catch (error) {
        res.json({message: 'Error logging'})
    }
}

module.exports = {
    login, signup
}
import Company from '../models/company-model.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import uploadOnCloudinary from '../utils/cloudinary.js';

const register = async(req,res,next)=>{
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
                password: hashedPass,
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

const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        const company = await Company.findOne({ email });
        if (!company) {
            return res.status(400).json({ message: 'Company doesn\'t exist' });
        }

        const isMatch = await bcrypt.compare(password, company.password);
        if (!isMatch) {
            return res.json({ message: 'Password didn\'t match' });
        }

        const token = jwt.sign({ company_id: company.company_id }, process.env.COM_SECRET, { expiresIn: '300s' });
        res.json({ message: 'Login Success', token });
        
        const mailTransporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });

        const details = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Notify Login',
            text: 'Company Logged In'
        };

        mailTransporter.sendMail(details, (err) => {
            if (err) {
                console.error('Error sending email:', err);
            } else {
                console.log('Email sent to company');
            }
        });

    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Error logging in' });
    }
};


export default {login, register}
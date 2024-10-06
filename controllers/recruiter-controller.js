import Recruiter from "../models/recruiter-model.js";
import Company from "../models/company-model.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import uploadOnCloudinary from '../utils/cloudinary.js';

const register = async(req,res,next)=>{
    try {

        const {name, age, gender, email, password, join_date, qualification, current_position, salary, company_id} = req.body;
        const company = await Company.findById(company_id);
        if(!company){
            return res.status(400).json({message: 'Company not found'})
        }

        bcrypt.hash(password, 12, function(err, hashedPass){
            if(err){
                res.json({
                    error: err
                })
            }

            let recruiter = new Recruiter({
                name: name,
                age: age,
                gender: gender,
                email: email,
                password: hashedPass,
                join_date: join_date,
                qualification: qualification,
                current_position: current_position,
                salary: salary,
                company_id: company_id
            })

            company.recruiters.push(recruiter._id)
            recruiter.save()
            company.save()
            .then((result)=>{
                res.json({
                    message: 'Recruiter Registered Successfully'
                })
            })
            .catch((err)=>{
                res.json({
                    message: 'Couldn\'t register recruiter'
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

        const recruiter = await Recruiter.findOne({ email });
        if (!recruiter) {
            return res.status(400).json({ message: 'Company doesn\'t exist' });
        }

        const isMatch = await bcrypt.compare(password, recruiter.password);
        if (!isMatch) {
            return res.json({ message: 'Password didn\'t match' });
        }

        const token = jwt.sign({ company_id: recruiter.company_id }, process.env.COM_SECRET, { expiresIn: '300s' });
        res.json({ message: 'Recruiter Login Success', token });
        
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
            text: 'Recruiter Logged In'
        };

        mailTransporter.sendMail(details, (err) => {
            if (err) {
                console.error('Error sending email:', err);
            } else {
                console.log('Email sent to recruiter');
            }
        });

    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'Error logging in' });
    }
};


export default {login, register}
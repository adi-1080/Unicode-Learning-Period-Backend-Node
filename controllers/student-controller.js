const Student           = require('../models/student-model');
const bcrypt            = require('bcryptjs')
const jwt               = require('jsonwebtoken')
const nodemailer        = require('nodemailer')

const register = (req,res,next) => {
    bcrypt.hash(req.body.password,12, function(err, hashedPass){
        if(err){
            res.json({
                error: err
            })
        }
        let student = new Student({
            sapid: req.body.sapid,
            name: req.body.name,
            department: req.body.department,
            age: req.body.age,
            email: req.body.email,
            contact: req.body.contact,
            password: hashedPass
        })
        student.save()
        .then((student) => {
            res.json({
                message: "Student registered successfully"
            })
        })
        .catch((err) => {
            res.json({
                message: "Some error occured"
            })
        })
    })
}

const login = (req,res,next) => {
    var email = req.body.email
    var password = req.body.password

    Student.findOne({$or: [{email:email},{phone:email}]})
    .then((student) => {
        if(student){
            bcrypt.compare(password, student.password, function(err,result){
                
                if(result){
                    let token = jwt.sign({name: student.name}, process.env.SECRET_KEY, {expiresIn: '300s'})
                    res.json({
                        message: 'Login successful',
                        token: token
                    })
                } else{
                    res.json({
                        message: 'Password didn\'t matched'
                    })
                }
            })
        } else{
            res.json({
                message: "No student found"
            })
        }
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
        subject: 'Testing our nodemailer',
        text: 'Hi Aditya, How are you ?'
    }
    
    mailTransporter.sendMail(details, (err)=>{
        if(err){
            console.log("An error occured !",err);
        }
        else{
            console.log('Email has sent !');
        }
    })
}

// Show the list of Students
const index = async(req,res,next) => {
    try{
        const result = await Student.find();
        res.json({
            "list-of-students": result,
        });
    }
    catch(error){
        res.json({
            "message": "An error occurred!",
            "reason": error
        });
    }
};

// Show single student
const show = async(req,res,next) => {
    let studentID = req.body.studentID;
    try{
        const result = await Student.findById(studentID);
        res.json({result});
    }
    catch(error){
        res.json({error});
    }
};

// Add new student
const store = async(req,res,next) => {
    let student = new Student({
        sapid: req.body.sapid,
        name: req.body.name,
        department: req.body.department,
        age: req.body.age,
        email: req.body.email,
        contact: req.body.contact
    });

    try{
        const result = await student.save();
        res.json({
            message: "Student added successfully",
            'msg-result': result
        });
    }
    catch(error){
        res.json({
            message: "Some error occurred"
        });
    }
};

// Update a student
const update = async(req,res,next) => {
    let studentID = req.body.studentID;

    // Input updated data from user
    let updatedData = {
        sapid: req.body.sapid,
        name: req.body.name,
        department: req.body.department,
        age: req.body.age,
        email: req.body.email,
        contact: req.body.contact
    };

    try{
        await Student.findByIdAndUpdate(studentID, { $set: updatedData });
        res.json({
            message: "Student updated successfully"
        });
    }
    catch(error){
        res.json({
            message: "Some error occurred"
        });
    }
};

// Delete a student
const destroy = async(req,res,next) => {
    let studentID = req.body.studentID;

    try{
        await Student.findByIdAndDelete(studentID);
        res.json({
            message: "Student deleted successfully"
        });
    }
    catch(error){
        res.json({
            message: "Some error occurred"
        });
    }
};

// Exporting the CRUD operations's functions that we just made above in the controller
module.exports = {
    index, show, store, update, destroy, register, login
};

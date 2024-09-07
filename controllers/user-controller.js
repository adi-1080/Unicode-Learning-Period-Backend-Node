const User              = require('../models/user-model');
const bcrypt            = require('bcryptjs');
const jwt               = require('jsonwebtoken');
const nodemailer        = require('nodemailer');
const uploadOnCloudinary= require('../utils/cloudinary')

const uploadImage = (req,res,next) => {
    try{
        const localFilePath = req.file.path

        const response = uploadOnCloudinary(localFilePath)

        console.log('Successfully uploaded image on cloudinary',response);

        res.status(200).json({
            message: "Image Uploaded Successfully to Cloudinary"
        })
    } catch(err){
        console.log('Error uploading image',err);
        res.send({
            message: "Some error occured",
            data: response
        })
    }
}

const register = (req,res,next) => {
    bcrypt.hash(req.body.password,12, function(err, hashedPass){
        if(err){
            res.json({
                error: err
            })
        }
        
        let user = new User({
            name: req.body.name,
            email: req.body.email,
            contact: req.body.contact,
            password: hashedPass
        })
        if(req.file){
            user.avatar = req.file.path
        }
        user.save()
        .then((User) => {
            res.json({
                message: "User registered successfully"
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

    User.findOne({$or: [{email:email},{phone:email}]})
    .then((User) => {
        if(User){
            bcrypt.compare(password, User.password, function(err,result){
                
                if(result){
                    let token = jwt.sign({name: User.name}, process.env.SECRET_KEY, {expiresIn: '300s'})
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
                message: "No User found"
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

// Show the list of Users
const index = async(req,res,next) => {
    try{
        const result = await User.find();
        res.json({
            "list-of-users": result,
        });
    }
    catch(error){
        res.json({
            "message": "An error occurred!",
            "reason": error
        });
    }
};

// Show single User
const show = async(req,res,next) => {
    let UserID = req.body.UserID;
    try{
        const result = await User.findById(UserID);
        res.json({result});
    }
    catch(error){
        res.json({error});
    }
};

// Add new User
const store = async(req,res,next) => {
    let User = new User({
        sapid: req.body.sapid,
        name: req.body.name,
        department: req.body.department,
        age: req.body.age,
        email: req.body.email,
        contact: req.body.contact
    });

    try{
        const result = await User.save();
        res.json({
            message: "User added successfully",
            'msg-result': result
        });
    }
    catch(error){
        res.json({
            message: "Some error occurred"
        });
    }
};

// Update a User
const update = async(req,res,next) => {
    let UserID = req.body.UserID;

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
        await User.findByIdAndUpdate(UserID, { $set: updatedData });
        res.json({
            message: "User updated successfully"
        });
    }
    catch(error){
        res.json({
            message: "Some error occurred"
        });
    }
};

// Delete a User
const destroy = async(req,res,next) => {
    let UserID = req.body.UserID;

    try{
        await User.findByIdAndDelete(UserID);
        res.json({
            message: "User deleted successfully"
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
    index, show, store, update, destroy, register, login, uploadImage
};

import User from '../models/user-model.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import uploadOnCloudinary from '../utils/cloudinary.js'

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

const register = async (req, res, next) => {
    try {
        const email_to_check = req.body.email
        const userExists = await User.findOne({email: email_to_check})

        if(userExists){
            return res.status(400).json({message: `User with email ${email_to_check} already exists!`})
        }

        const hashedPass = await bcrypt.hash(req.body.password, 12);

        let user = new User({
            name: req.body.name,
            email: req.body.email,
            contact: req.body.contact,
            password: hashedPass,
            tech_stack: req.body.tech_stack,
            field_of_interest: req.body.field_of_interest,
            experience_level: req.body.experience_level,
            bio: req.body.bio   
        });

        if (req.files) {
            if (req.files['avatar']) {
                const avatarFilePath = req.files['avatar'][0].path;
                const avatarResponse = await uploadOnCloudinary(avatarFilePath);
                user.avatar = avatarResponse.secure_url; // Provided by cloudinary to secure the url
                console.log('avatar uploaded : ',user.avatar);
            }

            if (req.files['resume_url']) {
                const resumeFilePath = req.files['resume_url'][0].path;
                const resumeResponse = await uploadOnCloudinary(resumeFilePath);
                user.resume_url = resumeResponse.secure_url; // Provided by cloudinary to secure the url
                console.log('resume uploaded : ',user.resume_url);
            }
        }
        
        const savedUser = await user.save();

        res.status(201).json({
            message: "User registered successfully",
            savedUser
        });
    } catch (err) {
        console.error('Error during registration:', err);
        res.status(500).json({
            message: "Some error occurred",
            error: err
        });
    }
}

const login = async (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    try {
        const user = await User.findOne({ $or: [{ email: email }, { phone: email }] });
        if (!user) {
            return res.status(404).json({ message: "No User found" });
        }

        const isMatch = bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Password didn\'t match' });
        }

        const token = jwt.sign({ _id: user._id, name: user.name, email: user.email }, process.env.SECRET_KEY, { expiresIn: '1h' });
        res.json({
            message: 'Login successful',
            token: token
        });

        // Mail transporter setup
        let mailTransporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD
            }
        });

        // Email details
        let details = {
            from: 'adityagupta5277@gmail.com',
            to: req.body.email,
            subject: 'Testing our nodemailer',
            text: 'Hi Aditya, How are you ?'
        };

        // Sending email
        mailTransporter.sendMail(details, (err) => {
            if (err) {
                console.log("An error occurred!", err);
            } else {
                console.log('Email has been sent!');
            }
        });

    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ message: 'An error occurred during login', error});
    }
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
    const updatedData = {
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
export default {index, show, store, update, destroy, register, login, uploadImage}
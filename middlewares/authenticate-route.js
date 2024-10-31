import jwt from 'jsonwebtoken'
import Recruiter from '../models/recruiter-model.js'

const authUser = async (req,res,next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        console.log(token);
        const decode = jwt.verify(token, process.env.SECRET_KEY)
        console.log("Decoded user",decode);
        req.user = decode
        next()
    } catch (error) {
        res.json({
            message: "Could not authenticate user"
        })
    }
}

const authRecruiter = async(req,res,next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]

        const decode = jwt.verify(token, process.env.COM_SECRET)

        console.log("Decoded recruiter",decode); //
        const recruiter = await Recruiter.findOne({ _id: decode._id, company_id: decode.company_id});

        if (!recruiter) {
            return res.status(403).json({ message: 'Unauthorized access: Not a valid recruiter' });
        }
        console.log("Found recruiter",recruiter);
        req.recruiter = recruiter
        next()
    } catch (error) {
        res.status(500).json({message: "Could not authenticate a recruiter", error: error})
    }
}

const checkIfAuthorizedFollower = async(req,res,next) => {
    try{
        const authorized_user_id = req.user.user_id
        const follower_user = req.body.follower_id

        if(authorized_user_id != follower_user){
            return res.status(500).json({message: "You are not allowed on this route"})
        }
        next()
    }
    catch(err){
        res.status(500).json({message: "Some internal error occured"})
    }
}

const checkIfAuthorizedAuthor = async(req,res,next) => {
    try {
        const {authorized_author_id, author_id} = req.body

        if(authorized_author_id != author_id){
            return res.status(500).json({message: "You are not allowed to use this"})
        }

        next()
    } catch (err) {
        res.status(500).json({message: "Some internal server error occured", error: err})
    }
}

export default {authUser, authRecruiter, checkIfAuthorizedFollower, checkIfAuthorizedAuthor}


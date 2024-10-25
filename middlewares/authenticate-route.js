import jwt from 'jsonwebtoken'

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
        console.log(token);
        const decode = jwt.verify(token, process.env.COM_SECRET)

        req.recruiter = decode
        next()
    } catch (error) {
        res.status(500).json({message: "Could not authenticate a recruiter", error: error})
    }
}

export default {authUser, authRecruiter}


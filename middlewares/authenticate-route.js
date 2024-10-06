import jwt from 'jsonwebtoken'

const authUser = async (req,res,next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        console.log(token);
        const decode = jwt.verify(token, process.env.SECRET_KEY)

        req.user = decode
        next()
    } catch (error) {
        res.json({
            message: "Token invalid, Authentication Failed"
        })
    }
}

const authRecruiter = async(req,res,next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        console.log(token);
        const decode = jwt.verify(token, process.env.SECRET_KEY)

        req.recruiter = decode
        next()
    } catch (error) {
        res.status(500).json({
            message: "Token invalid, Authentication Failed"
        })
    }
}

export default {authUser, authRecruiter}


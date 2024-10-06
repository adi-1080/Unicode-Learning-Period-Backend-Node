import jwt from 'jsonwebtoken'

const authRecruiter = async(req,res,next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        console.log(token);
        const decode = jwt.verify(token, process.env.SECRET_KEY)

        req.recruiter = decode
        next()
    } catch (error) {
        
    }
}

export default authRecruiter
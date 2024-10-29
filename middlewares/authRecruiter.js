import jwt from 'jsonwebtoken'

const authRecruiter = async(req,res,next) => {
    try {
        const authHeader = req.headers.authorization

        if(!authHeader || !authHeader.startsWith('Bearer')){
            return res.status(401).json({message: 'Token missing'})
        }

        const token = authHeader.split(' ')[1]
        console.log(token);//
        const decode = jwt.verify(token, process.env.COM_SECRET)

        req.recruiter = decode

        console.log("Decoded recruiter",decode);//

        next()
    } catch (error) {
        res.status(500).json({message: "Could not authenticate a recruiter", error: error})
    }
}

export default authRecruiter
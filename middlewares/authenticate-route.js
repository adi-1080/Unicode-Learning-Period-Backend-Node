const jwt = require('jsonwebtoken')

const authenticateRoute = async (req,res,next) => {
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

module.exports = authenticateRoute


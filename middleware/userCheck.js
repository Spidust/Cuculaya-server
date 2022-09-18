const JWT = require('jsonwebtoken');

module.exports = (req, res, next) => {
    if(!req.body.token) {
        return res.status(400).json({
            success: false,
            message: "This route only for admin"
        })
    }
    if(JWT.verify(req.body.token, process.env.SECRET_KEY).role != "USER") {
        return res.status(400).json({
            success: false,
            message: "This route only for admin"
        })
    } 

    return next();
}
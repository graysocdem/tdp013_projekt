const jwt = require('jsonwebtoken')

const config = process.env

const verify = (req, res, next) => {
    const token = req.headers['x-access-token']

    if (!token) {
        return res.status(403)
    }
    else {
        try {
            const decoded = jwt.verify(token, config.TOKEN_KEY)
            console.log(decoded)
            req.user = decoded
            console.log("jag lever!")
        }
        catch (err) {
            console.log("hej")
            return res.status(401)
        }
    }
    return(next)
}

module.exports = verify
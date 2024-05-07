const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.cookies.access_token;
    if (!token) {
        return res.status(403).json({msg: "Not authorized"});
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = {
            _id: decoded.id
        };
        next();
    } catch (err) {
        return res.status(403).json({ msg: "Invalid token" });
    }
}

module.exports = auth;
const jwt = require('jsonwebtoken');

function auth(req, res, next) {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({msg: "Access denied. No token provided."});
    }
    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        console.error("Token verification error:", err);
        return res.status(403).json({ msg: "Invalid token" });
    }
}

module.exports = auth;
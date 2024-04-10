exports.getDashboard = (req, res, next) => {
    res.status(200).json({
        msg: 'Welcome to Medical Store Worker Dashboard',
        user: req.user
    });
};
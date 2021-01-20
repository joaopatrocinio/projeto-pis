function checkAdmin(req, res, next) {
    if (req.user.userTypeId == 1) {
        next();
    } else {
        res.render("403")
    }
}

module.exports = checkAdmin;
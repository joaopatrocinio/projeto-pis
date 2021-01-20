function checkLogin(req, res, next) {
    if (req.user) {
        next();
    } else {
        next("route")
    }
}

function checkLogin403(req, res, next) {
    if (req.user) {
        next();
    } else {
        res.render("403")
    }
}

module.exports = checkLogin;
module.exports.forbidden = checkLogin403;
function checkSeller(req, res, next) {
    if (!req.user) return res.render("403");
    if (req.user.userTypeId == 2) {
        next();
    } else {
        res.render("403", {
            token: req.cookies.access_token,
            isAdmin: req.user.userTypeId == 1 ? true : false,
            isSeller: req.user.userTypeId == 2 ? true : false,
            isBuyer: req.user.userTypeId == 3 ? true : false
        })
    }
}

module.exports = checkSeller;
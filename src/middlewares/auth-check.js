const authCheck = function (req, res, next) {
    if (req.path==='/auth') {
        next();
    } else {
       res.redirect("/auth");
    }
}

export default authCheck;

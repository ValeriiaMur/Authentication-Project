const e = require("express");

module.exports = (req, res, next) =>{
    if(req.session && req.session.user) {
        next();
    } else {
        res.status(401).json({"error":"invalid"})
    }
}
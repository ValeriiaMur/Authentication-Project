const e = require("express");

const route = e.Router();
const useDB = require("./helpers")
const bcrypt = require("bcryptjs")
const protected = require("./restricted-middleware")

route.get("/", protected, (req, res)=>{
    if (req.session.user){
        useDB.get()
        .then(users => {
            if(users){
                res.status(200).json(users)
            } else {
                res.status(200).json({"message":"No users"})
            }
        })
        .catch(err =>{
            res.status(500).json(err)
        })
    } else {
        res.status(401).json({"message":"Invalid credentials"})
    }
    
})

route.post("/register", (req, res) => {
    const credentials = req.body;

    if(credentials.Username !== undefined && credentials.Password !== undefined){
        const hash = bcrypt.hashSync(credentials.Password, 14);
        credentials.Password = hash;

        useDB.insert(credentials)
            .then(user => {
                req.session.user = user;
                res.status(201).json(user)
            })
            .catch(err =>{
                res.status(500).json(err)
            })
    } else {
        res.status(500).json({"message":"no body"})
    }
})

route.post("/login", (req, res) => {
    const credentials = req.body;

    useDB.get(credentials.Username)
        .then(user =>{
        console.log(user);
        if (!user || !bcrypt.compareSync(credentials.Password, user.Password)) {
            return res.status(401).json({ message: 'You shall not pass.' });
        } else {
            //console.log(user);
            req.session.user = user;
            console.log(req.session)
            res.json({"message":"Logged In"})
        }
    })
})

route.get("/logout", (req, res)=>{
    if(req.session){
        req.session.destroy(err => {
            if(err){
                res.json({"err":"can'r leave bro"})
            } else {
                res.end();
            }
        })
    }
})

module.exports = route;
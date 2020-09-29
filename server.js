const e = require("express")
const userRoute = require("./api/usersRoute")
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);

const store = new KnexSessionStore();

const server = e();
const db = require("./data/dbConfig")


// configure express-session middleware
server.use(
  session({
    name: 'notsession', // default is connect.sid
    secret: 'nobody tosses a dwarf!',
    cookie: {
      maxAge: 1 * 24 * 60 * 60 * 1000,
      secure: false, // only set cookies over https. Server will not send back a cookie over http.
    }, // 1 day in milliseconds
    httpOnly: true, // don't let JS code access cookies. Browser extensions run JS code on your browser!
    resave: false,
    saveUninitialized: false,
    store
  })
);
server.use(e.json())

server.use("/users", userRoute)

server.listen(3000, ()=>{
    console.log("The server is running")
})

module.export = server;
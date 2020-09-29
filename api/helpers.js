const db = require("../data/dbConfig")

module.exports = {
    get,
    insert
}

function get(username){
    const query = db("User")
    if(username){
        return query
            .where("Username", username)
            .first()
            .then(user => {
                if(user){
                    return user;
                } else {
                    return null;
                }
            })
    }
    else {
        return query
        .then(users =>{
            return users;
        })
    }
}

function insert(data){
    const query = db("User")
    return query.insert(data, 'id')
        .then(([id]) => {
            return get(id);
        })
}
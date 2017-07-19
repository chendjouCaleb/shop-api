let connection = require("./DbConnection");

class User{
    static save(user, cb){
        connection.query("INSERT INTO user SET name=?, surname=?, email=?, gender=?, password=?, image=?, registrationDate=?",
        [user.name, user.surname, user.email, user.gender, user.password, user.image, new Date()],(err, result) => {
            if(err) throw err;
            cb(result.insertId);
        })
    }

    static update(user, cb){
        connection.query("UPDATE user SET name=?, surname=?, email=?, gender=?, password=?, image=? WHERE id=?",
        [user.name, user.surname, user.email, user.gender, user.password, user.image, user.id],(err, result) => {
            if(err) throw err;
            cb(result);
        })
    }

    static getById(id,cb){
        connection.query("SELECT * FROM user WHERE id=?", [id],(err, result) => {
            if(err) throw err;
            cb(result);
        })
    }

    static getByEmail(email,cb){
        connection.query("SELECT * FROM user WHERE email=?", [email],(err, result) => {
            if(err) throw err;
            cb(result);
        })
    }

    static getByEmailAndPassword(user,callback){
        connection.query("SELECT * FROM user WHERE email=? AND password=?",
        [user.email, user.password],(err, result) => {
            if(err) throw err;
            callback(result);
        })
    }

    static list(cb){
        connection.query("SELECT * FROM user",(err, result) => {
            if(err) throw err;
            cb(result);
        })
    }

    static deleteById(id, cb){
        connection.query("DELETE FROM user WHERE id=?", [id],(err, result) => {
            cb(err);
        })
    }
}

module.exports = User;
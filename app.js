var express = require("express");
var bodyParser = require("body-parser");
let userModel = require("./Model/User");
let config = require("./app.config");

let app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((request, response, next) =>{
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    response.setHeader('Access-Control-Allow-Credentials', true);
    next();
})

app.get("/api/users/:reg", (request, response) => {
    var param = request.params.reg;
    var user = null;
    if(/^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z]{2,6}$/.test(param)){
        userModel.getByEmail(param,function(user){
            console.log(user);
            response.json(user[0]);
        });
    }else{
        userModel.getById(param,function(user){
            console.log(user);
            response.json(user[0]);
        });
    }
});

app.delete("/api/users/:id", (request, response) => {
    userModel.deleteById(request.params.id,function(err){
        if(err)
            response.json(false);
        response.json(true);
    });
});

app.get("/api/users", (request, response) => {
    userModel.list(function(users){
        response.json(users);
    });
});

app.post("/api/users", (request, response) => {
    console.log("SAUVEGARDE");
    var user = request.body;
    userModel.save(user, (id) =>{
        user.id = id;
        console.log(user);
        response.json(user);
    });
});

app.post("/api/users/auth", (request, response) => {
    console.log("AUTH");
    var credential = request.body;
    console.log(credential);
    var user;
    userModel.getByEmailAndPassword(credential,function(user){
        console.log(user);
        response.json(user[0]);
    });
});


app.put("/api/users", (request, response) => {
    var user = request.body;
    userModel.update(user, (result) =>{
        response.json(user);
    });
});

app.use(function(req, res, next){
    res.setHeader('Content-Type', 'text/plain');
    console.log('Page introuvable !' + req.url + ":/"+req.subdomains);
    res.status(404).send('Page introuvable !');
});

app.listen(config.port);
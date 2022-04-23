const express = require('express');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
var User = require('./db');
const app = express();
const PORT = 8000;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

mongoose.connect('mongodb://localhost:27017/restapi', {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
  });

app.get('/', (req, res)=> {
    res.send("<h3>Welcome to REST API</h3><p>All users: http://localhost:8000/users</p><p>Specific User: http://localhost:8000/users/:id</p><p>Create new user: http://localhost:8000/create</p><p>Update user: http://localhost:8000/update/:id</p><p>Delete User: http://localhost:8000/delete/:id</p>");
})
app.get('/users', (req, res)=> {
    User.find({},function(err, users){
        if(err) {
            res.send('error has occured');
        } else {
            console.log(users);
            res.send(users)
        }
    });
})
app.get('/users/:id', (req, res)=> {
    User.find({_id: req.params.id},function(err, user){
        if(err) {
            res.send('error has occured');
        } else {
            console.log(user);
            res.send(user)
        }
    });
})
app.post('/create', (req, res)=> {
    var newUser = new User();
    newUser.name = req.body.name;
    newUser.email = req.body.email;
    newUser.education = req.body.education;
    newUser.experience = req.body.experience;
    newUser.save(function(err, user){
        if(err) {
            res.send('error saving user');
        } else {
            console.log(user);
            res.send(user);
        }
    });
})
app.put('/update/:id', (req, res)=> {
    User.findOneAndUpdate({
        _id: req.params.id
    },{
        $set: {
            name: req.body.name,
            email: req.body.email,
            education: req.body.education,
            experience: req.body.experience
        }
    },{
        upsert: true
    },function(err, newUser){
        if(err) {
            res.send('error updating book');
        } else {
            console.log(newUser);
            res.send(newUser);
        }
    });
})
app.delete('/delete/:id', (req, res)=> {
    User.findByIdAndRemove({
        _id: req.params.id
    },function(err, user){
        if(err) {
            res.send('error deleting user');
        } else {
            console.log(user);
            res.send(user);
        }
    });
})

app.listen(PORT, ()=> {
    console.log(`Server is listening to port:${PORT}`);
})
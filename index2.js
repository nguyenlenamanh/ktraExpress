const express = require('express');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');

const fs = require('fs');

const app = express();

const adapter = new FileSync('usersList/db.json')
const db = low(adapter)

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());

//cau2

// Seed data
var users = [
    {username: 'account1', password: '123456', status: 'Đã đăng ký'},
    {username: 'account2', password: '654321', status: 'Chưa đăng ký'},
    {username: 'account3', password: '147852', status: 'Đã đăng ký'},
    {username: 'account4', password: '963258', status: 'Chưa đăng ký'},
]

db.defaults({ user: users}).write();

// cách 1, sử dụng fs readfile
app.get('/',(req,res) => {
    var username = req.body.username;
    var password = req.body.password;
    var jsondata;

    fs.readFile('usersList/db.json',(err,data) => {
        if(err) throw err;

        jsondata = JSON.parse(data);
        var array = jsondata.user;
        
        userFound = array.find(x => x.username === username);

        if(userFound) {
            if(userFound.password === password) {               
                var obj = {
                    username: username,
                    status: userFound.status
                };
            }
        }

        if(!obj) obj = "Cannot login!";

        res.end(JSON.stringify(obj));
    });
});

// cách 2, sử dụng lowdb
app.get('/login', (req,res) => {
    var username = req.body.username;
    var password = req.body.password;

    var userFound = db.get('user').find({username: username}).value();

    if(userFound) {
        if(userFound.password === password) {
            var obj = {
                username: username,
                status: userFound.status
            };
            res.json(obj);
        }
    }

    res.json('Cannot login');
});

app.listen(3001);

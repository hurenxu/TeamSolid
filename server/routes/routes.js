var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost';

// Database Name
const dbName = 'team_solid_project';

// index
router.get('/', function (req, res) {
    res.render('index');
});


// insert operation
router.post('/insert', function (req, res, next) {
    var email = req.body.email;
    var passwd = req.body.password;

    MongoClient.connect(url, function (err, client) {
        const db = client.db(dbName);
        var cl = db.collection('userTable');
        var count;
        cl.count(function(err, num) {
            count=num;
            cl.insertOne({ _id:(count+1), userEmail: email, password: passwd}, function (err) {
                    if (err) throw err;
                    res.send("insertion success!");
            });
        });
    });
});

// read operation
router.get('/read', function (req, res) {
    MongoClient.connect(url, function (err, client) {
        const db = client.db(dbName);
        var cl = db.collection('userTable');
        cl.find({}).toArray(function(err,list){
            if (err) throw err;
            res.send(JSON.stringify(list));
        });
    });
});

router.get('/delete', function (req, res) {
    var email = req.body.email;
    MongoClient.connect(url, function (err, client) {
        const db = client.db(dbName);
        var cl = db.collection('userTable');
        cl.deleteOne({userEmail: email}, function(err){
            if(err) throw err;
            res.send("deletion success!");
        })
    });
});
module.exports = router;
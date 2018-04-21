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
    var name = req.body.name;

    MongoClient.connect(url, function (err, client) {
        const db = client.db(dbName);
        var cl = db.collection('userName');

        // Insert a single document
        cl.insertOne({ userName: name }, function (err, r) {
            /*cl.count(function(err, count) {
                res.send(JSON.stringify({tmp: count}));
            })*/
            cl.find({}).toArray(function(err,list){
                if (err) throw err;
                res.send(JSON.stringify(list)); 
            });
        });
    });
});

// insert operation
router.get('/read', function (req, res) {
    var name = req.body.name;

    MongoClient.connect(url, function (err, client) {
        const db = client.db(dbName);

        db.collection('userName').count(function(err, count) {
            console.log(count)
        })
    });
});


module.exports = router;
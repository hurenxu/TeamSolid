var express = require('express');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
var passport = require('passport')
var LocalStrategy = require('passport-local').Strategy;
// Connection URL
const url = 'mongodb://localhost';

// Database Name
const dbName = 'team_solid_project';

passport.serializeUser(function (user, done) {
    console.log(user)

    done(null, user._id);
});

passport.deserializeUser(function (id, done) {
    MongoClient.connect(url, function (err, client) {
        const db = client.db(dbName);

        const col = db.collection("accounts");

        col.findOne({ _id: id }, function (err, user) {
            console.log(user)
            console.log("haha")
            done(err, user);
        });
    })
});

passport.use(new LocalStrategy(
    function (username, password, done) {
        console.log(username)
        MongoClient.connect(url, function (err, client) {
            const db = client.db(dbName);

            const col = db.collection("accounts");

            col.findOne({ username: username }, function (err, user) {
                if (err) { return done(err); }
                console.log(user)
                if (!user) {
                    return done(null, false, { message: 'Incorrect username.' });
                }

                if (user.password != password) {
                    return done(null, false, { message: 'Incorrect password.' });
                }

                return done(null, user);
            });
        })
    }
));

// index
router.get('/', function (req, res) {
    res.render('index');
});

router.get('/loginpage', function (req, res) {
    res.render('loginpage');
});

router.get('/profile',
    require('connect-ensure-login').ensureLoggedIn(),
    function (req, res) {
        res.send('profile');
    });

router.post('/login',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/loginpage'
    }));

router.post('/register', function (req, res, next) {
    var uname = req.body.username;
    var pwd = req.body.password;

    MongoClient.connect(url, function (err, client) {
        const db = client.db(dbName);
        var cl = db.collection('accounts');
        var count;
        cl.count(function (err, num) {
            count = num;
            cl.insertOne({ _id: (count + 1), username: uname, password: pwd }, function () {
                console.log('insert!' + uname + ' ' + pwd);
            });
        });
    });
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
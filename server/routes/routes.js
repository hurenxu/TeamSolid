var express = require('express');
let multer = require('multer');
var multerupload = multer({dest: 'tarDirectory/'});
var path = require('path');
var router = express.Router();
const MongoClient = require('mongodb').MongoClient;
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var googleapi = require('googleapis');
// Connection URL
const url = 'mongodb://localhost';

// Database Name
const dbName = 'team_solid_project';

passport.serializeUser(function (user, done) {
    done(null, user._id);
});

passport.deserializeUser(function (id, done) {
    MongoClient.connect(url, function (err, client) {
        const db = client.db(dbName);

        const col = db.collection("accounts");

        col.findOne({_id: id}, function (err, user) {
            done(err, user);
        });
        //  client.close();
    })
});

passport.use(new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    },
    function (username, password, done) {
        MongoClient.connect(url, function (err, client) {
            const db = client.db(dbName);

            const col = db.collection("accounts");

            col.findOne({email: username}, function (err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, false, {message: 'Incorrect username.'});
                }

                if (user.password != password) {
                    return done(null, false, {message: 'Incorrect password.'});
                }

                console.log(username + ' success')
                return done(null, user);
            });
            //  client.close();
        })
    }
));

// index
router.get('/',
    require('connect-ensure-login').ensureLoggedIn(),
    function (req, res) {
        res.render('index');
    });

router.get('/login', function (req, res) {
    if (req.user) {
        req.logout();
    }

    res.render('loginpage');
});

router.get('/loginsuccess',
    require('connect-ensure-login').ensureLoggedIn(),
    function (req, res) {
        res.json(JSON.stringify({islogined: true}))
    });

router.post('/api/islogined', function (req, res, next) {
    if (req.user) {
        res.json(JSON.stringify({islogined: true}))
    } else {
        res.json(JSON.stringify({islogined: false}))
    }
});


router.get('/loginfail',
    function (req, res) {
        res.json(JSON.stringify({islogined: false}))
    });

router.post('/api/logout', function (req, res) {
    req.logout();
    res.redirect('/login');
});

router.post('/api/login',
    passport.authenticate('local', {
        successRedirect: '/loginsuccess',
        failureRedirect: '/loginfail'
    }));

router.post('/api/getUserName',
    require('connect-ensure-login').ensureLoggedIn(),
    function (req, res, next) {
        var eml = req.user.email;

        MongoClient.connect(url, function (err, client) {
            if (err) {
                console.log(err);
            }

            const db = client.db(dbName);

            db.collection("userinfo").find({sid: eml}).toArray(function (err, result) {
                if (err) {
                    console.log(err);
                }

                res.json(JSON.stringify({"username": result[0].username}));
            });
            //  client.close();
        });
    });

router.post('/api/getUserEmail',
    require('connect-ensure-login').ensureLoggedIn(),
    function (req, res, next) {
        res.json(JSON.stringify({"username": req.user.email}));
    });

router.route('/api/signup').post(multerupload.any(), function (req, res, next) {
    var eml = req.body.email;
    var pwd = req.body.password;
    var sub = false;
    var usrname = req.body.username;
    var sfiles = []

    if ('files' in req) {
        for (var i = 0; i < req.files.length; i++) {
            sfiles.push({filename: req.files[i].filename, filetype: req.files[i].mimetype})
        }
    }

    MongoClient.connect(url, function (err, client) {
        const db = client.db(dbName);
        var cl = db.collection('accounts');
        var count;
        db.collection('userinfo').find({sid: eml}).toArray(function (err, result) {
            if (result.length == 0) {
                cl.count(function (err, num) {
                    count = num;
                    cl.insertOne({_id: (count + 1), username: usrname, email: eml, password: pwd}, function () {
                        console.log('insert!' + eml + ' ' + pwd);

                        db.collection('userinfo').insertOne({
                            userid: (count + 1),
                            sid: eml,
                            email: eml,
                            username: usrname,
                            userIconUrl: sfiles,
                            friends: [],
                            pendingRequests: [],
                            follow: [eml],
                            sub: sub
                        }, function () {
                            res.json(JSON.stringify({result: "OK"}));
                        })
                    });
                });
            } else {
                res.json(JSON.stringify({result: "DUP"}));
            }
        })
        //  client.close();
    });
});

router.post('/api/getuserIconUrl',
    require('connect-ensure-login').ensureLoggedIn(),
    function (req, res, next) {
        var eml = req.user.email;

        MongoClient.connect(url, function (err, client) {
            const db = client.db(dbName);
            db.collection('userinfo').find({sid: eml}).toArray(function (err, result) {
                if (err) {
                    console.log(err);
                }

                res.json(JSON.stringify({userIconUrl: result[0].userIconUrl}));
            });
            //  client.close();
        });
    });

router.post('/api/getsub',
    require('connect-ensure-login').ensureLoggedIn(),
    function (req, res, next) {
        var eml = req.user.email;
        var response = null;
        MongoClient.connect(url, function (err, client) {
            const db = client.db(dbName);
            response = db.collection('userinfo').find({sid: eml}).toArray(function (err, result) {
                if (err) {
                    console.log(err);
                }

                res.json(JSON.stringify({sub: result[0].sub}));
            });
            //  client.close();
        });
    });

router.post('/api/setsub',
    require('connect-ensure-login').ensureLoggedIn(),
    function (req, res, next) {
        var eml = req.user.email;
        var sub = req.body.sub;
        MongoClient.connect(url, function (err, client) {
            const db = client.db(dbName);
            db.collection('userinfo').updateOne({sid: eml}, {$set: {"sub": sub}});
            //  client.close();
        });
    });

router.post('/api/switchChatTarget',
    require('connect-ensure-login').ensureLoggedIn(),
    function (req, res, next) {
        var sourceid = req.user.email;
        var targetid = req.body.tid;

        MongoClient.connect(url, function (err, client) {
            const db = client.db(dbName);

            db.collection("messages").find({sid: sourceid, tid: targetid}).toArray(function (err, result1) {
                if (err) {
                    console.log(err);
                }

                db.collection("messages").find({sid: targetid, tid: sourceid}).toArray(function (err, result2) {
                    if (err) {
                        console.log(err);
                    }
                    res.json(JSON.stringify(result1.concat(result2)));
                });
            });
            //  client.close();
        });
    });

router.post('/api/searchUser',
    require('connect-ensure-login').ensureLoggedIn(),
    function (req, res, next) {
        var key = req.body.searchKey;

        MongoClient.connect(url, function (err, client) {
            if (err) {
                console.log(err);
            }

            const db = client.db(dbName);

            db.collection("userinfo").find({sid: key}).toArray(function (err, result) {
                if (err) {
                    console.log(err);
                }

                res.json(JSON.stringify(result[0]));
            });
            //  client.close();

        });
    });

router.post('/api/addPendingList',
    require('connect-ensure-login').ensureLoggedIn(),
    function (req, res, next) {
        var sourceid = req.user.email;
        var targetid = req.body.tid;
        console.log(sourceid)
        console.log(targetid)

        MongoClient.connect(url, function (err, client) {
            const db = client.db(dbName);
            db.collection("userinfo").find({sid: targetid}).toArray(function (err, result) {
                if (err) {
                    console.log(err);
                }
                if(result[0].pendingRequests.includes(sourceid)){
                    res.json(JSON.stringify(result[0].pendingRequests));
                }
                else{
                    db.collection("userinfo").update({sid: targetid}, {$push: {pendingRequests: sourceid}}, function (err) {
                        if (err) {
                            console.log(err);
                        }
                        db.collection("userinfo").find({sid: targetid}).toArray(function (err, result) {
                            if (err) {
                                console.log(err);
                            }
                            res.json(JSON.stringify(result[0].pendingRequests));
                        });
                    });
                }
            });
            //  client.close();

        });
    });


router.post('/api/updateFriendList',
    require('connect-ensure-login').ensureLoggedIn(),
    function (req, res, next) {
        var sourceid = req.user.email;
        var targetid = req.body.tid;
        var actionType = req.body.actionType;

        MongoClient.connect(url, function (err, client) {
            const db = client.db(dbName);

            if (actionType == "delete") {
                db.collection("userinfo").update({sid: sourceid}, {$pullAll: {friends: [targetid]}}, function (err) {
                    if (err) {
                        console.log(err);
                    }
                    db.collection("userinfo").update({sid: targetid}, {$pullAll: {friends: [sourceid]}}, function (err) {
                        if (err) {
                            console.log(err);
                        }
                    });
                    db.collection("userinfo").find({sid: sourceid}).toArray(function (err, result) {
                        if (err) {
                            console.log(err);
                        }
                        res.json(JSON.stringify(result[0].friends));
                    });
                });
            } else if (actionType == "add") {
                db.collection("userinfo").update({sid: sourceid}, {$push: {friends: targetid}}, function (err) {
                    if (err) {
                        console.log(err);
                    }
                    db.collection("userinfo").update({sid: targetid}, {$push: {friends: sourceid}}, function (err) {
                        if (err) {
                            console.log(err);
                        }

                        db.collection("userinfo").update({sid: targetid}, {$push: {follow: sourceid}}, function (err) {
                            if (err) {
                                console.log(err);
                            }

                            db.collection("userinfo").update({sid: sourceid}, {$push: {follow: targetid}}, function (err) {
                                if (err) {
                                    console.log(err);
                                }
                            });
                        });
                    });
                    // Delete pending requests from both sides
                    db.collection("userinfo").update({sid: sourceid}, {$pullAll: {pendingRequests: [targetid]}}, function (err) {
                        if (err) {
                            console.log(err);
                        }
                        db.collection("userinfo").update({sid: targetid}, {$pullAll: {pendingRequests: [sourceid]}}, function (err) {
                            if (err) {
                                console.log(err);
                            }
                        });
                    });
                    db.collection("userinfo").find({sid: sourceid}).toArray(function (err, result) {
                        if (err) {
                            console.log(err);
                        }
                        res.json(JSON.stringify(result[0].friends));
                    });
                });
            }
            //  client.close();
        });
    });

router.post('/api/getPendingList',
    require('connect-ensure-login').ensureLoggedIn(),
    function (req, res, next) {
        var key = req.user.email;

        MongoClient.connect(url, function (err, client) {
            if (err) {
                console.log(err);
            }

            const db = client.db(dbName);

            db.collection("userinfo").find({sid: key}).toArray(function (err, result) {
                if (err) {
                    console.log(err);
                }
                res.json(JSON.stringify(result[0].pendingRequests));
            });
            //  client.close();
        });
    });

router.post('/api/getFriendList',
    require('connect-ensure-login').ensureLoggedIn(),
    function (req, res, next) {
        var key = req.user.email;

        MongoClient.connect(url, function (err, client) {
            if (err) {
                console.log(err);
            }
            const db = client.db(dbName);

            db.collection("userinfo").find({sid: key}).toArray(function (err, result) {
                if (err) {
                    console.log(err);
                }
                res.json(JSON.stringify(result[0].friends));
            });
            //  client.close();

        });
    });

router.post('/api/ChangeToPost',
    require('connect-ensure-login').ensureLoggedIn(),
    function (req, res, next) {
        var sourceid = req.user.email;

        MongoClient.connect(url, function (err, client) {
            if (err) {
                console.log(err);
            }
            const db = client.db(dbName);
            db.collection("userinfo").find({sid: sourceid}).toArray(function (err, result) {
                var follows = result[0].follow;


                db.collection("posts").find({sid: {$in: follows}}).toArray(function (err, result) {
                    if (err) {
                        console.log(err);
                    }

                    res.json(JSON.stringify(result));
                });
            })
            //  client.close();

        });
    });

router.post('/api/ChangeToMessage',
    require('connect-ensure-login').ensureLoggedIn(),
    function (req, res, next) {
        var sourceid = req.user.email;
        var targetid = req.body.tid;

        MongoClient.connect(url, function (err, client) {
            const db = client.db(dbName);

            db.collection("messages").find({sid: sourceid, tid: targetid}).toArray(function (err, result1) {
                if (err) {
                    console.log(err);
                }
                db.collection("messages").find({sid: targetid, tid: sourceid}).toArray(function (err, result2) {
                    if (err) {
                        console.log(err);
                    }
                    res.json(JSON.stringify(result1.concat(result2)));
                });
            });
            //  client.close();

        });
    });

/*
{
    postid: xxx,
    sid: xx,
    likedUsers: [
        ...
        sourceid
    ]
    likecount:
    messazge:...
}
 */
router.post('/api/LikeAPost',
    require('connect-ensure-login').ensureLoggedIn(),
    function (req, res, next) {
        var sourceid = req.user.email;
        var pid = req.body.postid;

        MongoClient.connect(url, function (err, client) {
            const db = client.db(dbName);

            db.collection("posts").find({postid: pid}).toArray(function (err, result) {
                if (err) {
                    console.log(err);
                }
                var users = result[0].likedUsers;

                if (users.indexOf(sourceid) != -1) {
                    res.json(JSON.stringify({result: "DUP"}));
                } else {
                    db.collection("posts").update({postid: pid}, {$push: {likedUsers: sourceid}}, function (err) {
                        if (err) {
                            console.log(err);
                        }
                        db.collection("posts").find({postid: pid}).toArray(function (err, result) {
                            if (err) {
                                console.log(err);
                            }
                            var count = result[0].likecount

                            db.collection("posts").update({postid: pid}, {$set: {likecount: (count + 1)}}, function (err) {
                                if (err) {
                                    console.log(err);
                                }

                                res.json(JSON.stringify({result: "OK", count: count + 1}));
                            });
                        });
                    });
                }
            });
            //  client.close();

        });
    });

router.post('/api/postMessage',
    require('connect-ensure-login').ensureLoggedIn(),
    function (req, res, next) {
        var sourceid = req.user.email;
        var targetid = req.body.to;
        var mmsg = req.body.msg;
        var mdate = req.body.date;

        MongoClient.connect(url, function (err, client) {
            if (err) {
                console.log(err);
            }
            const db = client.db(dbName);

            db.collection("posts").count(function (err, num) {
                db.collection("messages").insertOne({sid: sourceid, tid: targetid, msg: mmsg, date: mdate}, function (err) {
                    if (err) {
                        console.log(err);
                    }

                    res.json(JSON.stringify({result: "OK"}));
                });
            });
            //  client.close();

        });
    });

router.route('/resource/:id').get(require('connect-ensure-login').ensureLoggedIn(),
    function (req, res, next) {
        var sourceid = req.user.email;
        var url = req.params.id;

        console.log(__dirname);

        res.sendFile(path.resolve(__dirname + '/../../tarDirectory/' + url))
    });

router.route('/api/postPost').post(multerupload.any(), require('connect-ensure-login').ensureLoggedIn(),
    function (req, res, next) {
        var sourceid = req.user.email;
        var pmsg = req.body.msg;
        var pdate = req.body.date;
        var paspect = req.body.aspect;
        var pfiles = []

        console.log('one post');

        if ('files' in req) {
            for (var i = 0; i < req.files.length; i++) {
                pfiles.push({filename: req.files[i].filename, filetype: req.files[i].mimetype})
            }
        }

        MongoClient.connect(url, function (err, client) {
            if (err) {
                console.log(err);
            }
            const db = client.db(dbName);

            db.collection("posts").count(function (err, num) {
                db.collection("posts").insertOne({
                    postid: (num + 1),
                    sid: sourceid,
                    files: pfiles,
                    aspect: paspect,
                    likedUsers: [],
                    likecount: 0,
                    msg: pmsg,
                    comment: [],
                    data: pdate
                }, function (err) {
                    if (err) {
                        console.log(err);
                    }

                    db.collection("userinfo").find({sid: sourceid}).toArray(function (err, result) {
                        var follows = result[0].follow;

                        db.collection("posts").find({sid: {$in: follows}}).toArray(function (err, result) {
                            if (err) {
                                console.log(err);
                            }
                            res.json(JSON.stringify(result));
                        });
                    })
                });
            });
            //  client.close();

        });
    });

router.post('/api/getPosts',
    require('connect-ensure-login').ensureLoggedIn(),
    function (req, res, next) {
        var sourceid = req.user.email;
        var paspect = req.body.aspect;

        MongoClient.connect(url, function (err, client) {
            if (err) {
                console.log(err);
            }
            const db = client.db(dbName);

            db.collection("userinfo").find({sid: sourceid}).toArray(function (err, result) {
                var follows = result[0].follow;

                db.collection("posts").find({sid: {$in: follows}, aspect: paspect}).toArray(function (err, result) {
                    if (err) {
                        console.log(err);
                    }

                    res.json(JSON.stringify(result));
                });
            });
            //  client.close();
        });
    });

router.post('/api/comment',
    require('connect-ensure-login').ensureLoggedIn(),
    function (req, res, next) {
        var sourceid = req.user.email;
        var cmsg = req.body.comment;
        var cpid = req.body.pid;
        var cdate = req.body.date;
        var uname = req.body.uname;
        MongoClient.connect(url, function (err, client) {
            if (err) {
                console.log(err);
            }
                const db = client.db(dbName);
            db.collection("posts").update({ sid: uname, postid: cpid }, { $push: { comment: { msg: cmsg, cid: sourceid, date: cdate } } }, function (err) {
                if (err) {
                    res.json(JSON.stringify({ result: "FAIL" }));
                } else {
                    res.json(JSON.stringify({ result: "OK" }));
                }
            });
            //  client.close();
        });
    });

router.post('/api/sendEmail',
    require('connect-ensure-login').ensureLoggedIn(),
    function (req, res, next) {
        var nodemailer = require('nodemailer');

        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'maoxianxianxian@gmail.com',
                pass: '6295141.3'
            }
        });

        var mailOptions = {
            from: 'maoxianxianxian@gmail.com',
            to: 'maoxianxianxian@gmail.com',
            subject: 'Perterbook contact from user',
            text: req.body.content
        };
        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });
    });

router.post('/api/follow',
    require('connect-ensure-login').ensureLoggedIn(),
    function (req, res, next) {
        var sourceid = req.user.email;
        var targetid = req.body.tid;

        MongoClient.connect(url, function (err, client) {
            const db = client.db(dbName);

            db.collection("userinfo").find({sid: sourceid}).toArray(function (err, result) {
                if (err) {
                    console.log(err);
                }

                if (result[0].follow.indexOf(targetid) != -1) {
                    res.json(JSON.stringify({result: "DUP"}));
                } else {
                    db.collection("userinfo").update({sid: sourceid}, {$push: {follow: targetid}}, function (err) {
                        if (err) {
                            res.json(JSON.stringify({result: "FAIL"}));
                        } else {
                            res.json(JSON.stringify({result: "OK"}));
                        }
                    });
                }
            });
            //  client.close();
        });
    });


router.post('/api/unfollow',
    require('connect-ensure-login').ensureLoggedIn(),
    function (req, res, next) {
        var sourceid = req.user.email;
        var targetid = req.body.tid;

        MongoClient.connect(url, function (err, client) {
            const db = client.db(dbName);

            db.collection("userinfo").update({sid: sourceid}, {$pullAll: {follow: [targetid]}}, function (err) {
                if (err) {
                    console.log(err)
                    res.json(JSON.stringify({result: "FAIL"}));
                } else {
                    res.json(JSON.stringify({result: "OK"}));
                }
            });
            //  client.close();

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
        cl.count(function (err, num) {
            count = num;
            cl.insertOne({_id: (count + 1), userEmail: email, password: passwd}, function (err) {
                if (err) throw err;
                res.send("insertion success!");
            });
        });
        //  client.close();
    });
});

// read operation
router.get('/read', function (req, res) {
    MongoClient.connect(url, function (err, client) {
        const db = client.db(dbName);
        var cl = db.collection('userTable');
        cl.find({}).toArray(function (err, list) {
            if (err) throw err;
            res.send(JSON.stringify(list));
        });
        //  client.close();
    });
});

router.get('/delete', function (req, res) {
    var email = req.body.email;
    MongoClient.connect(url, function (err, client) {
        const db = client.db(dbName);
        var cl = db.collection('userTable');
        cl.deleteOne({userEmail: email}, function (err) {
            if (err) throw err;
            res.send("deletion success!");
        })
        //  client.close();
    });
});
module.exports = router;

// KMS service
const projectId = 'superb-blend-201518';
// The location of the new key ring, e.g. "global"
const locationId = 'global';

// The name of the new key ring, e.g. "my-new-key-ring"
const keyRingId = 'user-keyring';

const keyId = 'user-key';


// connect to google kms api
function buildAndAuthorizeService(callback) {
    // Imports the Google APIs client library
    const google = require('googleapis').google;

    // Acquires credentials
    google.auth.getApplicationDefault((err, authClient) => {
        if (err) {
            callback(err);
            return;
        }

        if (authClient.createScopedRequired && authClient.createScopedRequired()) {
            authClient = authClient.createScoped([
                'https://www.googleapis.com/auth/cloud-platform'
            ]);
        }

        // Instantiates an authorized client
        const cloudkms = google.cloudkms({
            version: 'v1',
            auth: authClient
        });

        callback(null, cloudkms);
    });
}

function encrypt(msg) {
    buildAndAuthorizeService((err, cloudkms) => {
        if (err) {
            console.log(err);
            return;
        }

        const request = {
            // This will be a path parameter in the request URL
            name: `projects/${projectId}/locations/${locationId}/keyRings/${keyRingId}/cryptoKeys/${cryptoKeyId}`,
            // This will be the request body
            resource: {
                plaintext: Buffer.from(msg, 'utf8').toString('base64')
            }
        };

        console.log("encrypting" + msg);

        // Encrypts the file using the specified crypto key
        cloudkms.projects.locations.keyRings.cryptoKeys.encrypt(request, (err, response) => {
            if (err) {
                console.log(err);
                return;
            }

            // Writes the encrypted file to disk
            const result = response.data;
            console.log("encrypted data is: " + result.ciphertext);
            return result.ciphertext;
        });
    });
}

router.post('/api/testencrypt',
    function (req, res, next) {
        console.log("encrypting post!");
        var msg = encrypt(req.user.email);
        console.log(msg);
        console.log("aa");
        MongoClient.connect(url, function (err, client) {
            if (err) {
                console.log(err);
            }

            const db = client.db(dbName);

            db.collection("test").insertOne(msg, function (err, res) {
                if (err) throw err;
                console.log("msg inserted: " + msg);
                db.close();
            })
            //  client.close();
        });
    });

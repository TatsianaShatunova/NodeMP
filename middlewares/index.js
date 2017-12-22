
    const cookieParser = require('cookie-parser')
    const app = require('../app').app
    const router = require("../app").router;
    const passport = require('passport');
    const strategy = require('passport-local').Strategy;
    const autConf = require('../config/auth');
    const facebookStrategy = require('passport-facebook').Strategy;

    
    app
        .use((req, res, next) => {
            // emulate cookie
            req.headers.cookie = 'field1=4355232654;field2=654376575;field3=KYUFQEFFBQ'
            next();
        })
        .use(cookieParser())
   
        .use((req, res, next) => {
           
            req.parsedCookies = req.cookies;
            next();
        })

        .use(setParsedQuery)
        .use('/', router);
    
    
    function setParsedQuery(req, res, next) {
        req.parsedQuery = req.body;
        next();
    }
    
    app.use(passport.initialize());
    app.use(passport.session());
    
    
    const login = "testLogin";
    const password = "testPassword";
    
    const localTokens = [{
        id: "testLogin",
        token: '56g2-67fd-f543'    
    }]
    
    // passport.use(new strategy({
    //     usernameField: "login",
    //     passwordField: "password"
    // }, function (username, password, done) {
    //     if (username !== login || password !== password) {
    //         done(null, false, 'Incorrect login or password');
    //     } else {
    //         done(null, { code: 200, message: 'OK', data: { user: { username: login } } })
    //     }
    // }
    // ));
    
    passport.use(new facebookStrategy({
                clientID        : autConf.facebookAuth.clientID,
                clientSecret    : autConf.facebookAuth.clientSecret,
                callbackURL     : autConf.facebookAuth.callbackURL    
            }, function(accessToken, refreshToken, profile, done) {
                console.log(profile);
                if(profile){
                    return done(null, profile);
                } else{
                    done(null, 'Incorrect login or password');
                }
              }       
            ));
            
    
    function checkToken(req, res, next) {
        let tkn = req.headers['x-access-token'];
    
        if (tkn) {
            jwt.verify(tkn, 'sign', function (err, decoded) {
                if (err) {
                    res.json({ code: 404, message: 'Failed to authenticate token!' });
                } else {
                    next();
                }
            })
        } else {
            res.status(404).send({ code: 404, message: 'No token provided!' });
        }
    }








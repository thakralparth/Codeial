const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const User=require('../models/users');

//authentication using passport
passport.use(new LocalStrategy({
    usernameField:'email'     //here email is from models
},
function(email,password,done){      //done is my callback function which is reporting back to passport.js
    //find a user and establish the identity
    User.findOne({email:email},function(err,user){       //email:email  -> model's email:email passed
        if(err){
            console.log('Error in finding user ---> Passport');
            return done(err);
        }
        if(!user || user.password!=password){
            console.log('Invalid Username/Password');
            return done(null,false);                //(null,false) -> (not error,user not found/invalid)
        }
        return done(null,user);
    });
}));

//serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function(user,done){
    done(null,user.id);      //setting id(encrypted) in cookie & cookie is sent to browser 
});

//deserializing the user from the key in the cookies
passport.deserializeUser(function(id,done){     //now browser makes a request ,so cookie is deserialized & finds user using id
    User.findById(id,function(err,user){
        if(err){
            console.log('Error in finding user ---> Passport');
            return done(err);
        }
        return done(null,user);
    });
});


//check if the user is authenticated
passport.checkAuthentication=function(req,res,next){
    //if the user is signed in then pass on the request to the next function (controller's action)
    if(req.isAuthenticated()){
        return next();
    }

    //if the user is not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser=function(req,res,next){
    if(req.isAuthenticated()){
        //req.user contains the current signed in user from the session cookie and we are just sending 
        //this to the locals for the views
        // console.log(req.user);
        res.locals.user=req.user;
    }
    next();
}

module.exports=passport; 
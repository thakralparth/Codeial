module.exports.profile=function(req,res){
    // res.end('<h1>User Profile</h1>');
    res.render('user_profile',{
        title:'Profile Page ...'
    });
}

//render the signup Page
module.exports.signUp=function(req,res){
    return res.render('user_sign_up',{
        title:"Codeial | Sign Up"
    })
}

//render the signin Page
module.exports.signIn=function(req,res){
    return res.render('user_sign_in',{
        title:"Codeial | Sign In"
    })
}

//get the signUp data
module.exports.create=function(req,res){
    // TODO later 
}

//SignIn and create session for user
module.exports.createSession=function(req,res){
    // TODO later 
}


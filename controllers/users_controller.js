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


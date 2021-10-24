const User=require('../models/users');

module.exports.profile=function(req,res){
    // res.end('<h1>User Profile</h1>');

    // res.render('user_profile',{
    //     title:'Profile Page ...'
    // });

    if(req.cookies.user_id){
        User.findById(req.cookies.user_id,function(err,user){
            if(user){
                return res.render('user_profile',{
                    title:"User Profile",
                    user:user
                })
            }
            return res.redirect('/users/sign-in');
        })
    }else{
        return res.redirect('/users/sign-in');
    }
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
    if(req.body.password!=req.body.confirm_password){
        return res.redirect('back');
    }

    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log('Error in finding user in Signing Up');
            return;
        }

        if(!user){
            User.create(req.body,function(err,user){
                if(err){
                    console.log('Error in creating a user while signing up');
                    return;
                }
                return res.redirect('/users/sign-in');
            })
        }else{
            return res.redirect('back');
        }
    });
}

//SignIn and create session for user
module.exports.createSession=function(req,res){
    //steps to authenticate
    // 1 find the user
    User.findOne({email:req.body.email},function(err,user){
        if(err){
            console.log('Error in finding user in Signing In');
            return;
        }
        //handle user found
        if(user){
            //handle password which doesnot match
            if(user.password!=req.body.password){
                return res.redirect('back');
            }

            //handle cookie creation
            res.cookie('user_id',user.id);
            return res.redirect('/users/profile');
        }else{
            
            //handle user not found
            return res.redirect('back');
        }

    });
}

module.exports.signOut=function(req,res){
    res.clearCookie('user_id');
    return res.redirect('sign-in');
}


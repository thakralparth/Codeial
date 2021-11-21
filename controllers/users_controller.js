const { request } = require('express');
const User=require('../models/users');

module.exports.profile=function(req,res){
    // res.end('<h1>User Profile</h1>');
    User.findById(req.params.id,function(err,user){
        return res.render('user_profile',{
            title:'Profile Page ...',
            profile_user: user 
        });
    });
    
}


module.exports.update=async function(req,res){
    // if(req.user.id==req.params.id){
    //     User.findByIdAndUpdate(req.params.id,req.body,function(err,user){  //req.body={name:req.body.name,email:req.body.email}
    //         return res.redirect('back');
    //     })
    // }else{
    //     return res.status(401).send('Unauthorized');
    // }
if(req.user.id==req.params.id){
    try{
        let user=await User.findById(req.params.id);
        //as the data send by the form is multipart , normal body parser won't help to access that data
        // therefore we'll take help of multer---as it contains req property
        User.uploadedAvatar(req,res,function(err){
            if(err){
                console.log('*****Multer Error', err)
            }
            // console.log(req.file);
            user.name=req.body.name;
            user.email=req.body.email;

            if(req.file){
                //this is saving the path of the uploaded file into the avatar field in the user 
                user.avatar=User.avatarPath + '/' + req.file.filename;
            }
            // console.log(user);
            user.save();
            return res.redirect('back');
        })
    }catch(err){
        req.flash('error',err);
        return res.redirect('back');
    }
}else{
    req.flash('error',err);
    return res.status(401).send('Unauthorized');
}
    
    
}

//render the signup Page
module.exports.signUp=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_up',{
        title:"Codeial | Sign Up"
    })
}

//render the signin Page
module.exports.signIn=function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile');
    }

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
                req.flash('success','User signed-up!');
                return res.redirect('/users/sign-in');
            })
        }else{
            req.flash('error','Email-id unavailable!');
            return res.redirect('back');
        }
    });
}

//SignIn and create session for user
module.exports.createSession=function(req,res){
    // TODO later 
    req.flash('success','Logged in successfully');
    return res.redirect('/');
}


//remove session
module.exports.destroySession=function(req,res){
    req.logout();   //here logout property is provided to request by passport
    req.flash('success','You have been logged out');
    res.redirect('/');
}

const Comment=require('../models/comment');
const Post=require('../models/post');

module.exports.create=function(req,res){
    Post.findById(req.body.post,function(err,post){     //comment will be added on a valid post

        if(post){
            Comment.create({
                content:req.body.content,    //from the form 
                post:req.body.post,     //from the form , sent hidden post and post id
                user:req.user._id
            },function(err,comment){
                //handle error
                if(err){
                    console.log('Error in creating a comment');
                    return;
                }

                post.comments.push(comment);    //update the desired post with the comment
                post.save();   //to move data from RAM memory to database

                res.redirect('/');
            })
        }
    })
}
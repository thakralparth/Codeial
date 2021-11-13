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

//deleting comment
module.exports.destroy=function(req,res){
    Comment.findById(req.params.id,function(err,comment){
        if(comment.user==req.user.id){
            let postId=comment.post;   //store post id in a var before deleting comment to remove comment from post later
            Post.findByIdAndUpdate(postId,{ $pull : {comments:req.params.id}},function(err,post){
                return res.redirect('back');   //$pull--- pulls and throws out the stored value
            })
        }else{
            return res.redirect('back');
        }
    })
}
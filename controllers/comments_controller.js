const Comment=require('../models/comment');
const Post=require('../models/post');

module.exports.create=async function(req,res){
    try{
        let post=await Post.findById(req.body.post);    //comment will be added on a valid post

        if(post){
            let comment=await Comment.create({
                content:req.body.content,    //from the form 
                post:req.body.post,     //from the form , sent hidden post and post id
                user:req.user._id
            });

            post.comments.push(comment);    //update the desired post with the comment
            post.save();   //to move data from RAM memory to database

            res.redirect('/');
        }
    }catch(err){
        console.log('Error',err);
        return;
    }
}
 
 
//deleting comment
module.exports.destroy=async function(req,res){
    try{
        let comment=await Comment.findById(req.params.id);
        if(comment.user==req.user.id){
            let postId=comment.post;   //store post id in a var before deleting comment to remove comment from post later
            comment.remove();
            
            let post=await Post.findByIdAndUpdate(postId,{ $pull : {comments: req.params.id}});

            return res.redirect('back');   //$pull--- pulls and throws out the stored value
            
        }else{
            return res.redirect('back');
        }
    }catch(err){
        console.log("error",err);
        return;
    }

}
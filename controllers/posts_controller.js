const Post=require('../models/post');
const Comment=require('../models/comment');

module.exports.create=async function(req,res){
    try{
        await Post.create({
            content:req.body.content,
            user:req.user._id
        });
        req.flash('success','Post created successfully');
        return res.redirect('back');

    }catch(err){
        req.flash('Error',err);
        return;
    }

}


//The req.params property is an object containing properties mapped to the named route “parameters”. 
//For example, if you have the route /student/:id, then the “id” property is available as req.params.id. 
module.exports.destroy=async function(req,res){
    try{
        let post=await Post.findById(req.params.id);
        // .id means converting the object id to string (instead of ._id)
    if(post.user==req.user.id){
        post.remove();

        await Comment.deleteMany({post:req.params.id});  //query for deleting comments of post:id of that post
        req.flash('success','Post and its associated comments removed');  
        return res.redirect('back');
        
    }else{
        return res.redirect('back');
    }
    }catch(err){
        req.flash("Error",err);
        return;
    }
 
}
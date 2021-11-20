const Post=require('../models/post');
const Comment=require('../models/comment');

module.exports.create=async function(req,res){
    try{
        let post= await Post.create({
            content:req.body.content,
            user:req.user._id
        });

        if(req.xhr){   //xml http request
            // req.flash('success','New Post successfully added!');
            return res.status(200).json({    //we return json with a status
                data:{
                    post:post
                },
                message:'post created!'
            })
        }

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

        if(req.xhr){
            return res.status(200).json({
                data:{
                    post_id:req.params.id
                },
                message:'Post deleted'
            });
        }



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
const Post=require('../../../models/post');
const Comment=require('../../../models/comment');

module.exports.index=async function(req,res){

    let posts= await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    });

    return res.json(200,{
        message:"List of Posts",
        posts:posts
    })
}


module.exports.destroy=async function(req,res){
    try{
        let post=await Post.findById(req.params.id);
        // .id means converting the object id to string (instead of ._id)
    
        post.remove();

        await Comment.deleteMany({post:req.params.id});  //query for deleting comments of post:id of that post

        


        // req.flash('success','Post and its associated comments removed');  
        return res.json(200,{
            message:"Post and associated comments deleted successfully"
        })
        
    
    }catch(err){
        
        returnres.json(500,{
            message:"Internal server error"
        });
    }
 
}
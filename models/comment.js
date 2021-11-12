const mongoose= require('mongoose');

const commentSchema=new mongoose.Schema({
    content:{
        type:String,
        required:true 
    },
    //as a comment is made by a user
    user: {
        //this type is a reference to user's schema as the post is linked to a particular user
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'  //which Schema
    },
    //comment is made on a particular post
    post: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'Post'
    }

},{
    timestamps:true 
})

const Comment=mongoose.model('Comment',commentSchema);  //Declaring that Comment is going to be a model in tha database

module.exports=Comment;
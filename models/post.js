const mongoose= require('mongoose');

const postSchema=new mongoose.Schema({
    content:{
        type:String,
        required:true 
    },
    user: {
        //this type is a reference to user's schema as the post is linked to a particular user
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'  //which Schema
    },
    //include the array of ids of all comments in the post schema itself
    comments:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Comment'
        }
    ]
},{
    timestamps:true 
})

const Post=mongoose.model('Post',postSchema);  //Declaring that Post is going to be a model in tha database

module.exports=Post;
const Post=require('../models/post');
const User=require('../models/users');

module.exports.home= async function(req,res){
    // return res.end('<h1>Express is up for Codeial</h1>')

    // console.log(req.cookies);
    // res.cookie('user_id',25);

    // Post.find({},function(err,posts){
    //     return res.render('home',{
    //         title:"Codeial | Home",
    //         posts:posts
    //     });
    // })

try{
    //populate the user of each post
    let posts= await Post.find({})
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    });


    let users=await User.find({});

    return res.render('home',{
        title:"Codeial | Home",
        posts:posts,
        all_users:users
    });
}catch(arr){
    console.log('Error',err);
    return;
}
    
        }
        
//     })

//     // return res.render('home',{
//     //     title:"Home"
//     // });
// }
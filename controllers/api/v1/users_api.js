const User=require('../../../models/users');
const jwt=require('jsonwebtoken');

module.exports.createSession = async function(req,res){
    try{

        let user = await User.findOne({email:req.body.email});
        console.log(user);
        if(!user || user.password != req.body.password){
            return res.json(422,{
                message: "Invalid username or password"
            });
        }

        return res.json(200,{
            message:'Sign in successful, here is you token, please keep it safe',
            data:{
                token:jwt.sign(user.toJSON(),'codeial',{expiresIn:'10000'})
            }
        })

    }catch(err){
        console.log('********',err);
        return res.json(500,{
            message:"Internal server error"
        });
    }
}
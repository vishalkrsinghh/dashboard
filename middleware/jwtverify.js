
let  adminCollection =require("../model/adminModel");
let jwt = require("jsonwebtoken");

module.exports.auth=async function(req,res,next){

    try {
        let tokenFromClient=req.cookies.token;
        if(tokenFromClient){
            let decodedDataOfToken=await jwt.verify(tokenFromClient,process.env.JWT_SECRET_KEY);
            /// check user is exist or not.
            let isAdmin =await adminCollection.findOne({_id:decodedDataOfToken._id});

            if(isAdmin){
                next();
            }else{
                res.redirect("/");
                // res.status(400).json({
                //     message:"invalid Token/ Unauthorised"
                // }) 
            }

        }
        else{
            res.redirect("/");
            // res.status(400).json({
            //     message:"Token not found/ Unauthorised "
            // })
        }
    } catch (error) {
        res.status(500).json({
            message:"Authentication Failed/Unauthorised"
        })
    }
}
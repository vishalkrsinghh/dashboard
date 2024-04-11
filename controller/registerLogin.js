
let jwt=require("jsonwebtoken");

let adminCollection= require("../model/adminModel")

module.exports.registerLogin= async (req,res)=>{
    try {
        let jwtToken = req.cookies.token;
        if (!jwtToken) {
           return res.render("registerLogin");
        }
        let decodedDataOfToken = await jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
        let isAdmin = await adminCollection.findOne({ _id: decodedDataOfToken._id });

        if (isAdmin) {

            ///// redirect or render dashboard page.
            res.redirect("/dashboard")
            // res.send("welcome to dashboard")
        }
        /// if wrong token or token is present but empty then else block will run.
        else{
            return res.render("registerLogin");
        }
    }
    catch (err) {
        res.render("registerLogin");
    }
}

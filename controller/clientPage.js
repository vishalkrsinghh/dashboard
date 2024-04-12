
let jwt= require("jsonwebtoken")
let clientCollection= require("../model/clientModel");
let adminCollection= require("../model/adminModel");


module.exports.client= async (req,res)=>{

    try{
        let tokenFromClient = req.cookies.token;
        if (tokenFromClient) {
            let decodedDataOfToken = await jwt.verify(tokenFromClient, process.env.JWT_SECRET_KEY);

            let isAdmin = await adminCollection.findOne({ _id: decodedDataOfToken._id });

            if (isAdmin) {
                let allClients = await clientCollection.find({ adminId:isAdmin._id});

                res.render("clientPage", {
                    allClients,
                    adminName:isAdmin.name
                });
            }
            else {
                return res.redirect("/");
            }
        }
        else {
            return res.redirect("/");
        }
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            message: "server side error/ Error in server side code/ client Page"
        })
    }
}
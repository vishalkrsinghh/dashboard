
let jwt= require("jsonwebtoken")
let employeeCollection= require("../model/employeeModel");
let adminCollection= require("../model/adminModel");


module.exports.employee= async (req,res)=>{

    try{
        let tokenFromClient = req.cookies.token;
        if (tokenFromClient) {
            let decodedDataOfToken = await jwt.verify(tokenFromClient, process.env.JWT_SECRET_KEY);

            let isAdmin = await adminCollection.findOne({ _id: decodedDataOfToken._id });

            if (isAdmin) {
                let allEmployee = await employeeCollection.find({ adminId:isAdmin._id});

                res.render("employeePage", {
                    allEmployee,
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
            message: "server side error/ Error in server side code/ employee Page"
        })
    }
}

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
                    adminName:isAdmin.name,
                    adminId:isAdmin._id
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

module.exports.createEmployee= async (req,res)=>{


    try{
        let tokenFromClient = req.cookies.token;
        if (tokenFromClient) {
            let decodedDataOfToken = await jwt.verify(tokenFromClient, process.env.JWT_SECRET_KEY);

            let isAdmin = await adminCollection.findOne({ _id: decodedDataOfToken._id });

            if (isAdmin) {

                let {email,adminId,name}= req.body;

                let employee= await employeeCollection.create({ name, email, adminId });

                isAdmin.employeeArray.push(employee);
                isAdmin.save();
            req.flash('success', 'Employee created Successfully!')
                res.redirect("/employee")
            }
            else {
                req.flash('error', 'Employee is not created Successfully!, Admin not found');
                return res.redirect("back");
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
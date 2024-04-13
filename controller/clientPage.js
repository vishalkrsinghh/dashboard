
let jwt = require("jsonwebtoken")
let clientCollection = require("../model/clientModel");
let adminCollection = require("../model/adminModel");


module.exports.client = async (req, res) => {

    try {
        let tokenFromClient = req.cookies.token;
        if (tokenFromClient) {
            let decodedDataOfToken = await jwt.verify(tokenFromClient, process.env.JWT_SECRET_KEY);

            let isAdmin = await adminCollection.findOne({ _id: decodedDataOfToken._id });

            if (isAdmin) {
                let allClients = await clientCollection.find({ adminId: isAdmin._id });
                res.render("clientPage", {
                    allClients,
                    adminName: isAdmin.name,
                    adminId: isAdmin._id
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
    catch (err) {
        console.log(err)
        res.status(500).json({
            message: "server side error/ Error in server side code/ client Page"
        })
    }
}


module.exports.createClient = async (req, res) => {

    try {
        let tokenFromClient = req.cookies.token;
        if (tokenFromClient) {
            let decodedDataOfToken = await jwt.verify(tokenFromClient, process.env.JWT_SECRET_KEY);

            let isAdmin = await adminCollection.findOne({ _id: decodedDataOfToken._id });

            if (isAdmin) {

                let { email, adminId, name } = req.body;

                let client = await clientCollection.create({ name, email, adminId });

                isAdmin.clientArray.push(client);
                isAdmin.save();
                req.flash('success', 'Client created Successfully!')
                res.redirect("/client")
            }
            else {
                req.flash('error', 'Client is not created Successfully!, Admin not found');
                return res.redirect("back");
            }
        }
        else {
            return res.redirect("/");
        }
    }
    catch (err) {
        console.log(err)
        res.status(500).json({
            message: "server side error/ Error in server side code/ client Page"
        })
    }

}
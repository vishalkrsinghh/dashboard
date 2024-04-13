
let jwt = require("jsonwebtoken");
let adminCollection = require("../model/adminModel");

module.exports.dashboard = async (req, res) => {

    try {

        let jwtToken = req.cookies.token;
        if (!jwtToken) {
            return res.render("registerLogin");
        }
        let decodedDataOfToken = await jwt.verify(jwtToken, process.env.JWT_SECRET_KEY);
        let isAdmin = await adminCollection.findOne({ _id: decodedDataOfToken._id });

        res.render("dashboardPage", {
            adminName: isAdmin.name,
            isAdmin
        });
    } catch (err) {
        console.log(err)
    }
}
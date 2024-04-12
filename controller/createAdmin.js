let adminCollection = require("../model/adminModel");
let bcrypt = require("bcrypt")
let jwt = require("jsonwebtoken");

module.exports.createAdmin = async (req, res) => {

    try {
        let { name, email, password, cnfpassword } = req.body;
        name = name.toLowerCase();
        email = email.toLowerCase();
        password = password.toLowerCase();
        cnfpassword = cnfpassword.toLowerCase();

        if (name && email && password && cnfpassword) {

            let admin = await adminCollection.findOne({ email });

            if (admin) {
                res.status(400).json({
                    Error: "Email already exist, Please use different Email.",
                    data: {}
                })
            }
            else {
                if (password == cnfpassword) {

                    let saltRounds = 10;
                    const salt = bcrypt.genSaltSync(saltRounds);
                    const hashPassword = bcrypt.hashSync(password, salt);
                    await adminCollection.create({ name, email, password: hashPassword });
                    req.flash('success', 'Admin created Successfully!')
                    res.redirect("/");

                }
                else {
                    req.flash('error', 'Password and Confirm password are not equal.');
                }
            }
        }
        else {
            req.flash('error', 'All fields are Required.')
        }
    } catch (error) {
        res.status(500).json({
            Error: "Error in Creating, Server Error Error in code",
            data: { error }
        })
    }
}


module.exports.loginAdmin = async (req, res) => {

    try {

        let { email, password } = req.body;

        let admin = await adminCollection.findOne({ email });

        if (admin) {
            let dbPassword = admin.password;
            let isPasswordEqual = bcrypt.compareSync(password, dbPassword);

            if (isPasswordEqual) {

                let token = jwt.sign({ _id: admin._id }, process.env.JWT_SECRET_KEY, { expiresIn: "60m" })
                res.cookie('token', token, { maxAge: 60 * 60 * 1000, httpOnly: true });
                req.flash('success', 'Loged in Successfully!')
                // console.log("login ",req.headers["authorization"]);
                // console.log("login ",req.headers);
                // res.render("home",{name:user.name,email:user.email});
                console.log("session,, = ", " ", req.session);
                console.log("locals,  ", " ", res.locals);
                res.redirect("/dashboard");
                // res.send("welcome to dashboard")
            } else {
                req.flash('error', 'Email or Password are incorrect.')
                res.redirect("/")
                // res.status(400).json({
                //     Error: "Email or Password are incorrect.",
                //     data: {}
                // })
            }

        } else {
            req.flash('error', "Account doesn't exist.")
            res.redirect("/")
            // res.status(400).json({
            //     Error: "Account doesn't exist .",
            //     data: {}
            // })
        }
        // console.log(req.cookies);

    } catch (error) {
        // console.log(error)
        res.status(500).json({
            Error: "Error in login, Error in Code, Server Side Error .",
            data: { error }
        })
    }
}


module.exports.logoutAdmin = async (req, res) => {

    try{
        res.cookie("token","");
        req.flash('success', 'Logged out Successfully!');
        return res.redirect("/");
    }catch(err){
        res.status(500).json({
            Error: "Error in logged out, Error in Code, Server Side Error .",
            data: { error }
        })
    }
}
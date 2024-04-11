
let express= require("express");
const path = require("path");

let app= express();
require("dotenv").config();

let PORT= process.env.PORT || 8000;
require("./config/mongooseConfiguration");

let session= require("express-session")
let flash=require("connect-flash")
let cookieParser = require('cookie-parser')
app.use(cookieParser())

app.use(express.urlencoded())
app.use(express.json());

app.use(session({
    cookie: { maxAge: 100 * 60 * 1000, secure:false }, /////  Do secure true for https, if we do secure true for localhost(http) then browser will say website is not secure and will not open the website.
    secret: 'woot',
    resave: false,
    saveUninitialized: false,
}));

app.use(flash());
app.use(function (req, res, next) {
    // before every route, attach the flash messages to res.locals
    res.locals.flash = { "success": req.flash("success"), "error": req.flash("error") };
    next();
});

const ejsLayouts= require("express-ejs-layouts");  
app.use(ejsLayouts); 
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

app.use(express.static(path.join(__dirname,"assets")));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"view"));

app.use("/", require("./routes/registerRoute"));

app.listen(PORT,()=>{
    console.log("srvr rn");
})
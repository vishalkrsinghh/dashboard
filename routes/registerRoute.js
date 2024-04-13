

let express =require("express");
const authentication= require("../middleware/jwtverify")

// authentication.auth
let router= express.Router();

router.get("/", require("../controller/registerLogin").registerLogin);
router.post("/create_admin",require("../controller/createAdmin").createAdmin);
router.post("/login_admin",require("../controller/createAdmin").loginAdmin);
router.get("/logout",authentication.auth,require("../controller/createAdmin").logoutAdmin);
router.get("/client",authentication.auth,require("../controller/clientPage").client);
router.get("/employee",authentication.auth,require("../controller/employeePage").employee);
router.post("/create_employee",authentication.auth, require("../controller/employeePage").createEmployee);
router.post("/create_client",authentication.auth, require("../controller/clientPage").createClient);
router.get("/dashboard",authentication.auth,require("../controller/dashboard").dashboard);

module.exports= router;
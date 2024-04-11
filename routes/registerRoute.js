

let express =require("express");
const authentication= require("../middleware/jwtverify")

// authentication.auth
let router= express.Router();

router.get("/", require("../controller/registerLogin").registerLogin);
router.post("/create_admin",require("../controller/createAdmin").createAdmin);
router.post("/login_admin",require("../controller/createAdmin").loginAdmin);
router.get("/dashboard",authentication.auth,require("../controller/dashboard").dashboard);

module.exports= router;
let mongoose= require("mongoose");

let URI= process.env.MONGO_URI;
mongoose.connect(URI)
.then(()=>{
    console.log("Db Connect Successfully")
}).catch((err)=>{
    console.log("error in connecting Db", err);
})

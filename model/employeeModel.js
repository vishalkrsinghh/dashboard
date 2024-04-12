
let mongoose= require("mongoose");

let employeeSchema=new mongoose.Schema({

    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    adminId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "adminCollection"
    }

})

let employeeCollection= mongoose.model("employeeCollection", employeeSchema);
 
module.exports= employeeCollection;
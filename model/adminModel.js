
let mongoose= require("mongoose");

let adminSchema=new mongoose.Schema({

    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    clientArray:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"clientCollection"
    }],
    employeeArray:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"employeeCollection"
    }]

})

let adminCollection= mongoose.model("adminCollection", adminSchema);
 
module.exports= adminCollection;
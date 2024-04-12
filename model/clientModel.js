
let mongoose= require("mongoose");

let clientSchema=new mongoose.Schema({

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

let clientCollection= mongoose.model("clientCollection", clientSchema);
module.exports= clientCollection;
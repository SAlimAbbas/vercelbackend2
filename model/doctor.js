const mongoose=require("mongoose");

const DoctorSchema=new mongoose.Schema({
    name:{
        type:"string",
        default:null
    },
    email:{
        type:"string",
        default:null
    },
    password:{
        type:"string",
        default:null
    },
    token:{
        type:String
    }
});

module.exports=mongoose.model("doctor",DoctorSchema);
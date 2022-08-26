const mongoose = require('mongoose');

const PatientSchema=new mongoose.Schema({
    name:{
        type:"string",
        default:null
    },
    age:{
        type:"number",
        default:null
    },
    gender:{
        type:"string",
        default:null
    },
    consultDocid:String
});

module.exports=new mongoose.model("patient", PatientSchema);

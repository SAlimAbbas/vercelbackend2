const mongoose = require('mongoose');

const MedicineSchema = new mongoose.Schema({
    name:{
        type:"string",
        default:null,
    },
    quantity:{
        type:"number",
        default:null,
    },
    patientid:String,

});

module.exports=new mongoose.model("medicine",MedicineSchema);


const mongoose=require("mongoose");
const mongoURL="mongodb+srv://tempData:tempdata12345@cluster0.zgpdcsv.mongodb.net/?retryWrites=true&w=majority"

exports.connect=()=>{
    mongoose.connect(mongoURL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    })
    .then(console.log("user connected to database successfully"))
    .catch((err)=>{
        console.log("DB Connection Fail")
        console.log(err)
    })
}
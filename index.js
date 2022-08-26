require("./database").connect();
const express =require("express");
const cors = require("cors");
const Auth = require("./middleware/Auth");
const Doctor=require("./model/doctor");
const Patient=require("./model/patient");
const Medicine=require("./model/medicine");
const jwt=require("jsonwebtoken");
const bycryptjs = require("bcryptjs");



const app = express();
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.post("/signup", async(req, res) => {
   try{
    const {name,email,password} = req.body;
    if(!(name && email && password)){
       return res.status(400).send("plz fill all fields");
    }
    const checkDocEmail=await Doctor.findOne({email});
    if(checkDocEmail){
        return res.status(409).end("Doctor already exist")
    }
    const passwordEncryption=await bycryptjs.hash(password,5);
    const doctor=await Doctor.create({
        name:name,
        email:email,
        password:passwordEncryption
    });

    var TOKEN =jwt.sign({ doctor_id:doctor._id },"SecretSALT8080",{
        expiresIn:"3h"
    });

    doctor.token=TOKEN;
    return res.status(201).end(JSON.stringify(doctor));
   }

   catch(error){
    console.log(error);
    return res.send("Error 404");
   }

})

app.post("/login",async(req,res)=>{
    try{
        const {email,password}=req.body;
        
        if(!(email && password)){
            return  res.status(401).send("invalid credetials");
         }
        
        const doctor=await Doctor.findOne({email});
        if(!doctor){
            return res.send("User not found");
        }
        
        if(email && (bycryptjs.compare(password,doctor.password))){
          
            var TOKEN =jwt.sign({ doctor_id:doctor._id },"SecretSALT8080",{
                expiresIn:"3h"
            });

            doctor.token=TOKEN;  //to access the token
            return res.status(201).send(doctor);

        }
        res.send("Invalid password");
    }
    catch(error){
        console.log(error);
        res.send("Error 404");
    }
})


app.post('/docpatient/create',Auth,async(req, res)=>{
    try{
        const {name,age,gender,docid}=req.body;
        const patient =await Patient.create({
            name:name,
            age:age,
            gender:gender,
            consultDocid:docid
        })
        
      res.send(JSON.stringify(patient));
    }
    catch(error){
        console.log(error)
    };
})

app.post('/docpatient/delete/:id',async(req, res)=>{
    try {
        const {id}=req.params;
        await Patient.deleteOne({_id:id})
        res.send("Patient Data deleted successfully");

    } catch (error) {
        console.log(error);
    }
});

app.get('/allpatients',async(req, res)=>{
    try {
        const allPatients=await Patient.find();
        return res.send(JSON.stringify(allPatients));
    } catch (error) {
        console.log(error);
    }
});

app.get('/allpatients/sortL2H',async(req, res)=>{
    var temp=await Patient.find();
    temp=temp.sort((a,b)=>a.age-b.age);
    return res.send(JSON.stringify(temp));
})
app.get('/allpatients/sortH2L',async(req, res)=>{
    var temp=await Patient.find();
    temp=temp.sort((a,b)=>b.age-a.age);
    return res.send(JSON.stringify(temp));
})


app.post("/allpatients/filter",async(req, res)=> {
    const {gender}=req.body;
    const temp=await Patient.find({gender});
    return res.send(JSON.stringify(temp));
})
const PORT=8080;
app.listen(PORT,()=>{
    console.log(`server  listening on ${PORT}`);
})



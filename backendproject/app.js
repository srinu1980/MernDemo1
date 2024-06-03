
const express=require('express')
const mongoose=require('mongoose')
const bodyParser=require('body-parser')
const PORT=5001
const app=express();
const url='mongodb://127.0.0.1:27017/mydatabase';

//middleware
var cors = require('cors');
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(express.json());
mongoose.connect(url);
const db=mongoose.connection;

db.on("Error  :",(err) => {
    console.error("MongodDb connection error",err)
})

db.once("open", () => {
    console.log("Mongodb is connected.....")
})


const userSchema =new mongoose.Schema({
    name:String,
    email:String,
    password:String,
});

const User=mongoose.model("Users",userSchema);

app.post("/register", async(req,res) => {

    try{

        const newUser=new User({
            name:req.body.name,
            email:req.body.email,
            password:req.body.password
        });

        const saveUser=await newUser.save();
        res.status(201).json(saveUser);

    }
    catch(error) {
        console.error("Error  during the registration",error)
        res.status(500).json({error :" Internal server error"})
    }
})

app.listen(PORT);

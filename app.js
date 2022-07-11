const express=require("express");
const app=express();
const mongoose = require('mongoose');
const bodyparser=require("body-parser");
app.use(bodyparser.urlencoded({extended:true}));

mongoose.connect('mongodb://localhost:27017/contactDance').then(()=>{
    console.log("Connection Done !");

}).catch((err)=>{
    console.log(err);
})
const path=require("path");
const port=2020;
const contactSchema=new mongoose.Schema({
name:String,
phone:Number,
email:String,
gender:String,
address:String

})

const contact=new mongoose.model('contact',contactSchema);

app.use("/static",express.static("static"));
app.set("view engine","pug");
app.set("views",path.join(__dirname,"views"));
app.get("/",(req,res)=>{
  res.status(200).render("index.pug");  
});
app.get("/contact",(req,res)=>{
    res.status(200).render("contact.pug");
})
app.get("/service",(req,res)=>{
    res.status(200).render("service.pug");
})
app.get("/about",(req,res)=>{
    res.status(200).render("about.pug");
})
app.post("/contact",(req,res)=>{
    var myData=new contact(req.body);
//   res.statusCode=200;
    res.render("contact.pug");
    myData.save().then(()=>{
       
    console.log(myData);
    
    }).catch(()=>{
 res.status(404).send("Error Found");
    });
})
const myFun=async ()=>{
    const Myfinding=await contact.find({name:"Nitesh Kumar"});
    console.log(Myfinding);

}
myFun();

app.listen(port,()=>{
console.log(`The Server is Running on port ${port}`);
})



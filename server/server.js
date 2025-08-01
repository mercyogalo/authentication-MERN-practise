const express=require("express");
const mongoose=require("mongoose");
const dotenv=require("dotenv");


dotenv.config();

const app=express();
const PORT=process.env.PORT || 5000;


mongoose
.connect(process.env.MONGO_URI,{})
.then(()=>console.log(`Mongodb running`))
.catch((err)=>console.log(`Error is ${err}`))



app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})
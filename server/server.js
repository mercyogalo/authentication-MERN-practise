const express=require("express");
const mongoose=require("mongoose");
const dotenv=require("dotenv");
const authRoutes = require('./routes/auth');
const cors = require('cors');
const app=express();


app.use(express.json());
app.use(cors());
dotenv.config();


const PORT=process.env.PORT || 5000;

app.use('/api/auth', authRoutes);



mongoose
.connect(process.env.MONGO_URI,{})
.then(()=>console.log(`Mongodb running`))
.catch((err)=>console.log(`Error is ${err}`))



app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
})
const express = require("express");
const User=require("../models/User");
const router=express.Router();
const protect =require('../Middleware/auth');
const jwt=require('jsonwebtoken');
const generateToken =require('../Utils/token');


//register user
router.post('/register', async (req, res) => {
    const { username, email, password }= req.body;

    try {
        
        if( !username || !password || !email){
          return  res.status(400).json({message:"Please enter all fields"})
        }

        const userExists=await User.findOne({email});

        if(userExists){
            return  res.status(400).json({message:"This user already exists"})
        }

        const user=await User.create({username, email, password});
         const token=generateToken(user._id);
        res.status(201).json({
            userID:user._id,
            username:user.username,
            email:user.email,
            token,
        })


    } catch (error) {
       return  res.status(500).json({message:"Server error"});
    }
})


///login user
router.post('/login', async (req, res) =>{
    const { email, password}=req.body;

    try {
        if(!email || !password){
            res.status(400).json({message:"Please enter all feilds"});
        }

        const user=await User.findOne({email});
        const token=generateToken(user._id);

        if(!user || !(await user.matchPassword(password)) ){
            res.status(401).json({message:"Invalid credentials"});
        }

        res.status(200).json({
             userID:user._id,
            username:user.username,
            email:user.email,
              token,
        })

        
    } catch (error) {
        console.error(error);
        res.status(500).json({message:"Server error"});
    }
})

router.get('/me', async (req, res) =>{
    res.status(200).json(req.user);
})

module.exports=router;
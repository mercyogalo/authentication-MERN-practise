const express=require('express');
const jwt=require('jsonwebtoken');


//generate jwt token
const generateToken = (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn:"30d"})
}

module.exports=generateToken;
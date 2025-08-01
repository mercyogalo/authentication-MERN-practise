const mongoose=require("mongoose");
const bcrypt=require('bcryptjs');

const userSchema=new Schema.mongoose({
    username:{
        type:String,
        required:true,
        unique:true,
    },
    email:{
        type:String,
        unique:true,
        reuqired:true,
    },
    password:{
          type:String,
        reuqired:true,
    },
}, {timeStamps:true});



userSchema.pre("save", async function (next){
    if(!this.isModified("password")) return next();

    const salt=await bcrypt.genSalt(10);
    this.password=await bcrypt.hash(this.password, salt);
    next();
})

userSchema.methods.matchPassword = async function (enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}


const User=mongoose.model("User", userSchema);

module.exports= User;


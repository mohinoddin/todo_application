const mongoose=require("mongoose")

const signupSchema=new mongoose.Schema ({
      email:{
        type:String,
     
         
    },
    password:{
        type:String,
       
    },
})

const signupModal=mongoose.model("signup",signupSchema);

module.exports=signupModal
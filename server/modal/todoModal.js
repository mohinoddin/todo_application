const mongoose=require("mongoose")

const todoSchema=new mongoose.Schema ({

    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "signup",
    },
      activity:{
        type:String,
     
         
    },
    status:{
        type:String,
       
    },
    time:{
        type:String,
       
    },
    action:{
        type:String,
    }
})

const todoModal=mongoose.model("todo",todoSchema);

module.exports=todoModal
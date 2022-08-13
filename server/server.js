const express = require("express");
const mongoose = require("mongoose");
const app = express();
const signupModal = require('./modal/signupModal')
const todoModal = require('./modal/todoModal')
require('dotenv').config();
const cors=require("cors");

const { checkExistinguser, generatePasswordHash } = require("./utility")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs")



app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors())

app.listen(process.env.PORT ||3001,(err)=>{
    if(!err){
        console.log("server started 3001")
    } else {
        console.log(err)
    }
})

const mongoDB =process.env.ATLAS_URI;
mongoose.connect(mongoDB, {}).then((res) => {
    console.log("connected to db")
}).catch((err) => {
    console.log(err)
})

app.get("/",(req,res)=>{
    console.log("base route of todo")
    res.status(200).send("base route of todo")
})

app.post("/signup", async (req, res) => {
    if (await checkExistinguser(req.body.email)) {
        res.status(200).send("email already exist")
    } else {
        generatePasswordHash(req.body.password).then((passwordHash) => {
            signupModal.create({ email: req.body.email, password:passwordHash }).then((data) => {
                res.status(200).send("user signedup sucessfully")
            }).catch((err) => {
                res.status(400).send(err.message)
            })

        })
        
    }
})

app.post("/login",(req,res)=>{
    
    signupModal.find({ email: req.body.email }).then((userData) => {
        
        if (userData.length) {
            bcrypt.compare(req.body.password, userData[0].password).then((val) => {
                if (val) {
                    const authToken = jwt.sign(userData[0].email,process.env.SECRET_KEY);
                    console.log(1)
                    res.status(200).send({ authToken} );
                } else {
                    res.status(400).send("invalid password please enter correct password")
                }
            })
        } else {
            res.status(400).send("email not exist please signup")
        }
    })
})


app.post("/logout",(req,res)=>{
    authToken=""
    res.status(200).send("loggedout sucessfully")
})


app.post("/addtask", async (req,res)=>{

   if(req.headers.authorization){

   

    try {
        user_mail = jwt.verify(req.headers.authorization, process.env.SECRET_KEY);

        signupModal.find({ email: user_mail }).then((userData) => {
            if (userData.length) {

                todoModal.find({activity:req.body.activity}).then((activityData)=>{
                    if (activityData.length) {
                        res.status(400).send("Activity already exist")
                    }else {
                        todoModal.create({
                            activity: req.body.activity, status: "Pending",  time: "", action:"Start",
                            user: userData[0]._id
                        }).then((postData) => {
                                res.status(200).send("Activity created")
                            }).catch((err) => {
                                res.status(400).send(err.message)
                            });
                        }
                })

               
            } else {
                res.status(403).send("User Not Authorized")
            }

        }).catch((err) => {
            res.status(400).send(err.message)
        })
    } catch (err) {
        res.status(403).send("User Not Authorized")
    }

}else{
    res.status(403).send("headers are empty please add header")
}
})


app.get("/gettask", (req, res) => {

    if(req.headers.authorization){

   

        try {
            user_mail = jwt.verify(req.headers.authorization, process.env.SECRET_KEY);
    
            signupModal.find({ email: user_mail }).then((userData) => {
                if (userData.length) {
    
                    todoModal.find({user:userData[0]._id}).then((activityData)=>{
                        if (activityData.length) {
                            res.status(200).send(activityData)
                        }else {
                            res.status(200).send([])
                            }
                    }).catch((err)=>{
                        res.status.send("no activty available")
                    })
    
                   
                } else {
                    res.status(403).send("User Not Authorized")
                }
    
            }).catch((err) => {
                res.status(400).send(err.message)
            })
        } catch (err) {
            res.status(403).send("User Not Authorized")
        }
    
    }else{
        res.status(403).send("headers are empty please add header")
    }
})


app.put('/actions', (req, res) => {
    todoModal.findById(req.body.activityId,function(err,thePost){
        if(err){
            res.status(500).send("some thing went wromg")
        }else{
          thePost.action="";
          thePost.status="completed"
           thePost.save(function(err){
            if(err){
                res.status(500).send("some thing went wrong here")
            }else{
                 res.send({action:thePost.action})
            }
           })
        }
    })
   
})
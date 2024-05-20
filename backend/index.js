const express = require('express')
const cors = require('cors')
const app = express()
const nodemailer = require("nodemailer");
const mongoose = require('mongoose')

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb+srv://pravinboopathi:2002@cluster0.zzdrn98.mongodb.net/passkey?retryWrites=true&w=majority&appName=Cluster0').then(function(){
  console.log("Connected to DB")
}).catch(function(){
  console.log("failed to connect")
})

const credential = mongoose.model("credential",{},"bulkmail")





app.post('/sendmail',function(req,res){

  var msg = req.body.msg
  var Email = req.body.Email


  credential.find().then(function(data){
    const transporter = nodemailer.createTransport({
      service:"gmail",
      auth: {
        user: data[0].toJSON().user,
        pass: data[0].toJSON().pass,
      },
    });
    
  
    new Promise(async function(resolve,reject){
      try{
        for (var i = 0; i<Email.length;i++){
    
         await transporter.sendMail({
            from:'"Web Dev Co." <pravinboopathi753@gmail.com>',
            to:Email[i],
            subject:"Message subject",
            text:msg ,
          })
  
          console.log("Email sent to : " + Email[i])
    
        }
        resolve("Success")
    
        
      }
      catch(err){
        reject("Failed")
      }
    }).then(function(){
      res.send(true)
    }).catch(function(){
      res.send(false)
    })
  
  
  }).catch(function(error){
    console.log(error)
  }
  )
  
  

})
         


app.listen(5000,function(){
    console.log("Server is running on port 5000")
})
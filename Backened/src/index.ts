import express from "express";// Modenn syntax to import the types for the typescript
const app=express();

//End points 

//sign up EndPoint
app.post('/api/v1/signup',(req,res)=>{

})
//Sign in EndPoint 
app.post('/api/v1/signin',(req,res)=>{
    
})

//Add Content EndPoint 

app.post('/api/v1/content',(req,res)=>{
    
})

//  Get Content EndPoint 
app.get('/api/v1/content',(req,res)=>{
    
})

//Delete Content EndPoint 
app.delete('/api/v1/content',(req,res)=>{

})

//Share Content EndPoint 
app.post(' /api/v1/brain/share',(req,res)=>{
    
})

//Fetch other Content End Point 
app.get(' /api/v1/brain/:shareLink',(req,res)=>{
    
})
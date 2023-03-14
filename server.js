const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const admin = require("firebase-admin");
const credentials = require("./key.json");

admin.initializeApp({
    credential:admin.credential.cert(credentials)
});

const db = admin.firestore();

app.use(express.json());

app.use(express.urlencoded({extended:true}));

app.post('/create' ,async (req,res)=>{
    try{
        const id = req.body.email;
        const userJson = {
            email:req.body.email,
            firstName:req.body.firstName,
            lastName:req.body.lastName
        };
        // const response = db.collection('users').doc(id).set(userJson);
        const response = db.collection('users').add(userJson);
        res.status(200).json({message:"Sucessful"});
    }
    catch(err){
        res.status(500).json({error_message:err});
    }
})


app.listen(port,()=>{
    console.log(`Server is up on ${port}`);
});

const User = require("../../db/models/user")
require('dotenv').config()

export default async function handler(req, res) {
 
    // let email = JSON.parse(req.body).email
    let email = req.body.email.toLowerCase()
    
    try{
        let Results = await User.find({email:email}).maxTimeMS(20000).lean() 
        if(Results.length == 0) return res.status(404).json({error:{message:"Ooops! Couldn't Find any Results"},status:404})
        res.status(200).json({Results:Results,status:200})
    }
    catch(error){
        console.log(error)
        res.status(404).json({error:{message:"Ooops! Couldn't Find any Results"},status:404})

    }
    // res.json({users})
}

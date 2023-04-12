const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const User = require("../../db/models/user")
require('dotenv').config()

export default async function handler(req, res) {
 
    // let email = JSON.parse(req.body).email
    let email = req.body.email.toLowerCase()
    
    try{
        let Results = await User.find({email:email}).maxTimeMS(20000).lean() 
        console.log(Results)
        res.status(200).json(Results)
    }
    catch(error){
        console.log(error)
        res.status(404).json({error:{message:"Ooops! Couldn't Find any Results"}})

    }
    // res.json({users})
}

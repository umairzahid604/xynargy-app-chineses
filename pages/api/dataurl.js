require('dotenv').config()
const imageToBase64 = require('image-to-base64');

export default async function handler(req, res) {
 
    // let email = JSON.parse(req.body).email
    let imageUrl = req.body.imageurl
    // console.log(imageUrl)
    
    try{
        let dataUrl = await imageToBase64(imageUrl)
        // console.log(dataUrl)
        res.status(200).json({url:dataUrl})
    }
    catch(error){
        console.log(error)
        res.status(404).json({error:{message:"Ooops! Couldn't Find any Results"},status:404})
    }
    // res.json({users})
}

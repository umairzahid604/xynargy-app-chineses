const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const User = require("../../db/models/user")
require('dotenv').config()


export default async function handler(req, res) {

    // SCANNED DATA (SIMPLE DATA)
    let data = req.body
    if (data.area_results.length == 0) return res.json({ msg: "end" })

    // LOGIN TO GET AUTH TOKEN 
    let loginUrl = `https://saas.haut.ai/api/v1/auth/login/`
    let loginOptions = {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            "username": "denny@ariamed.ai",
            "password": "Xynargy@22"
        })
    }

    let login = await fetch(loginUrl, loginOptions)
    login = await login.json()
    const token = login.token_access


    // AUTHORIZE OPTIONS;
    let AuthorizeOptions = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        },
    }


    // Getting Email form haut.ai (Survey API)
    let Surveyurl = `https://saas.haut.ai/service/constructor/b2c/survey-answers/?batch_id=${data.batch_id}`
    let email = await fetch(Surveyurl)
    email = await email.text()
    email = email.split(",")[5]



    // GETTING CUSTOMER IMAGE URL
    let imageApiUrl = `https://saas.haut.ai/api/v1/companies/${data.company_id}/datasets/${data.dataset_id}/subjects/${data.subject_id}/batches/${data.batch_id}/images/${data.image_id}/aux/`
    let imageUrl = await fetch(imageApiUrl, AuthorizeOptions)
    imageUrl = await imageUrl.json()
    imageUrl = imageUrl[0].urls.original


    // GETTING CUSTOMER MASKED DATA
    let MaskedDataApi = `https://saas.haut.ai/api/v1/companies/${data.company_id}/datasets/${data.dataset_id}/subjects/${data.subject_id}/batches/${data.batch_id}/images/${data.image_id}/results/`
    let maskedData = await fetch(MaskedDataApi, AuthorizeOptions)
    maskedData = await maskedData.json()



    // Define a new user document
    const user = new User({
        email: email,
        imageUrl: imageUrl,
        simpleData: [data],
        maskedData: [maskedData]
    });


    user.save()
        .then(() => {
            console.log('User saved to the database');
            res.status(200).json({success:{message:"User Data Successfully saved to Database"}})            
        })
        .catch((error) => {
            console.error('Error saving user to the database:', error);
            res.status(500).json({error:{message:"User data could not be saved to Database"}})
        });

}

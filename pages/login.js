
const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

async function login() {

//     let data = {
//         company_id: "7affc037-ee40-46b9-b49e-bc430d59aaa7",
//         dataset_id: "0929251a-a440-4ec5-91ee-476285e66285",
//         subject_id: "b589b483-aebd-4e2d-a4c9-1b80172071b2",
//         batch_id: "e87171db-7589-4f65-a8f5-c511afdc5c2b",
//         image_id: "bfda837c-ccec-4514-b27b-70ac3b9fcdec",
//     }

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
    console.log(token)
    // console.log(token)

//     // AUTHORIZE OPTIONS;
//     let AuthorizeOptions = {
//         headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}`
//         },
//     }

//     // GETTING CUSTOMER IMAGE URL
//     let imageApi = `https://saas.haut.ai/api/v1/companies/${data.company_id}/datasets/${data.dataset_id}/subjects/${data.subject_id}/batches/${data.batch_id}/images/${data.image_id}/aux/`
//     let imageid = await fetch(imageApi, AuthorizeOptions)
//     imageid = await imageid.json()
//     imageid = imageid[0].id

//     // Getting Signed Url for 30 years
//     let expireSeconds = 946100000
//     let SignedimageApi = `https://saas.haut.ai/api/v1/companies/${data.company_id}/datasets/${data.dataset_id}/subjects/${data.subject_id}/batches/${data.batch_id}/images/${data.image_id}/aux/${imageid}/signed_url/?expiration_seconds=${expireSeconds}`
//     let SignedimageUrl = await fetch(SignedimageApi, AuthorizeOptions)
//     SignedimageUrl = await SignedimageUrl.json()



//     console.log(SignedimageUrl.url)
    
}
login()
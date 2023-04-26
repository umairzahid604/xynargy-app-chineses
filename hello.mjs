// import fetch from 'node-fetch';
// import FormData from 'form-data';

// // Set the API endpoint URL
// const url = 'https://childcareservicestraining.app.axcelerate.com/api/contact/portfolio/file';

// // Set the image URL to download
// const imageUrl = 'http://www.ccst.eyedropperstaging.com.au/wp-content/uploads/2023/04/339469140_753742976286135_5037123092030873855_n.jpg';
// console.log("hello")
// // Download the image using fetch
// fetch(imageUrl)
//   .then(async (res) => {
//     // Create a new form-data object to encode the file
//     const formData = new FormData();
//     console.log(res)
//     // Append the file to the form-data object
//     formData.append('addFile', await res.buffer(), {
//       filename: 'image.jpg',
//       contentType: res.headers.get('content-type'),
//       knownLength: res.headers.get('content-length'),
//     });

//     // Set the required HTTP headers
//     const headers = {
//       apitoken: 'CA426D06-28F5-40A6-A1BFFB35DB25093D',
//       wstoken: 'C43B9B57-BA20-47E3-8432C93C89714E19',
//     };

//     // Set the HTTP parameters
//     const params = {
//       contactID: '14269324',
//       portfolioID: '4304438',
//       addFileFolder: 'other',
//     };

//     // Send the POST request to the API endpoint
//     return fetch(`${url}?${new URLSearchParams(params)}`, {
//       method: 'POST',
//       headers,
//       body: formData,
//     });
//   })
//   .then(async (res) => {
//     // Handle the API response
//     console.log(res.status, res.statusText);
//     const json = await res.json();
//     console.log(json);
//   })
//   .catch((err) => {
//     console.error(err);
//   });




import fetch from 'node-fetch';
import FormData from 'form-data';
// const fs = require('fs');
import fs from "fs"

const url = 'https://childcareservicestraining.app.axcelerate.com/api/contact/portfolio/file';
const imageUrl = 'http://www.ccst.eyedropperstaging.com.au/wp-content/uploads/2023/04/339469140_753742976286135_5037123092030873855_n.jpg';


fs.createReadStream(imageUrl)
  .on('error', (err) => {
    console.error('Error reading file:', err);
  })
  .on('open', () => {
    const formData = new FormData();
    formData.append('addFile', fs.createReadStream(imageUrl), {
      filename: 'image.jpg',
      contentType: 'image/jpeg'
    });

    const headers = {
      'apitoken': 'CA426D06-28F5-40A6-A1BFFB35DB25093D',
      'wstoken': 'C43B9B57-BA20-47E3-8432C93C89714E19',
    };

    const params = {
      'contactID': '14269324',
      'portfolioID': '4304438',
      'addFileFolder': 'other'
    };

    fetch(url, {
      method: 'POST',
      headers,
      body: formData,
      query: params
    })
    .then(res => {
      console.log(res.status, res.statusText);
      return res.json();
    })
    .then(json => {
      console.log(json);
    })
    .catch(err => {
      console.error('Error uploading file:', err);
    });
  });

var Jimp = require("jimp");

Jimp.read({
    url: 'https://saas.haut.ai/images/b539bc79-7087-4f10-a638-5b8c58bbe5df.jpg', // Required!
    headers: {},
    
  })
    .then(image => {
      // Do stuff with the image.
      return image
      .resize(256, 256) // resize
      .quality(60) // set JPEG quality
      .greyscale() // set greyscale
      .write("lena-small-bw.jpg"); // save
    })
    .catch(err => {
      // Handle an exception.
      console.log("hello")
    });
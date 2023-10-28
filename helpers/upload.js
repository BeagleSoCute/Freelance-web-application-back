const util = require("util");
const { randomString } = require("./common");
const gc = require("../config/googleStorage");
const bucket = gc.bucket("freelancerapp");

const uploadImage = (file) =>
  new Promise((resolve, reject) => {
    const { originalname, buffer } = file;
    const randomName = randomString(6);
    const currentDate = new Date();
    const time = `${currentDate.getHours()}${currentDate.getMinutes()}${currentDate.getMilliseconds()}`;
    const fileName = randomName + time + '_' + originalname.replace(/ /g, "_");
    const blob = bucket.file(fileName);

    const blobStream = blob.createWriteStream({
      resumable: false,
    });

    blobStream
      .on("finish", () => {
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
        resolve(publicUrl);
      })
      .on("error", () => {
        reject(`Unable to upload image, something went wrong`);
      })
      .end(buffer);
  });



  

module.exports = uploadImage;

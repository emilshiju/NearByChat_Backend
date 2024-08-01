"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var multer_storage_cloudinary_1 = require("multer-storage-cloudinary");
var cloudinary_1 = require("cloudinary");
cloudinary_1.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
console.log("ehre");
var storage = new multer_storage_cloudinary_1.CloudinaryStorage({
    cloudinary: cloudinary_1.v2,
    params: {
        // @ts-ignore
        folder: '/CloudinaryDemo',
        allowedFormats: ['jpeg', 'png', 'jpg'],
    }
});
// const upload = multer({storage:storage})
exports.default = storage;
//   interface CustomParams {
//     folder: string;
//     format?: string; // Add other properties as needed
//   }
//   console.log("uploasddddddddddddddddddddddddddddd")
// const storage = new CloudinaryStorage({
//     cloudinary,
//     params: {
//       folder:'uploads',
//     }as CustomParams,
//   });
// export  const parser = multer({ storage });

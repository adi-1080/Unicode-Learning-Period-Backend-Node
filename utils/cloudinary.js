import {v2 as cloudinary} from 'cloudinary'
import fs from 'fs'

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_CLOUD_API_KEY,
    api_secret: process.env.CLOUDINARY_CLOUD_API_SECRET
});

const uploadOnCloudinary = async (localFilePath) => {
    try{
        if(!localFilePath) return null
        
        //uploading the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type: 'auto'
        })
        //file has been uploaded successfully
        console.log("File is uploaded successfully on cloudinary",response.url);

        fs.unlinkSync(localFilePath)

        return response;

    } catch(err){
        //remove the locally saved temporary file as the upload operation got failed
        fs.unlinkSync(localFilePath)
        console.log(err);
        return null;
    }
}

export default uploadOnCloudinary
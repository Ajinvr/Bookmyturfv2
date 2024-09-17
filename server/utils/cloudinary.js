import fs from 'fs';
import { cloudinaryInstance } from "../db/config/cloudinaryConfig.js";

export const imageUploadCloudinary = async (path) => {
    try {
        const uploadResult = await cloudinaryInstance.uploader.upload(path, {
            transformation: [
                { aspect_ratio: '16:9', crop: 'fill', width: 1920, height: 1080 }
            ]
        });

        fs.unlink(path, (err) => {
            if (err) {
                console.error(`Failed to delete local file: ${err.message}`);
            }
        });

        return uploadResult.secure_url;
    } catch (error) {
        throw new Error(error.message || "Internal server error");
    }
};

import {v2 as cloudinary} from 'cloudinary';
          



export const cloudinaryConnection=()=>{cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
    });
    return cloudinary
}

// Helper function to extract publicId from a Cloudinary URL
export const extractPublicId = (url) => {
    // Assuming URL structure like: https://res.cloudinary.com/.../Gallery/some-id.jpg
    const parts = url.split('/');
    const publicIdWithExtension = parts[parts.length - 1];
    const publicId = publicIdWithExtension.split('.')[0]; // Remove file extension
    return publicId;
};
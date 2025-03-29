import { v2 as cloudinary } from 'cloudinary';

// Validate environment variables
const validateConfig = () => {
  const requiredVars = [
    'REACT_APP_CLOUDINARY_CLOUD_NAME',
    'REACT_APP_CLOUDINARY_API_KEY',
    'REACT_APP_CLOUDINARY_UPLOAD_PRESET'
  ];
  
  requiredVars.forEach(varName => {
    if (!process.env[varName]) {
      throw new Error(`Missing required environment variable: ${varName}`);
    }
  });
};

validateConfig();

cloudinary.config({ 
  cloud_name: process.env.REACT_APP_CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.REACT_APP_CLOUDINARY_API_KEY, 
  api_secret: process.env.REACT_APP_CLOUDINARY_API_SECRET,
  secure: true // Always use HTTPS
});

export const uploadImage = async (file: File): Promise<{url: string, publicId: string}> => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET!);
  formData.append('folder', 'olx_listings'); // Organize images in folder

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      throw new Error(`Upload failed with status ${response.status}`);
    }

    const data = await response.json();
    return {
      url: data.secure_url,
      publicId: data.public_id
    };
  } catch (error) {
    console.error('Error uploading image:', error);
    throw error;
  }
};

export const deleteImage = async (publicId: string): Promise<void> => {
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    if (result.result !== 'ok') {
      throw new Error(`Failed to delete image: ${result.result}`);
    }
  } catch (error) {
    console.error('Error deleting image:', error);
    throw error;
  }
};
// src/services/cloudinary.ts
export const uploadImage = async (file: File): Promise<{url: string; publicId: string}> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'your_upload_preset'); 
    formData.append('cloud_name', 'your_cloud_name'); // Replace with your cloud name
  
    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/your_cloud_name/image/upload`,
        {
          method: 'POST',
          body: formData,
        }
      );
  
      if (!response.ok) {
        throw new Error('Image upload failed');
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
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/your_cloud_name/image/destroy`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            public_id: publicId,
            api_key: 'your_api_key', // Replace with your API key
            timestamp: Math.floor(Date.now() / 1000),
            signature: 'generate_this_server_side' // Generate this server-side for security
          }),
        }
      );
  
      if (!response.ok) {
        throw new Error('Image deletion failed');
      }
    } catch (error) {
      console.error('Error deleting image:', error);
      throw error;
    }
  };
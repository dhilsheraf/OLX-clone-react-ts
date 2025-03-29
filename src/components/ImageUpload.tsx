// src/components/ImageUpload.tsx
import React, { useState } from 'react';
import { useProductContext } from '../context/ProductContext';
import { uploadImage, deleteImage } from '../cloudinary/cloudinary';

const ImageUpload: React.FC = () => {
  const { productData, setProductData } = useProductContext();
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || uploading) return;
    
    setUploading(true);
    const files = Array.from(e.target.files);
    
    try {
      const uploadPromises = files.map(file => uploadImage(file));
      const uploadedImages = await Promise.all(uploadPromises);
      
      setProductData(prev => ({
        ...prev,
        images: [...prev.images, ...uploadedImages]
      }));
    } catch (error) {
      console.error('Error uploading images:', error);
      alert('Failed to upload images');
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = async (index: number) => {
    const imageToRemove = productData.images[index];
    
    try {
      await deleteImage(imageToRemove.publicId);
      setProductData(prev => ({
        ...prev,
        images: prev.images.filter((_, i) => i !== index)
      }));
    } catch (error) {
      console.error('Error deleting image:', error);
      alert('Failed to delete image');
    }
  };

  return (
    <div className="mb-4 bg-white shadow-md rounded px-8 pt-6 pb-8">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        Upload Images*
      </label>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageUpload}
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-2"
        disabled={uploading}
      />
      {uploading && <p className="text-sm text-gray-500">Uploading images...</p>}
      
      <div className="flex flex-wrap gap-2 mt-4">
        {productData.images.map((image, index) => (
          <div key={index} className="relative">
            <img 
              src={image.url} 
              alt={`Preview ${index}`} 
              className="w-20 h-20 object-cover rounded"
            />
            <button
              onClick={() => handleRemoveImage(index)}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUpload;
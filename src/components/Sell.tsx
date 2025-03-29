// src/pages/Sell.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../firebase/setup';
import { useProductContext } from '../context/ProductContext';
import ProductForm from './ProductForm';
import ImageUpload from './ImageUpload';
import Footer from './Footer';

const Sell: React.FC = () => {
  const navigate = useNavigate();
  const { productData, resetProductData } = useProductContext();

  const handleSubmit = async () => {
    try {
      // Validate required fields
      if (!productData.title || !productData.description || 
          !productData.price || !productData.location || 
          !productData.category || productData.images.length === 0) {
        alert('Please fill all required fields and upload at least one image');
        return;
      }

      // Add to Firestore
      await addDoc(collection(db, 'products'), {
        ...productData,
        createdAt: new Date(),
      });

      // Reset form and navigate
      resetProductData();
      navigate('/');
      alert('Product listed successfully!');
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to list product');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto p-4 flex-grow">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center mb-4 text-blue-500 hover:text-blue-700"
        >
          <img  alt="Back" className="w-5 h-5 mr-1" />
          Back
        </button>

        <h1 className="text-3xl font-bold text-center mb-6 text-emerald-950">
          List Your Product
        </h1>

        <ProductForm />
        <ImageUpload />

        <div className="flex justify-center mt-6">
          <button
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
          >
            List Product
          </button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Sell;
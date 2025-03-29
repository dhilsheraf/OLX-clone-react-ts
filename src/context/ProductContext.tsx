// src/context/ProductContext.tsx
import React, { createContext, useState, useContext } from 'react';

interface ProductData {
  category: string;
  brand?: string;
  year?: string;
  owner?: string;
  bhk?: string;
  bathroom?: string;
  title: string;
  description: string;
  price: string;
  location: string;
  images: { url: string; publicId: string }[];
}

interface ProductContextType {
  productData: ProductData;
  setProductData: React.Dispatch<React.SetStateAction<ProductData>>;
  resetProductData: () => void;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [productData, setProductData] = useState<ProductData>({
    category: '',
    title: '',
    description: '',
    price: '',
    location: '',
    images: []
  });

  const resetProductData = () => {
    setProductData({
      category: '',
      title: '',
      description: '',
      price: '',
      location: '',
      images: []
    });
  };

  return (
    <ProductContext.Provider value={{ productData, setProductData, resetProductData }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => {
  const context = useContext(ProductContext);
  if (!context) {
    throw new Error('useProductContext must be used within a ProductProvider');
  }
  return context;
};
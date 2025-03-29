// context/ProductContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";

type Product = {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
  };

type ProductContextType = {
  productData: Product | null;
  setProductData: (product: Product) => void; 
};

const ProductContext = createContext<ProductContextType | undefined>(undefined);

type ProductProviderProps = {
  children: ReactNode;
};

export const ProductProvider = ({ children }: ProductProviderProps) => {
  const [productData, setProductData] = useState<Product | null>(null);

  return (
    <ProductContext.Provider value={{ productData, setProductData }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
};
// src/components/ProductForm.tsx
import React from 'react';
import { useProductContext } from '../context/ProductContext';

const ProductForm: React.FC = () => {
  const { productData, setProductData } = useProductContext();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProductData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
          Title*
        </label>
        <input
          type="text"
          name="title"
          value={productData.title}
          onChange={handleInputChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
          Description*
        </label>
        <textarea
          name="description"
          value={productData.description}
          onChange={handleInputChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          rows={4}
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
          Price*
        </label>
        <input
          type="number"
          name="price"
          value={productData.price}
          onChange={handleInputChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="location">
          Location*
        </label>
        <input
          type="text"
          name="location"
          value={productData.location}
          onChange={handleInputChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          required
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="category">
          Category*
        </label>
        <select
          name="category"
          value={productData.category}
          onChange={handleInputChange}
          className="shadow border rounded w-full py-2 px-3 text-gray-700"
          required
        >
          <option value="">Select Category</option>
          <option value="electronics">Electronics</option>
          <option value="furniture">Furniture</option>
          <option value="vehicles">Vehicles</option>
          <option value="property">Property</option>
        </select>
      </div>

      {/* Conditionally render additional fields based on category */}
      {productData.category === 'vehicles' && (
        <>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="brand">
              Brand
            </label>
            <input
              type="text"
              name="brand"
              value={productData.brand || ''}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="year">
              Year
            </label>
            <input
              type="text"
              name="year"
              value={productData.year || ''}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            />
          </div>
        </>
      )}

      {productData.category === 'property' && (
        <>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bhk">
              BHK
            </label>
            <input
              type="text"
              name="bhk"
              value={productData.bhk || ''}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="bathroom">
              Bathroom
            </label>
            <input
              type="text"
              name="bathroom"
              value={productData.bathroom || ''}
              onChange={handleInputChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ProductForm;
import React, { useState } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

interface Listing {
  id: number;
  title: string;
  description: string;
  price: string;
  category: string;
  location: string;
  images: string[];
}

const Sell: React.FC = () => {
  const [listings, setListings] = useState<Listing[]>([]);
  const [formData, setFormData] = useState<Omit<Listing, "id">>({
    title: "",
    description: "",
    price: "",
    category: "",
    location: "",
    images: [],
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...imageUrls],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setListings((prev) => [...prev, { ...formData, id: Date.now() }]);
    setFormData({
      title: "",
      description: "",
      price: "",
      category: "",
      location: "",
      images: [],
    });
  };

  const removeImage = (indexToRemove: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, index) => index !== indexToRemove),
    }));
  };

  return (
    <>
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6 text-emerald-950">OLX Sell</h1>

      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <input
            type="text"
            name="title"
            placeholder="Product Title"
            value={formData.title}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            required
          />
        </div>

        <div className="mb-4">
          <textarea
            name="description"
            placeholder="Product Description"
            value={formData.description}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            rows={4}
            required
          />
        </div>

        <div className="mb-4 flex space-x-4">
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formData.price}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700"
            required
          />

          <select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            className="shadow border rounded w-1/2 py-2 px-3 text-gray-700"
            required
          >
            <option value="">Select Category</option>
            <option value="electronics">Electronics</option>
            <option value="furniture">Furniture</option>
            <option value="clothing">Clothing</option>
            <option value="vehicles">Vehicles</option>
          </select>
        </div>

        <div className="mb-4">
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleInputChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
            required
          />
        </div>

        <div className="mb-4">
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          />

          <div className="flex space-x-2 mt-2">
            {formData.images.map((image, index) => (
              <div key={index} className="relative">
                <img src={image} alt={`Preview ${index}`} className="w-20 h-20 object-cover rounded" />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                >
                  X
                </button>
              </div>
            ))}
          </div>
        </div>

        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Create Listing
        </button>
      </form>

      {/* Listings Display */}
      <div className="grid md:grid-cols-3 gap-4">
        {listings.map((listing) => (
          <div key={listing.id} className="bg-white shadow-md rounded p-4">
            {listing.images.length > 0 && (
              <img src={listing.images[0]} alt={listing.title} className="w-full h-48 object-cover rounded mb-4" />
            )}
            <h2 className="text-xl font-bold mb-2">{listing.title}</h2>
            <p className="text-gray-700 mb-2">{listing.description}</p>
            <div className="flex justify-between">
              <span className="font-bold text-green-600">₹{listing.price}</span>
              <span className="text-gray-500">{listing.location}</span>
            </div>
            <div className="mt-2 text-sm text-gray-500">Category: {listing.category}</div>
          </div>
        ))}
      </div>
      
    </div>
    <Footer/>
    </>
  );
};

export default Sell;

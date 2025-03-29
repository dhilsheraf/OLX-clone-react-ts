import { useProduct } from "../context/ProductContext";
import { Link } from "react-router-dom";
import Footer from "./Footer";

const Details = () => {
  const { productData } = useProduct();

  if (!productData) {
    return (
      <div className="p-4 text-center">
        <p>No product data available</p>
        <Link to="/" className="text-blue-500 hover:underline">
          Return to home
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 bg-[#f2f4f5] min-h-screen">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/3">
          <img 
            src={productData.image} 
            alt={productData.title} 
            className="w-full max-h-96 object-contain bg-white p-4 rounded-lg shadow"
          />
        </div>
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow p-6">
            <h1 className="font-bold text-3xl mb-2">${productData.price}</h1>
            <div className="space-y-3">
              <p>
                <span className="font-semibold">Category:</span> 
                <span className="capitalize ml-2">{productData.category}</span>
              </p>
              <p>
                <span className="font-semibold">Title:</span> 
                <span className="ml-2">{productData.title}</span>
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow mt-6 p-6">
            <h2 className="font-semibold text-xl mb-2">Description</h2>
            <p className="text-gray-700">{productData.description}</p>
          </div>
          <Link 
            to="/" 
            className="mt-6 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
          >
            Back to Products
          </Link>
        </div>
      </div>
      <Footer/>
    </div>
  );
};

export default Details;
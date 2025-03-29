import { Link } from "react-router-dom";
import { useProduct } from "../context/ProductContext";


 type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

 type ProductsProps = {
  products: Product[];
  search: string;
  menu: string;
};
const Home = ({ products, search, menu }: ProductsProps) => {
  const { setProductData } = useProduct();

  const filteredProducts = products.filter((data) =>
    data.title.toLowerCase().includes(
      (search || menu).toLowerCase()
    )
  );

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-5'>
      {filteredProducts.map((data: Product) => (
        <Link 
          to="/details" 
          key={data.id}
          onClick={() => setProductData(data)}
          className="hover:shadow-lg transition-shadow"
        >
          <div className='border rounded-lg p-4 h-full flex flex-col'>
            <img 
              src={data.image} 
              alt={data.title} 
              className='w-full h-48 object-contain'
            />
            <div className="mt-4 flex-grow">
              <h1 className="font-bold text-xl">${data.price}</h1>
              <h1 className="text-gray-700 line-clamp-2">{data.title}</h1>
              <h1 className="text-sm text-gray-500 capitalize">{data.category}</h1>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Home;
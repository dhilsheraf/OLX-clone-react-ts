import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./components/Main";
import Details from "./components/Details";
import Sell from "./components/Sell";
import { ToastContainer } from "react-toastify";
import { ProductProvider } from "./context/ProductContext";

const App = () => {
  return (<>
  <ProductProvider>
  <ToastContainer theme="dark"/>
    <Router>  
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/details" element={<Details />} />
        <Route path="/sell" element={<Sell/>}/>
      </Routes>
    </Router>
    </ProductProvider>
    </>
  );
};

export default App;

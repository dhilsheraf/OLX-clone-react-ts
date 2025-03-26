import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Main from "./components/Main";
import Details from "./components/Details";

const App = () => {
  return (
    <Router>  
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/details" element={<Details />} />
      </Routes>
    </Router>
  );
};

export default App;

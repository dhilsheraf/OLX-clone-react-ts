import { useState, useEffect } from "react";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/setup";
import olx from "../assets/olx.png";
import lens from "../assets/lens.png";
import arrow from "../assets/arrow.png";
import search from "../assets/search.png";
import Login from "./Login";
import { Link } from "react-router-dom";


type SearchProp = {
  setSearch: (value: string) => void;
};

const Navbar = ({ setSearch }: SearchProp) => {
  const [loginPop, setLoginPop] = useState(false);
  const [user, setUser] = useState<any>(null); // Track user state

  useEffect(() => {
    // Listen for authentication changes
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null); // Clear user state after logout
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <>
      <div className="flex p-4 bg-slate-100 shadow-sm">
        <img src={olx} alt="OLX Logo" className="w-11 h-9" />

        <div className="flex border-2 w-72 p-2 border-black ml-5 bg-white">
          <img src={lens} alt="Search Icon" className="w-6 h-5 mt-1" />
          <input type="text" placeholder="Location" className="ml-3 outline-none" />
          <img src={arrow} alt="Dropdown Arrow" className="w-8 h-7" />
        </div>

        <div className="flex h-12 ml-4 border-2 border-black bg-white">
          <input
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Find Cars, Mobile phones and more"
            className="ml-3 w-150 outline-none"
          />
          <img src={search} alt="Search Button" />
        </div>

        <div className="flex h-12 p-3 ml-10 cursor-pointer">
          <h1 className="font-semibold">ENGLISH</h1>
          <img src={arrow} alt="Language Selector Arrow" className="w-8 h-7" />
        </div>

        {/* Show "Logout" if user is logged in, otherwise "Login" */}
        {user ? (
          <div
            onClick={handleLogout}
            className="flex h-12 p-3 ml-10 cursor-pointer underline hover:no-underline"
          >
            <h1 className="font-bold text-lg">Logout</h1>
          </div>
        ) : (
          <div
            onClick={() => setLoginPop(true)}
            className="flex h-12 p-3 ml-10 cursor-pointer underline hover:no-underline"
          >
            <h1 className="font-bold text-lg">Login</h1>
          </div>
        )}
        <Link to='/sell'>
        <div className="w-28 flex h-12 p-2 ml-10 cursor-pointer rounded-full border border-yellow-500">
          <h1 className="font-bold text-lg ml-3.5">+ SELL</h1>
        </div>
        </Link>
      </div>

      {loginPop && <Login setLoginPop={setLoginPop} />}
    </>
  );
};

export default Navbar;

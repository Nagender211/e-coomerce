import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ShoppingCart, Search, LogOut, User } from "lucide-react";
import { api } from "../utlis/api";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Check authentication status from backend
    const checkAuthStatus = async () => {
      try {
        const response = await api.get("/check-auth");
        if (response.data && response.data.user) {
          setIsLoggedIn(true);
          setUserName(response.data.user.username || response.data.user.name || "User");
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        setIsLoggedIn(false);
        console.log("Not authenticated");
      }
    };
    
    checkAuthStatus();
  }, []);

  const handleLogout = async () => {
    try {
      await api.post("/logout");
      setIsLoggedIn(false);
      setUserName("");
      navigate("/login");
    } catch (error) {
      console.log("Logout error:", error);
      navigate("/login");
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      console.log("Searching for:", searchQuery);
    }
  };

  return (
    <div className="w-full">
      {/* Main Header */}
      <div className="bg-white shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 flex-shrink-0 hover:opacity-80 transition-opacity"
            >
              <div className="w-10 h-10 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="hidden sm:block font-bold text-gray-900 text-lg">ShopHub</span>
            </Link>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex-1 max-w-md hidden sm:flex">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 text-gray-900"
                />
                <button
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-indigo-600"
                >
                  <Search size={18} />
                </button>
              </div>
            </form>

            {/* Right Section */}
            <div className="flex items-center gap-4">
              {/* Cart */}
              <Link
                to="/cart"
                className="relative p-2 text-gray-600 hover:text-indigo-600 transition-colors"
              >
                <ShoppingCart size={22} />
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  0
                </span>
              </Link>

              {/* Login/Logout */}
              {isLoggedIn ? (
                <div className="flex items-center gap-3">
                  <div className="hidden sm:flex flex-col items-end">
                    <p className="text-xs text-gray-500">Welcome back</p>
                    <p className="text-sm font-semibold text-gray-900">{userName}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    <LogOut size={18} />
                    <span className="hidden sm:inline">Logout</span>
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <Link
                    to="/rigster"
                    className="hidden sm:block text-indigo-600 hover:text-indigo-700 font-semibold transition-colors"
                  >
                    Sign Up
                  </Link>
                  <Link
                    to="/login"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
                  >
                    <User size={18} />
                    <span className="hidden sm:inline">Login</span>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="sm:hidden mt-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600"
              />
              <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Search size={18} />
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Category Bar */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="hidden md:flex items-center gap-8 py-3">
            <Link to="/" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">
              All
            </Link>
            <Link to="/" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">
              Electronics
            </Link>
            <Link to="/" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">
              Fashion
            </Link>
            <Link to="/" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">
              Home
            </Link>
            <Link to="/" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">
              Books
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
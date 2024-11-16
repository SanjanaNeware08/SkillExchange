import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const user = useSelector((state) => state.user.currentUser); // Accessing user data from Redux
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch({ type: "USER_LOGOUT" }); // Dispatch action to clear user data
    localStorage.removeItem("persist:root"); // Clear persisted data from localStorage
    navigate("/"); // Redirect to homepage
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-bold text-blue-500">
              TradeBuddies
            </Link>
          </div>

          {/* Navbar Links */}
          <div className="hidden md:flex space-x-8 items-center">
            <Link
              to="/"
              className="text-gray-600 hover:text-blue-500 px-3 py-2 rounded-md text-lg font-medium"
            >
              Home
            </Link>

            <Link
              to="/help"
              className="text-gray-600 hover:text-blue-500 px-3 py-2 rounded-md text-lg font-medium"
            >
              Help
            </Link>

            {/* Profile Image or Login */}
            {user ? (
              <div className="relative">
                {/* Profile Picture Button */}
                <button
                  onClick={() =>
                    setIsProfileDropdownOpen(!isProfileDropdownOpen)
                  }
                  className="flex items-center focus:outline-none"
                >
                  <img
                    src={
                      user.profilePicture || "https://via.placeholder.com/40"
                    }
                    alt="Profile"
                    className="w-10 h-10 rounded-full"
                  />
                </button>

                {/* Profile Dropdown */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-gray-600 hover:bg-gray-100"
                      onClick={() => setIsProfileDropdownOpen(false)}
                    >
                      View Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="text-gray-600 hover:text-blue-500 px-3 py-2 rounded-md text-lg font-medium"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

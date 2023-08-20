import React, { useState } from "react";
import { UserCircleIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import logo from "../icons/docin-web-removebg-preview.png";
import { useNavigate } from "react-router-dom";
import { SIGNOUT_MUTATION } from "../graphql";
import { useMutation } from "@apollo/client";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const [signoutmutation, { loading, error }] = useMutation(SIGNOUT_MUTATION);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSignout = async () => {
    try {
      const { data } = await signoutmutation();

      if (data.signout.success) {
        localStorage.removeItem("authToken");
        localStorage.removeItem("userid");
        navigate("/login");
      } else {
        console.log("Signout failed.");
      }
    } catch (error) {
      console.error("Signout error:", error);
    }
  };

  const username = "John Doe"; // Replace with actual username

  return (
    <nav className="bg-[#EDDBC7]">
      <div className="container mx-auto px-4 md:px-8 lg:px-16 xl:px-24 2xl:px-32">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center">
            <img
              src={logo}
              alt="Doc-in Logo"
              className="w-auto h-auto md:w-10 lg:w-1/4 mx-2 md:mx-0"
            />
            <div className="md:hidden ml-2 text-[#A7727D]">{username}</div>
          </div>
          <div className="hidden md:flex items-center space-x-2">
            <div className="relative">
              <button onClick={toggleDropdown} className="focus:outline-none">
                <UserCircleIcon className="w-10 h-10 md:w-12 md:h-12 text-[#A7727D]" />
              </button>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 py-2 w-48 bg-white border border-gray-300 rounded shadow-lg">
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/signup"
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                  >
                    Sign Up
                  </Link>
                  <button
                    onClick={handleSignout}
                    className="block px-4 py-2 text-gray-800 hover:bg-gray-100 focus:outline-none"
                  >
                    Signout
                  </button>
                </div>
              )}
            </div>
          </div>
          {/* <div className="md:hidden flex items-center">
            <button onClick={toggleDropdown} className="focus:outline-none">
              <UserCircleIcon className="w-10 h-10 text-[#EDDBC7]" />
            </button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 py-2 w-48 bg-white border border-gray-300 rounded shadow-lg">
                <button
                  onClick={() => navigate("/signin")}
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100 focus:outline-none"
                >
                  Sign In
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100 focus:outline-none"
                >
                  Sign Up
                </button>
                <button
                  onClick={handleSignout}
                  className="block px-4 py-2 text-gray-800 hover:bg-gray-100 focus:outline-none"
                >
                  Sign Out
                </button>
              </div>
            )}
          </div> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

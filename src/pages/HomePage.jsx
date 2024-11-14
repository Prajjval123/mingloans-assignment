import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCircle, FaEnvelope } from "react-icons/fa";

const HomePage = () => {
  const navigate = useNavigate();

  const profile = {
    name: "Your Name",
    email: "your.email@example.com",
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="text-center space-y-6 w-full max-w-md p-8 rounded-xl shadow-xl bg-white bg-opacity-80">
        {/* Welcome Section */}
        <h1 className="text-4xl font-extrabold text-gray-800 mb-4 animate__animated animate__fadeIn">
          Welcome to My React Application
        </h1>

        {/* Profile Info Card */}
        <div className="bg-white shadow-xl rounded-lg p-6 mx-auto transform hover:scale-105 transition-all duration-300 ease-in-out">
          <div className="flex justify-center mb-4">
            <FaUserCircle size={80} color="#4C51BF" />
          </div>
          <p className="text-xl font-semibold text-gray-800 flex items-center justify-center mb-2">
            <FaUserCircle className="mr-2" /> {profile.name}
          </p>
          <p className="text-md text-gray-600 flex items-center justify-center">
            <FaEnvelope className="mr-2" /> {profile.email}
          </p>
        </div>

        {/* Login Button */}
        <button
          onClick={handleLoginClick}
          className="mt-6 px-8 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-all transform hover:scale-105 duration-300 ease-in-out"
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default HomePage;

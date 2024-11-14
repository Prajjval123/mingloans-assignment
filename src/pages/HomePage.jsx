// src/components/HomePage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

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
    <div className="flex flex-col items-center justify-center min-h-screen px-4 bg-gray-100">
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800">
          Welcome to My React Application
        </h1>
        <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-sm mx-auto">
          <p className="text-lg font-semibold text-gray-700">
            Name: {profile.name}
          </p>
          <p className="text-md text-gray-600">Email: {profile.email}</p>
        </div>
        <button
          className="mt-6 px-8 py-3 bg-blue-600 text-white rounded-lg shadow-lg hover:bg-blue-700 transition-colors w-full max-w-xs"
          onClick={handleLoginClick}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default HomePage;

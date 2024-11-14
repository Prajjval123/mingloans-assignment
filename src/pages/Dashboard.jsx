import React from "react";
import { Link } from "react-router-dom";
import { useProductContext } from "../context/ProductContext";

const Dashboard = () => {
  const { user } = useProductContext();
  console.log(user)

  return (
    <div>
      {user ? (
        <div className="min-h-screen bg-gray-100">
          {/* Navbar */}
          <header className="bg-blue-600 text-white py-4 shadow-lg">
            <div className="container mx-auto flex items-center justify-between px-4">
              <h1 className="text-2xl font-bold">Dashboard</h1>
              <div className="flex items-center gap-4">
                <img
                  src={user?.image || "https://via.placeholder.com/40"}
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full border-2 border-white"
                />
                <span className="hidden sm:block font-medium">
                  {user?.firstName} {user?.lastName}
                </span>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="container mx-auto py-8 px-4">
            <h2 className="text-3xl font-semibold text-gray-800 mb-6">
              Welcome, {user?.firstName || "User"}!
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Card 1: Profile */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-semibold mb-2">Your Profile</h3>
                <p className="text-gray-600">
                  Name: {user?.firstName} {user?.lastName}
                </p>
                <p className="text-gray-600">Email: {user?.email}</p>
              </div>

              {/* Card 2: Notifications */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-semibold mb-2">Notifications</h3>
                <p className="text-gray-600">You have no new notifications.</p>
              </div>

              {/* Card 3: Actions */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-xl font-semibold mb-2">Quick Actions</h3>
                <div className="space-y-2">
                  <Link
                    to="/product/add"
                    className="w-full py-3 mt-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center block"
                  >
                    Add New Product
                  </Link>
                  <Link
                    to="/products"
                    className="w-full py-3 mt-4 bg-green-500 text-white rounded-lg shadow hover:bg-green-600 text-center block"
                  >
                    View Products
                  </Link>
                  <Link
                    to="/report-page"
                    className="w-full py-3 mt-4 bg-red-500 text-white rounded-lg shadow hover:bg-red-600 text-center block"
                  >
                    Report Page
                  </Link>
                </div>
              </div>
            </div>
          </main>
        </div>
      ) : (
        <p>Not Authorized</p>
      )}
    </div>
  );
};

export default Dashboard;

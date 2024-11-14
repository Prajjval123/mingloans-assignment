import React from "react";
import { useProductContext } from "../context/ProductContext";
import { Link } from "react-router-dom";

const ReportPage = () => {
  const { products, showNewProducts, setView } = useProductContext();

  // Assuming you have an 'isNew' field to filter for newly added products
  const latestProducts = products.filter((product) => product.isNew); // Filter newly added products

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
        {/* Card 1: Latest Products */}
        <div className="bg-white p-8 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg text-center cursor-pointer">
          <h2 className="text-2xl font-semibold mb-6">Latest Products</h2>
          <p className="text-gray-600 mb-6 text-lg">Count: {latestProducts.length}</p>
          <Link
            to="/products"
            className="text-blue-600 font-medium hover:underline"
            onClick={() => setView(true)}
          >
            View Latest Products
          </Link>
        </div>

        {/* Card 2: Total Products */}
        <div className="bg-white p-8 rounded-lg shadow-md transition-transform transform hover:scale-105 hover:shadow-lg text-center cursor-pointer">
          <h2 className="text-2xl font-semibold mb-6">Total Products</h2>
          <p className="text-gray-600 mb-6 text-lg">Count: {products.length}</p>
          <Link
            to="/products"
            className="text-blue-600 font-medium hover:underline"
            onClick={() => setView(false)}
          >
            View All Products
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ReportPage;

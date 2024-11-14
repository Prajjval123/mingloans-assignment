import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useProductContext } from "../context/ProductContext";

const ProductList = () => {
  const { products, showNewProducts, setView, deleteProduct } = useProductContext();
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSort = (e) => {
    setSort(e.target.value);
  };

  // Filter products based on 'isNew' flag and search
  const filteredProducts = products
    .filter((product) => {
      if (showNewProducts) {
        return product.isNew; // Only show products with 'isNew' flag set to true
      }
      return product?.title?.toLowerCase().includes(search.toLowerCase());
    })
    .sort((a, b) => {
      if (sort === "asc") return a.price - b.price;
      if (sort === "desc") return b.price - a.price;
      return 0;
    });

  return (
    <div className="p-4 bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>
      <div className="mb-4 flex gap-4">
        <input
          type="text"
          placeholder="Search by title"
          className="border p-2 w-full"
          value={search}
          onChange={handleSearch}
        />
        <select className="border p-2" value={sort} onChange={handleSort}>
          <option value="">Sort by</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>

      {/* Filter button to toggle between new products and all products */}
      <div className="mb-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => setView(!showNewProducts)}
        >
          {showNewProducts ? "Show All Products" : "Show New Products"}
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="border rounded p-4 shadow hover:shadow-lg transition bg-white"
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full object-cover mb-2"
            />
            <h2 className="font-bold text-lg">{product.title}</h2>
            <p className="text-sm text-gray-600">{product.category}</p>
            <p className="text-green-600 font-bold mt-2">${product.price}</p>
            <div className="mt-4 flex justify-between">
              <Link
                to={`/view-product/${product.id}`}
                className="bg-blue-500 text-white py-1 px-2 rounded"
              >
                View
              </Link>
              <div className="flex gap-2">
                <Link
                  to={`/edit/${product.id}`}
                  className="bg-yellow-500 text-white py-1 px-2 rounded"
                >
                  Edit
                </Link>
                <div
                  onClick={() => deleteProduct(product.id)}
                  className="bg-red-500 text-white py-1 px-2 rounded cursor-pointer"
                >
                  Delete
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;

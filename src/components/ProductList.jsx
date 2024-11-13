// src/components/ProductList.jsx
import React, { useEffect, useState } from "react";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then((res) => res.json())
      .then((data) => setProducts(data.products))
      .catch((err) => console.error(err));
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleSort = (e) => {
    setSort(e.target.value);
  };

  const filteredProducts = products
    .filter((product) =>
      product.title.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (sort === "asc") return a.price - b.price;
      if (sort === "desc") return b.price - a.price;
      return 0;
    });

  return (
    <div className="p-4">
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
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            className="border rounded p-4 shadow hover:shadow-lg transition"
          >
            <img
              src={product.thumbnail}
              alt={product.title}
              className="w-full h-40 object-cover mb-2"
            />
            <h2 className="font-bold text-lg">{product.title}</h2>
            <p className="text-sm text-gray-600">{product.category}</p>
            <p className="text-green-600 font-bold mt-2">${product.price}</p>
            <div className="mt-4 flex justify-between">
              <button className="bg-blue-500 text-white py-1 px-2 rounded">
                View
              </button>
              <button className="bg-yellow-500 text-white py-1 px-2 rounded">
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;

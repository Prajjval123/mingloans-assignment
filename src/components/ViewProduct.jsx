import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProductContext } from "../context/ProductContext";

const ViewProduct = () => {
  const { id } = useParams();
  const { products } = useProductContext();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const foundProduct = products.find(
      (product) => product.id === parseInt(id)
    );
    if (foundProduct) {
      setProduct(foundProduct);
    } else {
      fetch(`https://dummyjson.com/products/${id}`)
        .then((res) => res.json())
        .then((data) => setProduct(data))
        .catch((err) => console.error("Failed to fetch product", err));
    }
  }, [id, products]);

  if (!product) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p>Loading product...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md mt-6">
        <div className="w-full flex justify-center"><img
          src={product.thumbnail}
          alt={product.title}
          className="object-cover mb-4 rounded-md"
        /></div>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        View Product
      </h2>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">
          Product Name
        </label>
        <input
          type="text"
          value={product.title}
          readOnly
          className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Category</label>
        <input
          type="text"
          value={product.category}
          readOnly
          className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Price</label>
        <input
          type="text"
          value={`$${product.price}`}
          readOnly
          className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">
          Description
        </label>
        <textarea
          value={product.description}
          readOnly
          className="w-full p-2 border rounded-md focus:ring focus:ring-blue-300"
        />
      </div>
    </div>
  );
};

export default ViewProduct;

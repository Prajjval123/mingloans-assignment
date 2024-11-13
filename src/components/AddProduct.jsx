import React, { useState } from "react";

const AddProduct = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    discountPercentage: "",
    stock: "",
    brand: "",
    weight: "",
    warrantyInformation: "",
    shippingInformation: "",
    availabilityStatus: "",
    returnPolicy: "",
  });
  const [categories, setCategories] = useState([
    "smartphones",
    "laptops",
    "fragrances",
    "groceries",
    "skincare",
  ]); // Replace with fetched categories if needed
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (!formData.title || !formData.price || !formData.category) {
      alert("Title, Price, and Category are required.");
      return;
    }

    try {
      const response = await fetch("https://dummyjson.com/products/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (response.ok) {
        setSuccessMessage("Product added successfully!");
        saveToLocalStorage(result);
      } else {
        alert(`Error: ${result.message}`);
      }
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  const saveToLocalStorage = (product) => {
    const savedProducts = JSON.parse(localStorage.getItem("products")) || [];
    savedProducts.push(product);
    localStorage.setItem("products", JSON.stringify(savedProducts));
  };

  return (
    <div className="add-product-container bg-gray-100 min-h-screen p-4">
      <h2 className="text-xl font-bold mb-4">Add New Product</h2>

      <form
        className="bg-white shadow-md rounded-lg p-6 space-y-4"
        onSubmit={handleSubmit}
      >
        <div>
          <label className="block font-medium mb-1" htmlFor="title">
            Product Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-medium mb-1" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          ></textarea>
        </div>

        <div>
          <label className="block font-medium mb-1" htmlFor="category">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          >
            <option value="">Select a Category</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium mb-1" htmlFor="price">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-medium mb-1" htmlFor="discountPercentage">
            Discount Percentage
          </label>
          <input
            type="number"
            id="discountPercentage"
            name="discountPercentage"
            value={formData.discountPercentage}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-medium mb-1" htmlFor="stock">
            Stock
          </label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <div>
          <label className="block font-medium mb-1" htmlFor="brand">
            Brand
          </label>
          <input
            type="text"
            id="brand"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Product
        </button>
      </form>

      {successMessage && (
        <div className="mt-4 text-green-500 font-bold">{successMessage}</div>
      )}
    </div>
  );
};

export default AddProduct;

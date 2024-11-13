import React, { useState } from "react";

const AddProduct = () => {
  const [product, setProduct] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    stock: "",
    brand: "",
    weight: "",
    warrantyInformation: "",
    shippingInformation: "",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [categories, setCategories] = useState([]);

  // Fetch product categories
  React.useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://dummyjson.com/products/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(product),
      });
      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("Product added successfully!");
        localStorage.setItem(
          "newProducts",
          JSON.stringify([
            ...(JSON.parse(localStorage.getItem("newProducts")) || []),
            data,
          ])
        );
        setProduct({
          title: "",
          description: "",
          category: "",
          price: "",
          stock: "",
          brand: "",
          weight: "",
          warrantyInformation: "",
          shippingInformation: "",
        });
      } else {
        console.error("Failed to add product:", data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Add New Product</h1>
      {successMessage && (
        <div className="p-4 mb-4 text-green-700 bg-green-100 rounded">
          {successMessage}
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2"
      >
        <input
          type="text"
          name="title"
          value={product.title}
          onChange={handleChange}
          placeholder="Product Title"
          required
          className="p-2 border rounded"
        />
        <textarea
          name="description"
          value={product.description}
          onChange={handleChange}
          placeholder="Product Description"
          required
          className="p-2 border rounded"
        />
        <select
          name="category"
          value={product.category}
          onChange={handleChange}
          required
          className="p-2 border rounded"
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <input
          type="number"
          name="price"
          value={product.price}
          onChange={handleChange}
          placeholder="Price"
          required
          className="p-2 border rounded"
        />
        <input
          type="number"
          name="stock"
          value={product.stock}
          onChange={handleChange}
          placeholder="Stock Quantity"
          required
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="brand"
          value={product.brand}
          onChange={handleChange}
          placeholder="Brand"
          required
          className="p-2 border rounded"
        />
        <input
          type="number"
          name="weight"
          value={product.weight}
          onChange={handleChange}
          placeholder="Weight (kg)"
          required
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="warrantyInformation"
          value={product.warrantyInformation}
          onChange={handleChange}
          placeholder="Warranty Information"
          required
          className="p-2 border rounded"
        />
        <input
          type="text"
          name="shippingInformation"
          value={product.shippingInformation}
          onChange={handleChange}
          placeholder="Shipping Information"
          required
          className="p-2 border rounded"
        />
        <button
          type="submit"
          className="col-span-2 p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;

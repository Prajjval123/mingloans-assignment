import React, { useEffect, useState } from "react";
import { useProductContext } from "../context/ProductContext";

const AddProduct = () => {
  const { addProduct, products } = useProductContext();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(""); 
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [isNew, setIsNew] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      const fetchUserData = async () => {
        const userInfo = JSON.parse(localStorage.getItem("user"));
        setUser(userInfo);
      };
      fetchUserData();
    }
  }, []);

  const categories = ["Electronics", "Fashion", "Home", "Books", "Toys"];

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "jlabderz"); 

      fetch(import.meta.env.VITE_CLOUDINARY_URL, {
        method: "POST",
        body: formData,
      })
        .then((res) => res.json())
        .then((data) => {
          setThumbnail(data.secure_url);
        })
        .catch((err) => console.error("Error uploading image:", err));
    }
    console.log(thumbnail);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!category) {
      alert("Please select a category!");
      return;
    }

    const newProduct = {
      id: Date.now(),
      title,
      category,
      price: parseFloat(price),
      description,
      thumbnail,
      isNew,
    };

    addProduct(newProduct);

    alert("Product added successfully!");
    console.log(products);

    // Reset form
    setTitle("");
    setCategory("");
    setPrice("");
    setDescription("");
    setThumbnail("");
    setIsNew(true);
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Add New Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Select Category</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 border rounded"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Thumbnail Image</label>
          <input
            type="file"
            onChange={handleImageUpload}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Is New?</label>
          <input
            type="checkbox"
            checked={isNew}
            onChange={(e) => setIsNew(e.target.checked)}
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;

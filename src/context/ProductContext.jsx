import React, { createContext, useContext, useState, useEffect } from "react";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [showNewProducts, setShowNewProducts] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products"));

    if (storedProducts && storedProducts.length > 0) {
      setProducts(storedProducts);
    } else {
      fetch("https://dummyjson.com/products")
        .then((res) => res.json())
        .then((data) => setProducts(data.products))
        .catch((err) => console.error(err));
    }
  }, []);

  const addProduct = (newProduct) => {
    setProducts((prev) => [...prev, newProduct]);
  
    // Save to local storage
    localStorage.setItem("products", JSON.stringify([...products, newProduct]));
  };

  const deleteProduct = (id) => {
    const updatedProducts = products.filter((product) => product.id !== id);
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  const updateProduct = (updatedProduct) => {
    const updatedProducts = products.map((product) =>
      product.id === updatedProduct.id ? updatedProduct : product
    );
    setProducts(updatedProducts);

    // Update local storage
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  const setView = (showNew) => {
    setShowNewProducts(showNew);
    console.log(showNewProducts);
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        showNewProducts,
        user,
        setProducts,
        updateProduct,
        addProduct,
        deleteProduct,
        setView,
        setUser
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductContext = () => useContext(ProductContext);

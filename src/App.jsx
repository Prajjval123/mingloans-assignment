// src/App.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { ProductProvider } from "./context/ProductContext";
import HomePage from "./components/HomePage";
import LoginForm from "./components/LoginForm";
import Dashboard from "./components/Dashboard";
import AddProduct from "./components/AddProduct";
import ProductList from "./components/ProductList";
import EditProduct from "./components/EditProduct";
import ViewProduct from "./components/ViewProduct";
import ReportPage from "./components/ReportPage";

const App = () => {
  const [user, setUser] = React.useState(null); // To manage logged-in user state

  const updateProduct = async (id, updatedProduct) => {
    return fetch(`/api/products/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    })
      .then((response) => response.json())
      .catch((error) => console.error("Error updating product:", error));
  };

  return (
    <ProductProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={
            <LoginForm onLoginSuccess={(userData) => setUser(userData)} />
          }
        />
        <Route
          path="/dashboard"
          element={user ? <Dashboard user={user} /> : <Navigate to="/login" />}
        />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/edit/:id" element={<EditProduct />} />
        <Route path="/view-product/:id" element={<ViewProduct />} />
        <Route path="/report-page" element={<ReportPage />} />
      </Routes>
    </ProductProvider>
  );
};

export default App;

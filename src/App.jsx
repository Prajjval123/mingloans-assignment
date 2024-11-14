import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import { ProductProvider, useProductContext } from "./context/ProductContext";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Dashboard from "./pages/Dashboard";
import AddProduct from "./components/AddProduct";
import ProductList from "./components/ProductList";
import EditProduct from "./components/EditProduct";
import ViewProduct from "./components/ViewProduct";
import ReportPage from "./components/ReportPage";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  return (
    <ProductProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/login"
          element={
            <LoginPage onLoginSuccess={(userData) => setUser(userData)} />
          }
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/product/add"
          element={
            <ProtectedRoute>
              <AddProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <ProductList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/edit/:id"
          element={
            <ProtectedRoute>
              <EditProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/view-product/:id"
          element={
            <ProtectedRoute>
              <ViewProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/report-page"
          element={
            <ProtectedRoute>
              <ReportPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </ProductProvider>
  );
};

export default App;

// src/App.jsx
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import HomePage from "./components/HomePage";
import LoginForm from "./components/LoginForm";
import Dashboard from "./components/Dashboard";
import AddProduct from './components/AddProduct';


const App = () => {
  const [user, setUser] = React.useState(null); // To manage logged-in user state

  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route
        path="/login"
        element={<LoginForm onLoginSuccess={(userData) => setUser(userData)} />}
      />
      <Route
        path="/dashboard"
        element={user ? <Dashboard user={user} /> : <Navigate to="/login" />}
      />
	  <Route path="/add-product" element={<AddProduct />} />
    </Routes>
  );
};

export default App;

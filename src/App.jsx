import React from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import SignUpPage from "./pages/Signup";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import Quiz from "./pages/Quiz";
import Chatbot from "./components/Chatbot";

// Admin pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        {/* User routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/chatbot" element={<Chatbot />} />

        {/* Admin routes */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin" element={<AdminDashboard />} />
        // Admin routes
<Route path="/admin-login" element={<AdminLogin />} />
<Route path="/admin" element={<AdminDashboard />} />

        {/* Fallback */}
        <Route
          path="*"
          element={
            <div className="flex flex-col items-center justify-center min-h-screen">
              <h1 className="text-3xl font-bold">404 - Page Not Found</h1>
              <a
                href="/"
                className="mt-4 text-blue-600 underline hover:text-blue-800"
              >
                Go to Home
              </a>
            </div>
          }
        />
      </Routes>
    </div>
  );
};

export default App;

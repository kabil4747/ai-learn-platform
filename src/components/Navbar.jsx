import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/AuthStore";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { authUser, logout } = useAuthStore();

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 shadow-xl">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1
          className="text-2xl font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          AI Learning Platform
        </h1>

        <div className="hidden md:flex space-x-6 items-center">
          <button onClick={() => navigate("/")} className="hover:text-blue-200">
            Home
          </button>
          <button
            onClick={() => navigate("/quiz")}
            className="hover:text-blue-200"
          >
            Quiz
          </button>
          <button
            onClick={() => navigate("/chatbot")}
            className="hover:text-blue-200"
          >
            Chatbot
          </button>
          {authUser?.isAdmin ? (
            <>
              <button
                onClick={() => navigate("/admin")}
                className="hover:text-blue-200"
              >
                Dashboard
              </button>
              <button
                onClick={() => logout()}
                className="hover:text-blue-200"
              >
                Logout
              </button>
            </>
          ) : authUser ? (
            <>
              <button
                onClick={() => navigate("/profile")}
                className="hover:text-blue-200"
              >
                Profile
              </button>
              <button
                onClick={() => logout()}
                className="hover:text-blue-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="hover:text-blue-200"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/admin-login")}
                className="hover:text-blue-200"
              >
                Admin Login
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden bg-blue-600 text-white px-4 py-2 space-y-2">
          <button onClick={() => navigate("/")} className="block hover:text-blue-200">
            Home
          </button>
          <button
            onClick={() => navigate("/course")}
            className="block hover:text-blue-200"
          >
            Topics
          </button>
          <button
            onClick={() => navigate("/quiz")}
            className="block hover:text-blue-200"
          >
            Quiz
          </button>
          <button
            onClick={() => navigate("/chatbot")}
            className="block hover:text-blue-200"
          >
            Chatbot
          </button>
          {authUser?.isAdmin ? (
            <>
              <button
                onClick={() => navigate("/admin")}
                className="block hover:text-blue-200"
              >
                Dashboard
              </button>
              <button
                onClick={() => logout()}
                className="block hover:text-blue-200"
              >
                Logout
              </button>
            </>
          ) : authUser ? (
            <>
              <button
                onClick={() => navigate("/profile")}
                className="block hover:text-blue-200"
              >
                Profile
              </button>
              <button
                onClick={() => logout()}
                className="block hover:text-blue-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="block hover:text-blue-200"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/admin-login")}
                className="block hover:text-blue-200"
              >
                Admin Login
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

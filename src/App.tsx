// src/App.jsx
import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";

import { ProfileForm } from "./pages/ProfileForm";
import { MainPage } from "./pages/MainPage";
import { Problems } from "./pages/Problems";
import { Contests } from "./pages/Contests";
import { Login } from "./pages/Login";

import { Code2, Moon, Sun } from 'lucide-react';
import { supabase } from "./lib/supabase";
import { ThemeProvider, useTheme } from './lib/ThemeContext';

const tabs = ["Home", "Problems", "Contests"];

function AppContent() {
  const [activeTab, setActiveTab] = useState("Home");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLoginSuccess = (credentialResponse) => {
    setIsAuthenticated(true);
    localStorage.setItem("authToken", credentialResponse.credential);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <Login onLoginSuccess={handleLoginSuccess} />;
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <nav className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Code2 className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
                CodeBuddy
              </span>
            </div>
            <div className="flex space-x-4 items-center">
              {["Home", "Problems", "Contests", "Link Profiles"].map((tab) => (
                <Button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`!text-gray-700 dark:!text-gray-300 ${
                    activeTab === tab ? "dark:!bg-gray-700 !bg-gray-200" : ""
                  }`}
                >
                  {tab}
                </Button>
              ))}
              <Button
                onClick={handleLogout}
                className="!ml-4 !bg-red-500 !text-white hover:!bg-red-600"
              >
                Logout
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "Home" && <MainPage />}
        {activeTab === "Problems" && <Problems />}
        {activeTab === "Contests" && <Contests />}
        {activeTab === "Link Profiles" && <ProfileForm />}
      </main>
    </div>
  );
}


function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;

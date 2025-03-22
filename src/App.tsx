import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";

import { ProfileForm } from "./pages/ProfileForm";
import { MainPage } from "./pages/MainPage";
import { Problems } from "./pages/Problems";
import { Contests } from "./pages/Contests";

import { Code2, Moon, Sun } from 'lucide-react';
import { supabase } from "./lib/supabase";
import { ThemeProvider, useTheme } from './lib/ThemeContext';

const tabs = ["Main Page", "Problems", "Contests"];

function AppContent() {
  const [activeTab, setActiveTab] = useState("Main Page");
  const [showDashboard, setShowDashboard] = useState(true);
  const { theme, toggleTheme } = useTheme();

  // useEffect(() => {
  //   // Check if user is already authenticated
  //   supabase.auth.getSession().then(({ data: { session } }) => {
  //     if (session) {
  //       setShowDashboard(true);
  //     }
  //   });

  //   // Listen for auth state changes
  //   const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
  //     setShowDashboard(!!session);
  //   });

  //   return () => subscription.unsubscribe();
  // }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <nav className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Code2 className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
                Coder's Dashboard
              </span>
            </div>
            <div className="flex space-x-4">
              {tabs.map((tab) => (
                <Button
                  key={tab}
                  variant="default"
                  onClick={() => setActiveTab(tab)}
                  className={`text-gray-700 dark:text-gray-300 ${
                    activeTab === tab ? 'dark:!bg-gray-700 !bg-gray-200' : ''
                  }`}
                >
                  {tab}
                </Button>
              ))}
              <button
                onClick={toggleTheme}
                className="p-2 px-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? (
                  <Sun className="w-5 h-5" />
                ) : (
                  <Moon className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "Main Page" && <MainPage />}
        {activeTab === "Problems" && <Problems />}
        {activeTab === "Contests" && <Contests />}
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

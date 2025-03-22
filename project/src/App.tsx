import  { useState, useEffect } from 'react';
import { ProfileForm } from './components/ProfileForm';
import { Dashboard } from './components/Dashboard';
import { Code2, Moon, Sun } from 'lucide-react';
import { supabase } from './lib/supabase';
import { ThemeProvider, useTheme } from './lib/ThemeContext';

function AppContent() {
  const [showDashboard, setShowDashboard] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setShowDashboard(true);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setShowDashboard(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors duration-200">
      <nav className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Code2 className="w-8 h-8 text-indigo-600 dark:text-indigo-400" />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
                Coder's Dashboard
              </span>
            </div>
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
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!showDashboard ? (
          <div className="max-w-md mx-auto">
            <ProfileForm onProfileSaved={() => setShowDashboard(true)} />
          </div>
        ) : (
          <Dashboard />
        )}
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
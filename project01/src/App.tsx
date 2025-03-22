import React, { useState, useEffect } from 'react';
import { ProfileForm } from './components/ProfileForm';
import { Dashboard } from './components/Dashboard';
import { Code2 } from 'lucide-react';
import { supabase } from './lib/supabase';

function App() {
  const [showDashboard, setShowDashboard] = useState(false);

  useEffect(() => {
    // Check if user is already authenticated
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setShowDashboard(true);
      }
    });

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setShowDashboard(!!session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Code2 className="w-8 h-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Coder's Dashboard</span>
            </div>
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

export default App;
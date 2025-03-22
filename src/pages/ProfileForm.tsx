import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { Save, Loader2 } from 'lucide-react';

interface ProfileFormProps {
  onProfileSaved: () => void;
}

export function ProfileForm({ onProfileSaved }: ProfileFormProps) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    leetcode: '',
    codeforces: '',
    codechef: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isNewUser, setIsNewUser] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      let user;

      if (isNewUser) {
        // Sign up new user
        const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
          email: formData.email,
          password: formData.password,
          options: {
            emailRedirectTo: window.location.origin,
          }
        });

        if (signUpError) throw signUpError;
        user = signUpData.user;
      } else {
        // Sign in existing user
        const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
          email: formData.email,
          password: formData.password,
        });

        if (signInError) throw signInError;
        user = signInData.user;
      }

      if (!user) {
        throw new Error('Authentication failed - no user returned');
      }

      // Save the profile data
      const { error: profileError } = await supabase
        .from('profiles')
        .upsert({
          user_id: user.id,
          leetcode: formData.leetcode,
          codeforces: formData.codeforces,
          codechef: formData.codechef,
          updated_at: new Date().toISOString(),
        }, {
          onConflict: 'user_id'
        });

      if (profileError) throw profileError;
      
      onProfileSaved();
    } catch (error) {
      console.error('Error:', error);
      if (error instanceof Error) {
        // Handle specific error messages
        if (error.message.includes('Invalid login credentials')) {
          setError('Invalid email or password. Please try again or sign up if you\'re a new user.');
        } else if (error.message.includes('User already registered')) {
          setError('This email is already registered. Please sign in instead.');
          setIsNewUser(false);
        } else {
          setError(error.message);
        }
      } else {
        setError('An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {isNewUser ? 'Create Account' : 'Sign In'}
        </h2>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <input
              type="password"
              required
              minLength={6}
              value={formData.password}
              onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Enter your password"
            />
            {isNewUser && (
              <p className="mt-1 text-sm text-gray-500">
                Password must be at least 6 characters long
              </p>
            )}
          </div>

          {['leetcode', 'codeforces', 'codechef'].map((platform) => (
            <div key={platform}>
              <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                {platform} Username
              </label>
              <input
                type="text"
                value={formData[platform as keyof typeof formData]}
                onChange={(e) => setFormData(prev => ({ ...prev, [platform]: e.target.value }))}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder={`Enter your ${platform} username`}
              />
            </div>
          ))}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          ) : (
            <Save className="w-4 h-4 mr-2" />
          )}
          {isLoading ? 'Processing...' : (isNewUser ? 'Sign Up' : 'Sign In')}
        </button>
      </form>

      <div className="text-center">
        <button
          type="button"
          onClick={() => {
            setIsNewUser(!isNewUser);
            setError(null);
          }}
          className="text-indigo-600 hover:text-indigo-500 text-sm font-medium"
        >
          {isNewUser
            ? 'Already have an account? Sign in'
            : 'Need an account? Sign up'}
        </button>
      </div>
    </div>
  );
}
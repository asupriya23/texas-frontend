import React, { useState } from 'react';
import { Button, TextField, Checkbox, FormControlLabel, Divider, Box } from '@mui/material';

export function MainPage () {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [codeforcesUsername, setCodeforcesUsername] = useState('');
  const [leetcodeUsername, setLeetcodeUsername] = useState('');
  const [codechefUsername, setCodechefUsername] = useState('');
  const [newsletter, setNewsletter] = useState(false);
  const [showAccountLinking, setShowAccountLinking] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission (dummy for now)
    console.log({ email, password });
    
    // After successful login/signup, show account linking
    setShowAccountLinking(true);
  };

  const handleGoogleSignIn = () => {
    // Implement Google Sign-in logic
    console.log("Google Sign-in initiated");
    setShowAccountLinking(true);
  };

  const handleNewsletterSubmit = () => {
    console.log("User subscribed to newsletter:", newsletter);
    // Show success message
    alert("Thank you for subscribing to our newsletter!");
  };

  return (
    <div className="min-h-[80vh] bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
        <div className="px-6 py-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white">CodeBuddy</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              {isLogin ? 'Sign in to your account' : 'Create your account'}
            </p>
          </div>

          {!showAccountLinking ? (
            <>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <TextField
                    fullWidth
                    label="Email Address"
                    variant="outlined"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-gray-50 dark:bg-gray-700"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'rgb(209 213 219)',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: 'rgb(107 114 128)',
                      },
                      '& .MuiOutlinedInput-input': {
                        color: 'rgb(17 24 39)',
                      },
                      '&.Mui-focused': {
                        color: 'rgb(107 114 128)',
                      },
                    }}
                  />
                </div>
                <div>
                  <TextField
                    fullWidth
                    label="Password"
                    variant="outlined"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="bg-gray-50 dark:bg-gray-700"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '& fieldset': {
                          borderColor: 'rgb(209 213 219)',
                        },
                      },
                      '& .MuiInputLabel-root': {
                        color: 'rgb(107 114 128)',
                      },
                      '& .MuiOutlinedInput-input': {
                        color: 'rgb(17 24 39)',
                      },
                      '&.Mui-focused': {
                        color: 'rgb(107 114 128)',
                      },
                    }}
                  />
                </div>

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ 
                    backgroundColor: 'rgb(75 85 99)',
                    '&:hover': {
                      backgroundColor: 'rgb(55 65 81)',
                    },
                    textTransform: 'none',
                    py: 1.5
                  }}
                >
                  {isLogin ? 'Sign In' : 'Create Account'}
                </Button>
              </form>

              <Divider className="my-6">
                <span className="text-gray-500 dark:text-gray-400 text-sm">OR</span>
              </Divider>

              <button
                onClick={handleGoogleSignIn}
                className="w-full flex items-center justify-center gap-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md py-2.5 px-4 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors duration-300"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                  <path d="M1 1h22v22H1z" fill="none" />
                </svg>
                <span>{isLogin ? 'Sign in with Google' : 'Sign up with Google'}</span>
              </button>

              <div className="mt-6 text-center">
                <button
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
                >
                  {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
                </button>
              </div>
            </>
          ) : (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Link Your Accounts</h2>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                Connect your competitive programming accounts to track your progress
              </p>
              
              <div className="space-y-4">
                <TextField
                  fullWidth
                  label="Codeforces Username"
                  variant="outlined"
                  value={codeforcesUsername}
                  onChange={(e) => setCodeforcesUsername(e.target.value)}
                  className="bg-gray-50 dark:bg-gray-700"
                />
                
                <TextField
                  fullWidth
                  label="LeetCode Username"
                  variant="outlined"
                  value={leetcodeUsername}
                  onChange={(e) => setLeetcodeUsername(e.target.value)}
                  className="bg-gray-50 dark:bg-gray-700"
                />
                
                <TextField
                  fullWidth
                  label="CodeChef Username"
                  variant="outlined"
                  value={codechefUsername}
                  onChange={(e) => setCodechefUsername(e.target.value)}
                  className="bg-gray-50 dark:bg-gray-700"
                />
              </div>
              
              <div className="mt-6">
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={newsletter}
                      onChange={(e) => setNewsletter(e.target.checked)}
                      color="primary"
                    />
                  }
                  label={
                    <span className="text-gray-700 dark:text-gray-300 text-sm">
                      Subscribe to our newsletter for weekly coding challenges and tips
                    </span>
                  }
                />
              </div>
              
              <div className="flex gap-4 mt-8">
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{ 
                    borderColor: 'rgb(75 85 99)',
                    color: 'rgb(75 85 99)',
                    '&:hover': {
                      borderColor: 'rgb(55 65 81)',
                      backgroundColor: 'rgba(75, 85, 99, 0.04)',
                    },
                    textTransform: 'none'
                  }}
                  onClick={() => setShowAccountLinking(false)}
                >
                  Skip for now
                </Button>
                
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ 
                    backgroundColor: 'rgb(75 85 99)',
                    '&:hover': {
                      backgroundColor: 'rgb(55 65 81)',
                    },
                    textTransform: 'none'
                  }}
                  onClick={handleNewsletterSubmit}
                >
                  Save & Continue
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

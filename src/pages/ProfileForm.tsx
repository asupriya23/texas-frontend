import React, { useState, useEffect } from "react";
import { Save, Loader2 } from "lucide-react";

export function ProfileForm({ onProfileSubmit, initialData = null }) {
  const [formData, setFormData] = useState(
    initialData || {
      leetcode: "",
      codeforces: "",
      codechef: "",
    }
  );
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const savedProfiles = localStorage.getItem("userProfiles");
    if (savedProfiles) {
      setFormData(JSON.parse(savedProfiles));
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Save to localStorage
    localStorage.setItem("userProfiles", JSON.stringify(formData));

    // Simulate API call delay
    setTimeout(() => {
      console.log("Handles submitted:", formData);
      setIsLoading(false);
      setSuccess(true);

      // Reset success message after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);

      onProfileSubmit();
    }, 1500);
  };

  const handleInputChange = (platform, value) => {
    setFormData((prev) => ({ ...prev, [platform]: value }));
  };

  return (
    <div className="space-y-6 max-w-md mx-auto mt-10">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Coding Profiles</h1>
        <p className="text-gray-600 mt-2">
          Enter your competitive programming handles
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-white p-8 rounded-lg shadow-lg"
      >
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-600 px-4 py-3 rounded-md">
            Profiles saved successfully!
          </div>
        )}

        <div className="space-y-5">
          {["leetcode", "codeforces", "codechef"].map((platform) => (
            <div key={platform}>
              <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                {platform} Username
              </label>
              <input
                type="text"
                value={formData[platform]}
                onChange={(e) => handleInputChange(platform, e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder={`Enter your ${platform} username`}
              />
            </div>
          ))}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
          ) : (
            <Save className="w-5 h-5 mr-2" />
          )}
          {isLoading ? "Saving Profiles..." : "Save Profiles"}
        </button>
      </form>

      <div className="text-center text-sm text-gray-500">
        Your profiles will be used to track your competitive programming
        progress
      </div>
    </div>
  );
}

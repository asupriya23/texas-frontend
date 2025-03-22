import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Calendar, BarChart2, TrendingUp } from 'lucide-react';

const mockData = {
  weekly: [
    { date: '2024-03-01', leetcode: 5, codeforces: 3, codechef: 2, },
    { date: '2024-03-02', leetcode: 3, codeforces: 4, codechef: 1,  },
    { date: '2024-03-03', leetcode: 7, codeforces: 2, codechef: 3, },
    { date: '2024-03-04', leetcode: 4, codeforces: 5, codechef: 2,  },
    { date: '2024-03-05', leetcode: 6, codeforces: 3, codechef: 4, },
    { date: '2024-03-06', leetcode: 8, codeforces: 4, codechef: 2, },
    { date: '2024-03-07', leetcode: 5, codeforces: 6, codechef: 3, }
  ]
};

const platformColors = {
  leetcode: '#FFA116',
  codeforces: '#1890FF',
  codechef: '#5B4638',
};

export function Dashboard() {
  const [timeRange, setTimeRange] = useState<'week' | 'month'>('week');
  const [selectedPlatforms, setSelectedPlatforms] = useState(['leetcode', 'codeforces', 'codechef',]);

  const togglePlatform = (platform: string) => {
    setSelectedPlatforms(prev =>
      prev.includes(platform)
        ? prev.filter(p => p !== platform)
        : [...prev, platform]
    );
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Coding Activity</h2>
        <div className="flex space-x-4">
          <button
            onClick={() => setTimeRange('week')}
            className={`flex items-center px-4 py-2 rounded-md ${
              timeRange === 'week' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'
            }`}
          >
            <Calendar className="w-4 h-4 mr-2" />
            Week
          </button>
          <button
            onClick={() => setTimeRange('month')}
            className={`flex items-center px-4 py-2 rounded-md ${
              timeRange === 'month' ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700'
            }`}
          >
            <Calendar className="w-4 h-4 mr-2" />
            Month
          </button>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2" />
          Problem Solving Trends
        </h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockData.weekly}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              {Object.entries(platformColors).map(([platform, color]) => (
                selectedPlatforms.includes(platform) && (
                  <Line
                    key={platform}
                    type="monotone"
                    dataKey={platform}
                    stroke={color}
                    name={platform.charAt(0).toUpperCase() + platform.slice(1)}
                  />
                )
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-4 flex items-center">
          <BarChart2 className="w-5 h-5 mr-2" />
          Platform Comparison
        </h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockData.weekly}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              {Object.entries(platformColors).map(([platform, color]) => (
                selectedPlatforms.includes(platform) && (
                  <Bar
                    key={platform}
                    dataKey={platform}
                    fill={color}
                    name={platform.charAt(0).toUpperCase() + platform.slice(1)}
                  />
                )
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        {Object.entries(platformColors).map(([platform, color]) => (
          <button
            key={platform}
            onClick={() => togglePlatform(platform)}
            className={`px-4 py-2 rounded-md border-2 ${
              selectedPlatforms.includes(platform)
                ? 'border-indigo-600 bg-indigo-50'
                : 'border-gray-300 bg-white'
            }`}
          >
            <span className="flex items-center">
              <span
                className="w-3 h-3 rounded-full mr-2"
                style={{ backgroundColor: color }}
              />
              {platform.charAt(0).toUpperCase() + platform.slice(1)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
// src/pages/MainPage.jsx
import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, CircularProgress } from "@mui/material";
import { NewsArticle } from "../components/NewsArticle";

export function MainPage() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating fetching news data
    // In a real app, you would fetch from an actual API
    const fetchNews = async () => {
      try {
        // Replace with actual API call
        // const response = await fetch('https://your-news-api-endpoint');
        // const data = await response.json();
        
        // Mock data for demonstration
        const mockData = [
          {
            id: 1,
            title: "New Features in React 18",
            description: "React 18 introduces several new features including automatic batching, new APIs like startTransition, and streaming server-side rendering with suspense.",
            imageUrl: "https://via.placeholder.com/600x300?text=React+18",
            source: "React Blog",
            date: "2025-03-20T10:30:00Z"
          },
          {
            id: 2,
            title: "Upcoming Coding Competitions",
            description: "Check out these upcoming coding competitions on Codeforces, LeetCode, and CodeChef to test your skills and improve your problem-solving abilities.",
            imageUrl: "https://via.placeholder.com/600x300?text=Coding+Competitions",
            source: "CodeBuddy News",
            date: "2025-03-21T14:15:00Z"
          },
          {
            id: 3,
            title: "Tips for Optimizing Algorithm Performance",
            description: "Learn how to optimize your algorithms for better time and space complexity with these expert tips from top competitive programmers.",
            imageUrl: "https://via.placeholder.com/600x300?text=Algorithm+Tips",
            source: "Algorithm Weekly",
            date: "2025-03-19T09:45:00Z"
          }
        ];
        
        setNews(mockData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching news:", error);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Latest Coding News (ONLY DUMMY CONTENT)
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          {news.map((article) => (
            <NewsArticle
              key={article.id}
              title={article.title}
              description={article.description}
              imageUrl={article.imageUrl}
              source={article.source}
              date={article.date}
            />
          ))}
        </Grid>
        <Grid item xs={12} md={4}>
          <Box sx={{ bgcolor: 'background.paper', p: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              Your Coding Stats
            </Typography>
            <Typography variant="body2">
              Connect your competitive programming accounts to see your stats here.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

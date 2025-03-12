
import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Initialize theme
const initializeTheme = () => {
  const savedTheme = localStorage.getItem('theme') || 'system';
  const root = document.documentElement;
  
  if (savedTheme === 'system') {
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches 
      ? 'dark' 
      : 'light';
    root.classList.add(systemTheme);
  } else {
    root.classList.add(savedTheme);
  }
};

// Run theme initialization before rendering
initializeTheme();

const rootElement = document.getElementById('root');
if (!rootElement) throw new Error('Failed to find the root element');

createRoot(rootElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

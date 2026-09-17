import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(prev => !prev);

  return (
    <div className="app">
      <header className="header">
        <h1>Eskereee Dashboard</h1>
        <button className="theme-toggle" onClick={toggleTheme}>
          {darkMode ? '🌙 Dark' : '☀️ Light'}
        </button>
      </header>

      <main className="main">
        <section className="welcome">
          <h2>Welcome!</h2>
          <p>This is the main content area of the Eskereee project.</p>
        </section>
        {/* Additional components or sections can be added here */}
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Eskereee. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
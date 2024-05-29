import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import { Home, SavingPots } from './pages';
import { Navbar } from './components/NavBar/NavBar';
import UserMenu from './components/UserMenu'; // Import the UserMenu component
import '@mantine/core/styles.css';
import './App.css';

function App() {
  return (
    <MantineProvider>
      <Router>
        <div className="app-container">
          <header>
            <Navbar />
          </header>
          <div className="content-container">
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/savingpots" element={<SavingPots />} />
                {/* 
                <GuestRoute path="/login" element={<Auth key="login" />} />
                <AuthRoute path="/settings" element={<Settings />} />
                <AuthRoute path="/editor" element={<Editor />} />
                <Route path="/editor/:slug" element={<Editor />} />
                <Route path="/article/:slug" element={<Article />} />
                <Route path="/profile/:username" element={<Profile />} />
                <AuthRoute path="/@:username" element={<Profile />} />
                */}
              </Routes>
            </main>
            <footer>
              <div className="container"></div>
            </footer>
          </div>
          <div className="user-menu-container">
            <UserMenu />
          </div>
        </div>
      </Router>
    </MantineProvider>
  );
}

export default App;

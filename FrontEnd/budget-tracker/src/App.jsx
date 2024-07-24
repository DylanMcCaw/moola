import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { MantineProvider, MantineThemeProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import AppContent from './AppContent';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dates/styles.css';
import './styles/App.css';

function App() {
  const [colorScheme, setColorScheme] = useState('light');

  const toggleColorScheme = (value) => {
    const newColorScheme = value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(newColorScheme);
    document.body.classList.toggle('dark', newColorScheme === 'dark');
  };

  useEffect(() => {
    // Initialize body class on component mount
    document.body.classList.toggle('dark', colorScheme === 'dark');
  }, [colorScheme]);

  return (
    <MantineThemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
      <MantineProvider theme={{ colorScheme }} withGlobalStyles withNormalizeCSS>
      <Provider store={store}>
        <div className={`app-container ${colorScheme}`}>
          <Notifications />
          <AppContent />
          </div>
          </Provider>
      </MantineProvider>
    </MantineThemeProvider>
  );
}

export default App;
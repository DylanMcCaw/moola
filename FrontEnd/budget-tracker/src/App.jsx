import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import AppContent from './AppContent';
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import '@mantine/dates/styles.css';
import './styles/App.css';  // Adjust this path if necessary

function App() {
  return (
    <Provider store={store}>
      <MantineProvider>
        <Notifications />
        <AppContent />
      </MantineProvider>
    </Provider>
  );
}

export default App;
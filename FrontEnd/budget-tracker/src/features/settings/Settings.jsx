import React from 'react';
import { Text, Card, Stack, Group, Box, Center, TextInput, Checkbox, Button, Select, Switch, Title} from '@mantine/core';
import './SettingsStyles.css'

function Settings() {

  return (
    <div className="savings-page">
      <Title className="dashboard-title">Settings</Title>
      <div className="center-wrapper">
            <div className="savings-card-container">
                    <Card 
                    withBorder 
                    radius="20" 
                    style={{
                        height: '100%',
                        position: 'relative',
                        display: 'flex',
                        flexDirection: 'column',
                        padding: '20px',
                    }}
                    >
                    </Card>
            </div>
        </div>
    </div>
  );
}

export default Settings;
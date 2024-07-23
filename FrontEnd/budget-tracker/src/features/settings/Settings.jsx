import React from 'react';
import { Title, Card, Text} from '@mantine/core';

function Settings() {

  return (
    <div className="savings-page">
      <Title className="dashboard-title">Settings</Title>
      <div className="center-wrapper">
            <div className="cards-container">
                <div className="full-width-card">
                    <Card 
                    withBorder 
                    radius="20" 
                    style={{
                        height: '250px',
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
    </div>
  );
}

export default Settings;
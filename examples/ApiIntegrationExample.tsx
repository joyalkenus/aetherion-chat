import React from 'react';
import FuturisticChatWidget from '../src/components/FuturisticChatWidget';

export function ApiIntegrationExample() {
  return (
    <FuturisticChatWidget
      config={{
        api: {
          endpoint: 'https://api.example.com/chat',
          headers: {
            'Authorization': 'Bearer your-token-here',
            'X-API-Key': 'your-api-key'
          }
        },
        messages: {
          placeholder: 'Ask our AI assistant...',
          assistantName: 'Company AI'
        }
      }}
    />
  );
}

export default ApiIntegrationExample; 
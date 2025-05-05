import React from 'react';
import FuturisticChatWidget, { ChatWidgetConfig, Message } from '../src/components/FuturisticChatWidget';

export function FullCustomExample() {
  // Full configuration example
  const config: ChatWidgetConfig = {
    theme: {
      primary: 'indigo',
      secondary: 'violet',
      background: 'slate',
      textColor: 'white'
    },
    messages: {
      placeholder: 'Type your question here...',
      userName: 'Valued Customer',
      assistantName: 'AI Support Expert'
    },
    animation: {
      duration: 0.3,
      bounce: 1.2
    },
    api: {
      endpoint: '/api/advanced-chat',
      headers: {
        'X-Client-ID': 'chat-widget-v1',
      }
    },
    position: 'top-right'
  };

  // Initial messages to display
  const initialMessages: Message[] = [
    {
      id: '1',
      content: '# Welcome to our support chat!\n\nHow can I help you today?',
      type: 'assistant',
      timestamp: new Date()
    }
  ];

  // Custom message handler
  const handleSendMessage = async (message: string) => {
    console.log('Message sent:', message);
    
    // You can add custom logic here, such as:
    // - Analytics tracking
    // - Message preprocessing
    // - Custom API calls
  };

  return (
    <FuturisticChatWidget
      config={config}
      onSendMessage={handleSendMessage}
      initialMessages={initialMessages}
      className="z-50"
    />
  );
}

export default FullCustomExample; 
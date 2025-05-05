'use client';

import React from 'react';
import FuturisticChatWidget, { ChatWidgetConfig } from '../../src/components/FuturisticChatWidget';

export default function Home() {
  // Define your configuration
  const config: ChatWidgetConfig = {
    theme: {
      primary: 'blue',
      secondary: 'indigo',
      background: 'slate',
      textColor: 'white'
    },
    messages: {
      placeholder: 'Ask a question...',
      assistantName: 'Aetherion AI'
    },
    api: {
      endpoint: '/api/chat'
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm">
        <h1 className="text-4xl font-bold mb-8">Aetherion Chat Widget Demo</h1>
        
        <p className="mb-4">
          This is a demonstration of the Aetherion Chat Widget integrated into a Next.js application.
        </p>
        
        <p className="mb-4">
          Click the chat button in the bottom right corner to start a conversation.
        </p>
      </div>
      
      {/* Chat Widget Integration */}
      <FuturisticChatWidget config={config} />
    </main>
  );
} 
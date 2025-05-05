# Aetherion Chat Widget Integration Guide

This guide explains how to integrate the Aetherion Chat Widget into various frameworks and environments.

## Next.js Integration

### Step 1: Install Dependencies

```bash
npm install aetherion-chat-widget
# Install required peer dependencies
npm install lucide-react framer-motion react-markdown remark-gfm react-syntax-highlighter
```

### Step 2: Prepare Tailwind CSS (if using Tailwind)

Add the required Tailwind configurations to your `tailwind.config.js`:

```js
module.exports = {
  content: [
    // ... existing content paths
    './node_modules/aetherion-chat-widget/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // ... your theme extensions
      animation: {
        bounce: 'bounce 1s infinite',
      },
      keyframes: {
        bounce: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-25%)' },
        },
      },
    },
  },
};
```

### Step 3: Add the Widget to Your Layout or Page

For app router (Next.js 13+):

```tsx
'use client';

import { FuturisticChatWidget } from 'aetherion-chat-widget';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <FuturisticChatWidget 
          config={{
            // Your configuration here
            api: {
              endpoint: '/api/chat'
            }
          }}
        />
      </body>
    </html>
  );
}
```

For pages router:

```tsx
import { FuturisticChatWidget } from 'aetherion-chat-widget';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Component {...pageProps} />
      <FuturisticChatWidget 
        config={{
          // Your configuration here
          api: {
            endpoint: '/api/chat'
          }
        }}
      />
    </>
  );
}

export default MyApp;
```

### Step 4: Create API Endpoint for Chat (Optional)

For app router (Next.js 13+), create a route handler at `app/api/chat/route.ts`:

```tsx
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { message } = body;
  
  // Process the message and generate a response
  // This is where you would call your AI service, database, etc.
  
  return NextResponse.json({
    response: `You sent: ${message}`,
    timestamp: new Date().toISOString()
  });
}
```

For pages router, create an API route at `pages/api/chat.ts`:

```tsx
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  const { message } = req.body;
  
  // Process the message and generate a response
  // This is where you would call your AI service, database, etc.
  
  return res.status(200).json({
    response: `You sent: ${message}`,
    timestamp: new Date().toISOString()
  });
}
```

## React Integration (Create React App, Vite, etc.)

### Step 1: Install Dependencies

```bash
npm install aetherion-chat-widget
# Install required peer dependencies
npm install lucide-react framer-motion react-markdown remark-gfm react-syntax-highlighter
```

### Step 2: Add to Your App

```tsx
import React from 'react';
import { FuturisticChatWidget } from 'aetherion-chat-widget';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>My React App</h1>
      </header>
      <main>
        {/* Your app content */}
      </main>
      
      {/* Add the chat widget */}
      <FuturisticChatWidget 
        config={{
          api: {
            endpoint: '/api/chat'
          }
        }}
      />
    </div>
  );
}

export default App;
```

## Connecting to Your Backend

The chat widget can connect to any backend API. Here are some common scenarios:

### Direct API Integration

```tsx
<FuturisticChatWidget
  config={{
    api: {
      endpoint: '/api/chat',
      headers: {
        'Authorization': `Bearer ${yourAuthToken}`,
        'Content-Type': 'application/json'
      }
    }
  }}
/>
```

### Custom Handler for Complex Logic

```tsx
const handleSendMessage = async (message: string) => {
  try {
    // 1. Preprocess the message if needed
    const processedMessage = message.trim();
    
    // 2. Send to your API
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${yourAuthToken}`
      },
      body: JSON.stringify({ 
        message: processedMessage,
        userId: currentUser.id,
        // Other context information
      })
    });
    
    // 3. Process the response
    const data = await response.json();
    
    // 4. You can update state or perform other actions
    if (data.action === 'redirect') {
      router.push(data.url);
    }
    
    // The widget will display the response from your API
  } catch (error) {
    console.error('Error sending message:', error);
  }
};

<FuturisticChatWidget onSendMessage={handleSendMessage} />
```

## AI Integration Examples

### OpenAI Integration (Next.js API Route)

```tsx
// app/api/chat/route.ts (Next.js App Router)
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message } = body;
    
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: message }
      ],
    });
    
    return NextResponse.json({
      response: completion.choices[0].message.content,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error calling OpenAI:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
```

### Vector Database + AI Integration

```tsx
// app/api/chat/route.ts (Next.js App Router)
import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { searchVectorDatabase } from '@/lib/vector-db';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message } = body;
    
    // Search your vector database for relevant context
    const relevantDocs = await searchVectorDatabase(message);
    const context = relevantDocs.map(doc => doc.content).join('\n\n');
    
    // Use the retrieved context to enhance the AI response
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant. Use the following context to answer the user's question:" + context },
        { role: "user", content: message }
      ],
    });
    
    return NextResponse.json({
      response: completion.choices[0].message.content,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error processing chat request:', error);
    return NextResponse.json(
      { error: 'Failed to process request' },
      { status: 500 }
    );
  }
}
```

## Advanced Configuration

### Custom Theme with Tailwind

```tsx
<FuturisticChatWidget
  config={{
    theme: {
      primary: 'indigo',    // Tailwind color name
      secondary: 'purple',  // Tailwind color name
      background: 'gray',   // Tailwind color name
      textColor: 'white'    // Tailwind color
    }
  }}
/>
```

### Deployment Considerations

1. **Environment Variables**: Store API keys and tokens securely.
2. **Rate Limiting**: Implement rate limiting on your chat API endpoints.
3. **Error Handling**: Ensure robust error handling both client and server-side.
4. **Authentication**: Secure your API endpoints with proper authentication.
5. **Content Safety**: Consider implementing content moderation for user inputs.

## Troubleshooting

### Common Issues

1. **Widget not displaying**: Ensure all dependencies are installed correctly
2. **Styling issues**: Make sure Tailwind CSS is properly configured
3. **API errors**: Check your API endpoint URL and response format
4. **Console errors**: Look for missing dependencies or import errors

For more help, check the README.md file or open an issue on GitHub. 
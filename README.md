# Aetherion Chat Widget

A highly configurable, reusable chat widget component for Next.js applications with full Markdown support, built using modern React patterns.

## Features

- 🎨 **Fully Customizable Theme** - Colors, gradients, and positioning
- 📝 **Markdown Support** - Complete markdown rendering with syntax highlighting
- 🚀 **Smooth Animations** - Framer Motion animations with configuration options
- 🌐 **API Integration** - Built-in API support or custom handlers
- 🧩 **Modular Design** - Easy to extend and maintain
- 📱 **Responsive** - Works on all device sizes
- 🎯 **TypeScript** - Full TypeScript support
- 🧪 **Sample Mode** - Testing with predefined responses

![Aetherion Chat Widget](https://via.placeholder.com/800x450.png?text=Aetherion+Chat+Widget)

## Installation

```bash
# Install the package
npm install git+https://github.com/joyalkenus/aetherion-chat.git

# Install required dependencies
npm install lucide-react framer-motion react-markdown remark-gfm react-syntax-highlighter
```

## Next.js Integration Guide

### Step 1: Add Tailwind CSS Support (if using Tailwind)

If you're using Tailwind CSS, add the widget's color utilities to your `tailwind.config.js`:

```js
module.exports = {
  content: [
    // ... your existing content paths
    './node_modules/aetherion-chat/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // ... your existing theme extensions
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
}
```

### Step 2: Create a Chat API Endpoint (Optional)

#### For App Router (Next.js 13+)

Create a file at `app/api/chat/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { message } = body;
    
    // Process message and generate response
    // This is where you would integrate with an AI service or your backend
    const response = `You said: "${message}"`;
    
    return NextResponse.json({
      response: response,
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

#### For Pages Router (Next.js <13)

Create a file at `pages/api/chat.ts`:

```typescript
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  try {
    const { message } = req.body;
    
    // Process message and generate response
    // This is where you would integrate with an AI service or your backend
    const response = `You said: "${message}"`;
    
    return res.status(200).json({
      response: response,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error processing chat request:', error);
    return res.status(500).json({ error: 'Failed to process request' });
  }
}
```

### Step 3: Add the Chat Widget to Your Next.js App

#### Option 1: Add to Layout (App Router)

Add the chat widget to your app's layout for global availability:

```tsx
// app/layout.tsx
'use client';

import { FuturisticChatWidget } from 'aetherion-chat';
import { ReactNode } from 'react';

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        
        {/* Add the chat widget */}
        <FuturisticChatWidget
          config={{
            api: {
              endpoint: '/api/chat'
            },
            theme: {
              primary: 'blue',
              secondary: 'indigo'
            }
          }}
        />
      </body>
    </html>
  );
}
```

#### Option 2: Add to a Specific Page

```tsx
// app/page.tsx or pages/index.tsx
'use client'; // Only needed for App Router

import { FuturisticChatWidget } from 'aetherion-chat';

export default function Home() {
  return (
    <main>
      <h1>Welcome to My Website</h1>
      
      {/* Other page content */}
      
      {/* Add the chat widget */}
      <FuturisticChatWidget
        config={{
          api: {
            endpoint: '/api/chat'
          }
        }}
      />
    </main>
  );
}
```

#### Option 3: Create a Custom Chat Component

For more control, create a custom component:

```tsx
// components/ChatSupport.tsx
'use client';

import { FuturisticChatWidget, ChatWidgetConfig } from 'aetherion-chat';
import { useState } from 'react';

export default function ChatSupport() {
  const [config] = useState<ChatWidgetConfig>({
    theme: {
      primary: 'indigo',
      secondary: 'purple',
      background: 'gray',
      textColor: 'white'
    },
    messages: {
      placeholder: 'Ask our support team...',
      assistantName: 'Customer Support'
    },
    api: {
      endpoint: '/api/chat'
    }
  });

  const handleSendMessage = async (message: string) => {
    // Optional custom handling
    console.log('Message sent:', message);
    
    // You can add analytics tracking or other logic here
  };

  return (
    <FuturisticChatWidget
      config={config}
      onSendMessage={handleSendMessage}
      initialMessages={[
        {
          id: '1',
          content: '# Welcome to our support chat!\n\nHow can I help you today?',
          type: 'assistant',
          timestamp: new Date()
        }
      ]}
    />
  );
}

// Then use it in your layout or page:
// <ChatSupport />
```

### Step 4: Handling Environment Variables (Optional)

For API keys or tokens, use Next.js environment variables:

```
# .env.local
NEXT_PUBLIC_CHAT_API_URL=https://api.example.com/chat
CHAT_API_KEY=your-secret-api-key
```

Then in your API route:

```typescript
// API route (not exposed to client)
const apiKey = process.env.CHAT_API_KEY;
```

And in your component:

```tsx
// Client component (only use NEXT_PUBLIC_ variables)
const apiUrl = process.env.NEXT_PUBLIC_CHAT_API_URL;
```

## Configuration Options

### Sample Mode (Testing)

```tsx
// Enable sample mode to test with pre-defined responses
<FuturisticChatWidget sampleMode={true} />
```

### Theme Customization

```tsx
<FuturisticChatWidget
  config={{
    theme: {
      primary: 'blue',     // Main color
      secondary: 'purple', // Secondary color
      background: 'slate', // Background color
      textColor: 'white'   // Text color
    }
  }}
/>
```

### Position Control

```tsx
<FuturisticChatWidget
  config={{
    position: 'bottom-right' // 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'
  }}
/>
```

### Custom Messages

```tsx
<FuturisticChatWidget
  config={{
    messages: {
      placeholder: 'Ask me anything...',
      userName: 'John',
      assistantName: 'GPT Assistant'
    }
  }}
/>
```

### Animation Settings

```tsx
<FuturisticChatWidget
  config={{
    animation: {
      duration: 0.3,  // Animation duration in seconds
      bounce: 1.2     // Bounce scale multiplier
    }
  }}
/>
```

## API Integration

### Using the Built-in API Handler

```tsx
<FuturisticChatWidget
  config={{
    api: {
      endpoint: '/api/chat',
      headers: { /* custom headers */ }
    }
  }}
/>
```

Your API endpoint should return:

```json
{
  "response": "AI response content in markdown format"
}
```

### Custom Message Handler

```tsx
const handleSendMessage = async (message: string) => {
  try {
    const response = await myCustomApi(message);
    // Handle response...
  } catch (error) {
    console.error(error);
  }
};

<FuturisticChatWidget onSendMessage={handleSendMessage} />
```

## Props Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `initialMessages` | `Message[]` | `[]` | Initial messages to display |
| `onSendMessage` | `(message: string) => Promise<void>` | - | Custom message handler |
| `className` | `string` | `''` | Additional CSS classes |
| `config` | `ChatWidgetConfig` | `{}` | Configuration object |
| `sampleMode` | `boolean` | `false` | Enable sample responses |

## TypeScript Types

```typescript
interface Message {
  id: string;
  content: string;
  type: 'user' | 'assistant';
  timestamp: Date;
}

interface ChatWidgetConfig {
  theme?: {
    primary?: string;
    secondary?: string;
    background?: string;
    textColor?: string;
  };
  messages?: {
    placeholder?: string;
    userName?: string;
    assistantName?: string;
  };
  animation?: {
    duration?: number;
    bounce?: number;
  };
  api?: {
    endpoint?: string;
    headers?: Record<string, string>;
  };
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
}
```

## Examples

You can find example implementations in the `/examples` directory:

- [`BasicExample.tsx`](./examples/BasicExample.tsx) - Minimal implementation
- [`CustomThemeExample.tsx`](./examples/CustomThemeExample.tsx) - Customizing colors and position
- [`ApiIntegrationExample.tsx`](./examples/ApiIntegrationExample.tsx) - Connecting to an API
- [`FullCustomExample.tsx`](./examples/FullCustomExample.tsx) - Full configuration with custom handler

## License

MIT

---

Built with:
- [React](https://reactjs.org/)
- [Next.js](https://nextjs.org/)
- [Framer Motion](https://www.framer.com/motion/)
- [React Markdown](https://github.com/remarkjs/react-markdown)
- [Lucide Icons](https://lucide.dev/) 
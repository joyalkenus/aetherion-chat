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

### 1. Clone this repository

```bash
git clone https://github.com/yourusername/aetherion-chat-widget.git
cd aetherion-chat-widget
```

### 2. Install dependencies

```bash
npm install
# or
yarn
```

### 3. Install Required Dependencies in Your Project

```bash
npm install lucide-react framer-motion react-markdown remark-gfm react-syntax-highlighter @types/react-syntax-highlighter
```

## Basic Usage

### Quick Start

```tsx
import { FuturisticChatWidget } from 'aetherion-chat-widget';

export default function App() {
  return <FuturisticChatWidget />;
}
```

### With Sample Mode (Testing)

```tsx
<FuturisticChatWidget sampleMode={true} />
```

### With Custom API

```tsx
<FuturisticChatWidget
  config={{
    api: {
      endpoint: '/api/chat',
      headers: { Authorization: 'Bearer token' }
    }
  }}
/>
```

## Advanced Configuration

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

## Complete Configuration Example

```tsx
import { FuturisticChatWidget, ChatWidgetConfig } from 'aetherion-chat-widget';

const config: ChatWidgetConfig = {
  theme: {
    primary: 'indigo',
    secondary: 'violet',
    background: 'slate',
    textColor: 'white'
  },
  messages: {
    placeholder: 'How can I help you today?',
    userName: 'User',
    assistantName: 'AI Helper'
  },
  animation: {
    duration: 0.25,
    bounce: 1.1
  },
  api: {
    endpoint: '/api/chat',
    headers: {
      'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
      'Content-Type': 'application/json'
    }
  },
  position: 'bottom-right'
};

export default function App() {
  const handleMessage = async (message: string) => {
    // Custom message handling logic
    console.log('Message sent:', message);
  };

  return (
    <FuturisticChatWidget
      config={config}
      onSendMessage={handleMessage}
      initialMessages={[
        {
          id: '1',
          content: 'Hello! How can I assist you today?',
          type: 'assistant',
          timestamp: new Date()
        }
      ]}
    />
  );
}
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

## Extending the Component

### Adding Custom Components

```typescript
// Extend the markdown renderer
const customComponents = {
  h1: ({ children }) => <h1 className="text-3xl font-bold">{children}</h1>,
  // Add more custom components
};

// Pass to ReactMarkdown
<ReactMarkdown components={customComponents}>
  {content}
</ReactMarkdown>
```

### Custom Styling

```tsx
<FuturisticChatWidget
  className="custom-chat-widget"
  config={{
    theme: {
      primary: 'custom-color',
      // Use custom Tailwind classes
    }
  }}
/>
```

## Tailwind CSS Configuration

If you're using Tailwind CSS, ensure these values are in your `tailwind.config.js`:

```javascript
module.exports = {
  content: [
    // ... your content paths
  ],
  theme: {
    extend: {
      colors: {
        // Ensure your theme colors are available
      },
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

## Examples

You can find example implementations in the `/examples` directory:

- [`BasicExample.tsx`](./examples/BasicExample.tsx) - Minimal implementation
- [`CustomThemeExample.tsx`](./examples/CustomThemeExample.tsx) - Customizing colors and position
- [`ApiIntegrationExample.tsx`](./examples/ApiIntegrationExample.tsx) - Connecting to an API
- [`FullCustomExample.tsx`](./examples/FullCustomExample.tsx) - Full configuration with custom handler

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT

---

Built with:
- [React](https://reactjs.org/)
- [Next.js](https://nextjs.org/)
- [Framer Motion](https://www.framer.com/motion/)
- [React Markdown](https://github.com/remarkjs/react-markdown)
- [Lucide Icons](https://lucide.dev/) 
'use client';

import React, { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Send, Bot, User, MessageSquare, X } from 'lucide-react';

// Types
export interface Message {
  id: string;
  content: string;
  type: 'user' | 'assistant';
  timestamp: Date;
}

export interface ChatWidgetConfig {
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

export interface ChatWidgetProps {
  initialMessages?: Message[];
  onSendMessage?: (message: string) => Promise<void>;
  className?: string;
  config?: ChatWidgetConfig;
  sampleMode?: boolean; // For testing with sample responses
}

// Sample MDX responses for testing
const SAMPLE_RESPONSES = [
  "Hello! I'm here to help you with any questions you might have.",
  "## Documentation\nYou can find our documentation at [docs.example.com](https://docs.example.com).",
  "Here's a code example:\n```js\nconst hello = () => {\n  console.log('Hello world');\n};\n```",
  "# Features\n- Easy to use\n- Customizable\n- Great support\n\nHow can I assist you further?",
  "Let me check that for you. It looks like you'll need to update your configuration settings."
];

// Component with full configuration options
export const FuturisticChatWidget: React.FC<ChatWidgetProps> = ({
  initialMessages = [],
  onSendMessage,
  className = '',
  config = {},
  sampleMode = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messageEndRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Configuration with defaults
  const theme = {
    primary: config?.theme?.primary || 'blue',
    secondary: config?.theme?.secondary || 'purple',
    background: config?.theme?.background || 'slate',
    textColor: config?.theme?.textColor || 'white',
  };

  const messageConfig = {
    placeholder: config?.messages?.placeholder || 'Type your message...',
    userName: config?.messages?.userName || 'User',
    assistantName: config?.messages?.assistantName || 'AI Assistant',
  };

  const animation = {
    duration: config?.animation?.duration || 0.2,
    bounce: config?.animation?.bounce || 1,
  };

  const position = {
    'bottom-right': 'bottom-6 right-6',
    'bottom-left': 'bottom-6 left-6',
    'top-right': 'top-6 right-6',
    'top-left': 'top-6 left-6',
  }[config?.position || 'bottom-right'];

  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      type: 'user',
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    try {
      if (onSendMessage) {
        await onSendMessage(inputValue);
      } else if (sampleMode) {
        // Simulate AI response with sample MDX
        await new Promise((resolve) => setTimeout(resolve, 1500));
        const randomResponse = SAMPLE_RESPONSES[Math.floor(Math.random() * SAMPLE_RESPONSES.length)];
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: randomResponse,
          type: 'assistant',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } else if (config?.api?.endpoint) {
        // Make API call if endpoint is provided
        const response = await fetch(config.api.endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...config.api.headers,
          },
          body: JSON.stringify({ message: inputValue }),
        });
        
        const data = await response.json();
        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: data.response || data.content || 'No response',
          type: 'assistant',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, assistantMessage]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Sorry, there was an error processing your message.',
        type: 'assistant',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  // Dynamic classes based on theme
  const gradientButton = `bg-gradient-to-r from-${theme.primary}-600 to-${theme.primary}-700 hover:from-${theme.primary}-700 hover:to-${theme.primary}-800`;
  const backgroundGradient = `bg-gradient-to-br from-${theme.background}-900 to-${theme.background}-800`;
  const userMessageGradient = `bg-gradient-to-r from-${theme.primary}-600 to-${theme.primary}-700`;
  const assistantBackground = `bg-${theme.background}-800`;

  return (
    <div className={`fixed ${position} z-50 ${className}`}>
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: animation.duration }}
            className="w-96"
          >
            <div className={`h-[600px] overflow-hidden ${backgroundGradient} border-${theme.background}-700 shadow-2xl rounded-lg`}>
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className={`p-4 border-b border-${theme.background}-700 flex items-center justify-between`}>
                  <div className="flex items-center gap-2">
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-br from-${theme.primary}-500 to-${theme.secondary}-600 flex items-center justify-center`}>
                      <Bot className={`w-5 h-5 text-${theme.textColor}`} />
                    </div>
                    <div>
                      <h3 className={`font-semibold text-${theme.background}-100`}>{messageConfig.assistantName}</h3>
                      <p className={`text-xs text-${theme.background}-400`}>Always here to help</p>
                    </div>
                  </div>
                  <button
                    onClick={toggleChat}
                    className={`text-${theme.background}-400 hover:text-${theme.background}-100 hover:bg-${theme.background}-800 p-2 rounded-full`}
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Messages */}
                <div className="flex-1 p-4 overflow-y-auto" ref={scrollAreaRef}>
                  <AnimatePresence initial={false}>
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        layout
                        initial={{ opacity: 0, y: 20, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ duration: 0.3 }}
                        className={`mb-4 flex ${
                          message.type === 'user' ? 'justify-end' : 'justify-start'
                        }`}
                      >
                        <div
                          className={`rounded-2xl p-3 max-w-[85%] ${
                            message.type === 'user'
                              ? `${userMessageGradient} text-${theme.textColor}`
                              : `${assistantBackground} text-${theme.background}-100`
                          }`}
                        >
                          <div className="flex items-center gap-2 mb-1">
                            {message.type === 'user' ? (
                              <User className="w-4 h-4" />
                            ) : (
                              <Bot className="w-4 h-4" />
                            )}
                            <span className="text-xs opacity-70">
                              {message.timestamp.toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </span>
                          </div>
                          {message.type === 'assistant' ? (
                            <div className="prose prose-invert prose-sm max-w-none">
                              <ReactMarkdown
                                remarkPlugins={[remarkGfm]}
                                components={{
                                  code({ node, inline, className, children, ...props }) {
                                    const match = /language-(\w+)/.exec(className || '');
                                    return !inline && match ? (
                                      <SyntaxHighlighter
                                        {...props}
                                        children={String(children).replace(/\n$/, '')}
                                        style={oneDark}
                                        language={match[1]}
                                        PreTag="div"
                                        className="rounded-lg"
                                      />
                                    ) : (
                                      <code className={`bg-${theme.background}-700 px-1 rounded text-sm`} {...props}>
                                        {children}
                                      </code>
                                    );
                                  },
                                  img: ({ src, alt }) => (
                                    <img
                                      src={src}
                                      alt={alt}
                                      className="rounded-lg max-w-full h-auto my-2"
                                    />
                                  ),
                                  table: ({ children }) => (
                                    <div className="overflow-x-auto">
                                      <table className={`min-w-full border border-${theme.background}-600 rounded-lg my-2`}>
                                        {children}
                                      </table>
                                    </div>
                                  ),
                                  blockquote: ({ children }) => (
                                    <blockquote className={`border-l-4 border-${theme.primary}-500 pl-4 my-2 text-${theme.background}-300`}>
                                      {children}
                                    </blockquote>
                                  ),
                                }}
                              >
                                {message.content}
                              </ReactMarkdown>
                            </div>
                          ) : (
                            <p className="text-sm">{message.content}</p>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  {isTyping && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className={`${assistantBackground} rounded-2xl p-3 flex items-center gap-2`}>
                        <Bot className={`w-4 h-4 text-${theme.background}-400`} />
                        <div className="flex gap-1">
                          <div className={`w-2 h-2 bg-${theme.background}-400 rounded-full animate-bounce`} />
                          <div className={`w-2 h-2 bg-${theme.background}-400 rounded-full animate-bounce delay-100`} />
                          <div className={`w-2 h-2 bg-${theme.background}-400 rounded-full animate-bounce delay-200`} />
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messageEndRef} />
                </div>

                {/* Input Area */}
                <div className={`p-4 border-t border-${theme.background}-700`}>
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleSend();
                    }}
                    className="flex gap-2"
                  >
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder={messageConfig.placeholder}
                      className={`flex-1 bg-${theme.background}-900 border border-${theme.background}-700 text-${theme.background}-100 placeholder-${theme.background}-400 focus:border-${theme.primary}-500 rounded-md p-2`}
                    />
                    <button
                      type="submit"
                      className={`${gradientButton} p-2 rounded-md disabled:opacity-50`}
                      disabled={!inputValue.trim()}
                    >
                      <Send className="w-4 h-4" />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: animation.duration }}
          >
            <button
              onClick={toggleChat}
              className={`w-14 h-14 rounded-full ${gradientButton} shadow-lg flex items-center justify-center`}
            >
              <MessageSquare className="w-6 h-6" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Default export
export default FuturisticChatWidget; 
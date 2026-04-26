'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MessageCircle, 
  X, 
  Send, 
  Sparkles, 
  ShoppingBag, 
  Star,
  ArrowRight,
  Bot
} from 'lucide-react';
import Link from 'next/link';
import { useStore } from '@/store/useStore';
import { products, searchProducts } from '@/data/products';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  products?: typeof products;
}

const quickActions = [
  { label: 'Best headphones under ₹10000', icon: '🎧' },
  { label: 'Trending T-Shirts', icon: '👕' },
  { label: 'New arrivals', icon: '✨' },
  { label: 'Best sellers', icon: '🔥' },
];

export function AIChatWidget() {
  const { isChatOpen, setChatOpen, addToCart } = useStore();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hey! I'm your AI shopping assistant. I can help you find products, compare options, and get personalized recommendations. What are you looking for?",
    },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const results = searchProducts(input);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: getResponse(input, results.length),
        products: results.slice(0, 4),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const getResponse = (query: string, count: number): string => {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('best') || lowerQuery.includes('top')) {
      return `I found ${count} top-rated products matching your search! Here are my recommendations based on quality, reviews, and value:`;
    }
    if (lowerQuery.includes('under') || lowerQuery.includes('budget')) {
      return `Great choice! I found ${count} products that fit your budget. Let me show you the best options:`;
    }
    if (lowerQuery.includes('new') || lowerQuery.includes('latest')) {
      return `Here are the latest arrivals! These are hot off the press:`;
    }
    if (lowerQuery.includes('trending') || lowerQuery.includes('popular')) {
      return `These are trending right now! Based on what other shoppers are loving:`;
    }
    
    return count > 0 
      ? `I found ${count} products that match "${query}". Here are my top picks:` 
      : `I couldn't find exact matches for "${query}". But here are some popular options you might like:`;
  };

  const handleQuickAction = (action: string) => {
    setInput(action);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setChatOpen(!isChatOpen)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-gradient-to-br from-accent-cyan to-accent-purple rounded-full shadow-lg shadow-accent-cyan/25 flex items-center justify-center"
      >
        {isChatOpen ? (
          <X className="w-6 h-6 text-black" />
        ) : (
          <Sparkles className="w-6 h-6 text-black" />
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isChatOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-3rem)] h-[500px] bg-surface rounded-2xl border border-white/10 shadow-2xl z-40 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/5 bg-gradient-to-r from-accent-cyan/10 to-accent-purple/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-cyan to-accent-purple flex items-center justify-center">
                  <Bot className="w-5 h-5 text-black" />
                </div>
                <div>
                  <h3 className="font-medium">AI Assistant</h3>
                  <p className="text-xs text-gray-400">Powered by NEXA AI</p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl ${
                      message.role === 'user'
                        ? 'bg-gradient-to-r from-accent-cyan to-accent-purple text-black'
                        : 'bg-white/5'
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                    
                    {/* Product Recommendations */}
                    {message.products && message.products.length > 0 && (
                      <div className="mt-3 space-y-2">
                        {message.products.map((product) => (
                          <Link
                            key={product.id}
                            href={`/product/${product.id}`}
                            className="flex items-center gap-3 p-2 rounded-lg bg-black/20 hover:bg-black/30 transition-colors group"
                          >
                            <div className="w-12 h-12 rounded-lg overflow-hidden bg-surface">
                              <img
                                src={product.images[0]}
                                alt={product.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            <div className="flex-1 min-w-0">
                              <h4 className="text-sm font-medium truncate">{product.name}</h4>
                              <div className="flex items-center gap-2">
                                <span className="text-xs font-medium">₹{product.price.toLocaleString()}</span>
                                <div className="flex items-center gap-0.5">
                                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                                  <span className="text-xs text-gray-400">{product.rating}</span>
                                </div>
                              </div>
                            </div>
                            <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/5 p-3 rounded-2xl">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            {messages.length === 1 && (
              <div className="px-4 pb-2">
                <div className="flex flex-wrap gap-2">
                  {quickActions.map((action) => (
                    <button
                      key={action.label}
                      onClick={() => handleQuickAction(action.label)}
                      className="px-3 py-1.5 bg-white/5 rounded-full text-xs hover:bg-white/10 transition-colors"
                    >
                      {action.icon} {action.label}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input */}
            <div className="p-4 border-t border-white/5">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask me anything..."
                  className="flex-1 px-4 py-2 bg-white/5 rounded-full text-sm outline-none focus:ring-1 focus:ring-accent-cyan"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="p-2 bg-gradient-to-r from-accent-cyan to-accent-purple rounded-full disabled:opacity-50"
                >
                  <Send className="w-4 h-4 text-black" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
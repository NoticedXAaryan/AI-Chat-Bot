'use client';

import React, { useState, useEffect } from 'react';
import { ChatLayout } from '@/components/chat/chat-layout';
import { MessageList } from '@/components/chat/message-list';
import { ChatInput } from '@/components/chat/chat-input';
import { useChatStore } from '@/lib/store/chat-store';
import { MockProvider } from '@/lib/providers/mock-provider';
import { FreeProvider } from '@/lib/providers/free-provider';

export default function ChatPage() {
  const { messages, addMessage, updateLastMessage, activeProvider } = useChatStore();
  const [isLoading, setIsLoading] = useState(false);
  
  // To avoid hydration mismatch for persisted state
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleSend = async (content: string) => {
    if (!content.trim()) return;

    // Add user message
    addMessage({ role: 'user', content });
    
    // Add empty assistant message to stream into
    addMessage({ role: 'assistant', content: '' });
    
    setIsLoading(true);
    
    try {
      // Setup provider based on active selection
      let provider;
      if (activeProvider === 'free') {
        provider = new FreeProvider();
      } else if (activeProvider === 'mock') {
        provider = new MockProvider();
      } else {
        // Fallback or placeholder for real providers
        provider = new MockProvider();
      }

      // Start streaming
      // Since we just added the user message, we pass all history including the new one
      const history = [...messages, { role: 'user' as const, content }];
      const stream = provider.streamChat(history, provider.models[0]);

      for await (const chunk of stream) {
        updateLastMessage(chunk);
      }
    } catch (error) {
      console.error('Error during chat stream:', error);
      updateLastMessage('\n\n**Error**: Failed to generate response.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isClient) return null; // Avoid hydration mismatch

  return (
    <ChatLayout>
      <MessageList messages={messages} />
      <ChatInput onSend={handleSend} isLoading={isLoading} />
    </ChatLayout>
  );
}

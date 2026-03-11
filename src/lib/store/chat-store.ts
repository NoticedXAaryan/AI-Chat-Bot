import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ChatMessage } from '@/lib/providers/base-provider';
import { encryptKey, decryptKey } from '@/lib/utils/encryption';

interface ChatState {
  messages: ChatMessage[];
  apiKeys: {
    openai?: string;
    anthropic?: string;
    gemini?: string;
  };
  activeProvider: 'mock' | 'openai' | 'anthropic' | 'gemini';
  
  // Actions
  addMessage: (message: ChatMessage) => void;
  updateLastMessage: (content: string) => void;
  setApiKey: (provider: keyof ChatState['apiKeys'], key: string) => void;
  setActiveProvider: (provider: ChatState['activeProvider']) => void;
  clearMessages: () => void;
}

export const useChatStore = create<ChatState>()(
  persist(
    (set) => ({
      messages: [],
      apiKeys: {},
      activeProvider: 'mock',

      addMessage: (message) => set((state) => ({ 
        messages: [...state.messages, message] 
      })),

      updateLastMessage: (content) => set((state) => {
        const newMessages = [...state.messages];
        if (newMessages.length > 0) {
          const lastMsg = newMessages[newMessages.length - 1];
          newMessages[newMessages.length - 1] = { ...lastMsg, content: lastMsg.content + content };
        }
        return { messages: newMessages };
      }),

      setApiKey: (provider, key) => set((state) => ({
        apiKeys: { ...state.apiKeys, [provider]: key }
      })),

      setActiveProvider: (provider) => set({ activeProvider: provider }),

      clearMessages: () => set({ messages: [] })
    }),
    {
      name: 'lumina-chat-storage',
      merge: (persistedState: any, currentState) => {
        // Decrypt keys on load
        if (persistedState?.apiKeys) {
          Object.keys(persistedState.apiKeys).forEach((key) => {
            persistedState.apiKeys[key] = decryptKey(persistedState.apiKeys[key]);
          });
        }
        return { ...currentState, ...persistedState };
      },
      partialize: (state) => {
        // Encrypt keys before saving
        const encryptedKeys = { ...state.apiKeys };
        Object.keys(encryptedKeys).forEach((key) => {
          if (encryptedKeys[key as keyof typeof encryptedKeys]) {
            encryptedKeys[key as keyof typeof encryptedKeys] = encryptKey(encryptedKeys[key as keyof typeof encryptedKeys] as string);
          }
        });
        return { ...state, apiKeys: encryptedKeys };
      }
    }
  )
);

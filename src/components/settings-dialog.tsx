import React, { useState } from 'react';
import { Settings, X } from 'lucide-react';
import { useChatStore } from '@/lib/store/chat-store';

export function SettingsDialog() {
  const [isOpen, setIsOpen] = useState(false);
  const { apiKeys, setApiKey, activeProvider, setActiveProvider } = useChatStore();

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="p-2 text-gray-400 hover:text-white transition-colors rounded-lg hover:bg-gray-800"
      >
        <Settings size={20} />
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold text-gray-100">Settings</h2>
            <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase ${
              activeProvider === 'free' || activeProvider === 'mock' 
                ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' 
                : 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
            }`}>
              {activeProvider === 'free' || activeProvider === 'mock' ? 'Free Tier' : 'Premium API'}
            </span>
          </div>
          <button 
            onClick={() => setIsOpen(false)}
            className="text-gray-400 hover:text-white p-1 rounded-md hover:bg-gray-800"
          >
            <X size={20} />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-300">Active Provider</label>
            <select 
              value={activeProvider}
              onChange={(e) => setActiveProvider(e.target.value as any)}
              className="w-full bg-gray-800 border border-gray-700 text-gray-100 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-purple-500 focus:outline-none"
            >
              <option value="free">Free Tier (Pollinations AI)</option>
              <option value="mock">Mock Provider (Local Test)</option>
              <option value="openai">OpenAI</option>
              <option value="anthropic">Anthropic</option>
              <option value="gemini">Google Gemini</option>
            </select>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">API Keys</h3>
            <p className="text-xs text-gray-500">Keys are securely stored in your browser's LocalStorage.</p>
            
            <div className="space-y-2">
              <label className="text-sm text-gray-300">OpenAI API Key</label>
              <input 
                type="password"
                value={apiKeys.openai || ''}
                onChange={(e) => setApiKey('openai', e.target.value)}
                placeholder="sk-..."
                className="w-full bg-gray-100/5 border border-gray-700 text-gray-100 rounded-xl px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none placeholder-gray-600"
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm text-gray-300">Anthropic API Key</label>
              <input 
                type="password"
                value={apiKeys.anthropic || ''}
                onChange={(e) => setApiKey('anthropic', e.target.value)}
                placeholder="sk-ant-..."
                className="w-full bg-gray-100/5 border border-gray-700 text-gray-100 rounded-xl px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none placeholder-gray-600"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm text-gray-300">Google Gemini API Key</label>
              <input 
                type="password"
                value={apiKeys.gemini || ''}
                onChange={(e) => setApiKey('gemini', e.target.value)}
                placeholder="AIza..."
                className="w-full bg-gray-100/5 border border-gray-700 text-gray-100 rounded-xl px-4 py-2 focus:ring-2 focus:ring-purple-500 focus:outline-none placeholder-gray-600"
              />
            </div>
          </div>
        </div>
        
        <div className="p-4 border-t border-gray-800 bg-gray-950 flex justify-end">
          <button 
            onClick={() => setIsOpen(false)}
            className="px-6 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-medium transition-colors"
          >
            Save & Close
          </button>
        </div>
      </div>
    </div>
  );
}

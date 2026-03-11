import React from 'react';
import { SettingsDialog } from '../settings-dialog';

interface ChatLayoutProps {
  children: React.ReactNode;
}

export function ChatLayout({ children }: ChatLayoutProps) {
  return (
    <div className="flex flex-col h-screen bg-gray-900 text-gray-100 overflow-hidden font-sans">
      <header className="flex-none p-4 border-b border-gray-800 bg-gray-950 flex items-center justify-between">
        <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">Project Lumina</h1>
        <SettingsDialog />
      </header>
      <main className="flex-1 overflow-hidden flex flex-col relative pb-32">
        {children}
      </main>
    </div>
  );
}

import React, { useState } from 'react';
import { Code, Wand2 } from 'lucide-react';
import { generateSmartCodePrompt } from '@/lib/providers/smart-code-logic';

interface CodeOptimizerBlockProps {
  onOptimize: (prompt: string) => void;
}

export function CodeOptimizerBlock({ onOptimize }: CodeOptimizerBlockProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [code, setCode] = useState('');

  const handleRefactorAndFix = () => {
    if (code.trim()) {
      const prompt = generateSmartCodePrompt(code);
      onOptimize(prompt);
      setIsOpen(false);
      setCode('');
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-900/40 to-blue-900/40 hover:from-purple-800/60 hover:to-blue-800/60 text-purple-300 rounded-xl transition-all text-sm font-semibold border border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.15)]"
      >
        <Code size={16} />
        Optimize Code
      </button>
    );
  }

  return (
    <div className="w-full bg-gray-900 border border-gray-700 rounded-xl overflow-hidden shadow-lg animate-in fade-in slide-in-from-bottom-5 duration-300">
      <div className="flex items-center justify-between p-3 border-b border-gray-800 bg-gray-950">
        <div className="flex items-center gap-2 text-purple-400 font-medium text-sm">
          <Wand2 size={16} />
          Smart Code Optimizer
        </div>
        <button 
          onClick={() => setIsOpen(false)}
          className="text-gray-400 hover:text-white transition-colors text-sm bg-gray-900 px-3 py-1.5 rounded-lg border border-gray-700"
        >
          Cancel
        </button>
      </div>
      <div className="p-3">
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Paste your broken or messy code here..."
          className="w-full h-32 bg-gray-950 border border-gray-800 text-gray-200 rounded-lg p-3 focus:outline-none focus:ring-1 focus:ring-purple-500 font-mono text-sm resize-none"
        />
        <div className="mt-3 flex justify-end">
          <button
            onClick={handleRefactorAndFix}
            disabled={!code.trim()}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 disabled:bg-gray-800 disabled:text-gray-500 text-white rounded-lg transition-colors text-sm font-medium shadow-sm"
          >
            <Wand2 size={16} />
            Refactor & Fix Code
          </button>
        </div>
      </div>
    </div>
  );
}

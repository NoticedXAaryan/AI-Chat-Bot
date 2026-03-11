import { ChatMessage } from '@/lib/providers/base-provider';
import { User, Bot, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface MessageListProps {
  messages: ChatMessage[];
}

export function MessageList({ messages }: MessageListProps) {
  return (
    <div className="flex-1 overflow-y-auto w-full p-4 space-y-6">
      {messages.length === 0 ? (
        <div className="h-full flex flex-col items-center justify-center text-gray-400">
          <Sparkles className="w-12 h-12 mb-4 opacity-50 text-purple-400" />
          <p className="text-lg">How can I help you today?</p>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto w-full space-y-6">
          {messages.map((msg, index) => (
            <div key={index} className={`flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              {msg.role !== 'user' && (
                <div className="w-8 h-8 rounded bg-purple-900 flex items-center justify-center flex-shrink-0">
                  <Bot size={18} className="text-purple-300" />
                </div>
              )}
              <div className={`px-4 py-3 rounded-2xl max-w-[85%] prose prose-invert shadow-lg backdrop-blur-md bg-opacity-80 ${
                msg.role === 'user' 
                  ? 'bg-blue-600/90 text-white rounded-tr-none border border-blue-500/30' 
                  : 'bg-gray-800/80 text-gray-100 rounded-tl-none border border-gray-700/50'
              }`}>
                <ReactMarkdown 
                  remarkPlugins={[remarkGfm]}
                  components={{
                    code({node, inline, className, children, ...props}: any) {
                      const match = /language-(\w+)/.exec(className || '');
                      return !inline && match ? (
                        <SyntaxHighlighter
                          {...props}
                          children={String(children).replace(/\n$/, '')}
                          style={vscDarkPlus}
                          language={match[1]}
                          PreTag="div"
                          className="rounded-lg !my-2"
                        />
                      ) : (
                        <code {...props} className={className + " bg-gray-900/50 px-1 py-0.5 rounded text-sm text-purple-300"}>
                          {children}
                        </code>
                      )
                    }
                  }}
                >
                  {msg.content}
                </ReactMarkdown>
              </div>
              {msg.role === 'user' && (
                <div className="w-8 h-8 rounded bg-blue-900 flex items-center justify-center flex-shrink-0">
                  <User size={18} className="text-blue-300" />
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

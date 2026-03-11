import { BaseProvider, ChatMessage } from './base-provider';

export class FreeProvider extends BaseProvider {
  constructor() {
    super('null', 'Free Provider (Pollinations.ai)', 'free', ['pollinations-text']);
  }

  async *streamChat(messages: ChatMessage[], modelId: string): AsyncGenerator<string, void, unknown> {
    try {
      // Pollinations works best with a single compiled prompt string.
      // We format the conversation history into a single string.
      const formattedHistory = messages
        .map(msg => `${msg.role.toUpperCase()}: ${msg.content}`)
        .join('\n');
      
      const encodedPrompt = encodeURIComponent(formattedHistory);
      const url = `https://text.pollinations.ai/${encodedPrompt}`;

      const response = await fetch(url);
      
      if (!response.ok || !response.body) {
        throw new Error(`Pollinations API failed or returned no body.`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value, { stream: true });
        yield chunk;
      }
    } catch (error) {
      console.error('Error in FreeProvider streamChat:', error);
      yield '\n\n**Error:** An issue occurred while communicating with the free AI service. Please try again or configure a premium API key.';
    }
  }
}

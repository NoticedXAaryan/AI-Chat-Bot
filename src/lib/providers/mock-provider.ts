import { BaseProvider, ChatMessage } from './base-provider';

export class MockProvider extends BaseProvider {
  constructor(apiKey: string = 'mock-key') {
    super(apiKey, 'Mock Provider', 'mock', ['mock-model-1', 'mock-model-fast']);
  }

  async *streamChat(messages: ChatMessage[], modelId: string): AsyncGenerator<string, void, unknown> {
    const responseText = "This is a streaming Mock response to simulate an LLM generation.";
    const chunks = responseText.split(' ');
    
    // Simulate artificial latency
    for (const chunk of chunks) {
      // Create artificial delay of 20ms between chunks
      await new Promise(resolve => setTimeout(resolve, 20));
      yield chunk + ' ';
    }
  }
}

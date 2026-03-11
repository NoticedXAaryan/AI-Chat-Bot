export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export abstract class BaseProvider {
  protected apiKey: string;
  public name: string;
  public id: string;
  public models: string[];

  constructor(apiKey: string, name: string, id: string, models: string[]) {
    this.apiKey = apiKey;
    this.name = name;
    this.id = id;
    this.models = models;
  }

  /**
   * Generates a streaming response for the given chat history and model.
   */
  abstract streamChat(messages: ChatMessage[], modelId: string): AsyncGenerator<string, void, unknown>;
  
  /**
   * Sets or updates the API key for this provider.
   */
  setApiKey(key: string): void {
    this.apiKey = key;
  }
}

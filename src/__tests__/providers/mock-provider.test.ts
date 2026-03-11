import { MockProvider } from '@/lib/providers/mock-provider';
import { describe } from 'node:test';

describe('MockProvider', () => {
  let provider: MockProvider;

  beforeEach(() => {
    provider = new MockProvider('fake-key');
  });

  it('initializes with correct properties', () => {
    expect(provider.name).toBe('Mock Provider');
    expect(provider.id).toBe('mock');
    expect(provider.models.length).toBeGreaterThan(0);
  });

  it('can update API key', () => {
    provider.setApiKey('new-key');
    // @ts-ignore - access protected property for testing
    expect(provider.apiKey).toBe('new-key');
  });

  it('streams chat responses', async () => {
    const messages = [{ role: 'user' as const, content: 'Hello' }];
    const stream = provider.streamChat(messages, provider.models[0]);

    let result = '';
    for await (const chunk of stream) {
      result += chunk;
    }

    expect(result.length).toBeGreaterThan(0);
    expect(result).toContain('Mock response');
  });

  it('simulates latency in streaming', async () => {
    const messages = [{ role: 'user' as const, content: 'Test latency' }];
    const startTime = Date.now();

    const stream = provider.streamChat(messages, provider.models[0]);
    await stream.next(); // get first chunk

    const endTime = Date.now();
    expect(endTime - startTime).toBeGreaterThanOrEqual(10); // should have some artificial delay
  });
});

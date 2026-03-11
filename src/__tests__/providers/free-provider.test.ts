import { FreeProvider } from '@/lib/providers/free-provider';

describe('FreeProvider', () => {
  let provider: FreeProvider;

  beforeEach(() => {
    provider = new FreeProvider();
  });

  it('initializes with correct properties', () => {
    expect(provider.name).toBe('Free Provider (Pollinations.ai)');
    expect(provider.id).toBe('free');
    expect(provider.models.length).toBeGreaterThan(0);
    expect(provider.models).toContain('pollinations-text');
  });

  it('streams chat responses gracefully', async () => {
    // We mock the global fetch for the test
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        body: {
          getReader: () => {
            const chunks = ['Hello ', 'from ', 'Pollinations!'];
            let i = 0;
            return {
              read: () => {
                if (i < chunks.length) {
                  return Promise.resolve({ value: new TextEncoder().encode(chunks[i++]), done: false });
                }
                return Promise.resolve({ done: true });
              }
            };
          }
        }
      })
    ) as jest.Mock;

    const messages = [{ role: 'user' as const, content: 'Say hello' }];
    const stream = provider.streamChat(messages, provider.models[0]);
    
    let result = '';
    for await (const chunk of stream) {
      result += chunk;
    }
    
    expect(result).toBe('Hello from Pollinations!');
    expect(global.fetch).toHaveBeenCalled();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });
});

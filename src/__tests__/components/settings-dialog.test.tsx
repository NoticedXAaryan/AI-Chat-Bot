import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { SettingsDialog } from '@/components/settings-dialog';
import { useChatStore } from '@/lib/store/chat-store';

// Mock the Zustand store
jest.mock('@/lib/store/chat-store', () => ({
  useChatStore: jest.fn()
}));

describe('SettingsDialog', () => {
  const mockSetApiKey = jest.fn();
  const mockSetActiveProvider = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders Free Tier badge when provider is free', () => {
    (useChatStore as unknown as jest.Mock).mockReturnValue({
      apiKeys: {},
      activeProvider: 'free',
      setApiKey: mockSetApiKey,
      setActiveProvider: mockSetActiveProvider
    });

    render(<SettingsDialog />);
    
    // Open dialog
    fireEvent.click(screen.getByRole('button'));
    
    expect(screen.getByText('Free Tier')).toBeInTheDocument();
    expect(screen.queryByText('Premium API')).not.toBeInTheDocument();
  });

  it('renders Premium API badge when provider is openai', () => {
    (useChatStore as unknown as jest.Mock).mockReturnValue({
      apiKeys: { openai: 'sk-test' },
      activeProvider: 'openai',
      setApiKey: mockSetApiKey,
      setActiveProvider: mockSetActiveProvider
    });

    render(<SettingsDialog />);
    
    // Open dialog
    fireEvent.click(screen.getByRole('button'));
    
    expect(screen.getByText('Premium API')).toBeInTheDocument();
    expect(screen.queryByText('Free Tier')).not.toBeInTheDocument();
  });
});

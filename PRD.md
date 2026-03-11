Project Lumina: Scalable Open-Source AI Chatbot
1. Vision
An extensible, privacy-first AI chat interface that is free for basic use and transforms into a high-performance productivity tool when a user provides their own API keys.

2. Core Requirements
A. Tiered Functionality
Free Tier: Out-of-the-box access to basic chat (via a default lightweight model or community proxy).

API Integration: Secure input field for OpenAI, Anthropic, and Google Gemini keys.

Scalability: A modular architecture where adding a new LLM provider requires zero changes to the UI logic.

B. "Smart Code" Optimizer
Input: Dedicated UI block for code snippets.

Action: A "Refactor & Fix" trigger.

Output: AI-driven bug detection, performance optimization, and clean-code generation.

C. Technical Constraints
Framework: Next.js (App Router), Tailwind CSS, Lucide Icons.

State: Zustand for client-side chat history and API key management.

Privacy: All API keys and chat histories are stored in LocalStorage by default.

3. SAM TDD Workflow (Execution Plan)
Agent Instruction: Follow a strict RED-GREEN-REFACTOR cycle. Create a Git commit after every successful "Green" and "Refactor" phase.

Phase 1: Architecture & Foundation
Atlas: Define the BaseProvider abstract class.

Titan: Write failing tests for model switching and response streaming.

Dyna: Implement the Mock Provider to pass tests.

Commit: feat: project initialization and provider interface abstraction

Phase 2: User Interface & Experience
Iris: Design a responsive, dark-mode-first chat layout.

Cosmo/Aria: Ensure CSS consistency and A11y compliance.

Dyna: Hook up the chat input to the streaming backend.

Commit: feat: responsive chat UI with markdown and streaming support

Phase 3: Logic & Optimization
Dyna: Implement the "Smart Code" logic (Prompt Engineering for refactoring).

Argus: Review code for edge cases in the API key encryption/storage.

Commit: feat: implement Smart Code optimizer and API key management

4. Success Metrics
Zero-Latency Switching: Changing API keys updates the model context instantly.

Error-Free Code: The "Optimizer" must pass a set of predefined broken logic tests.

Test Coverage: Minimum 80% unit test coverage via Titan.
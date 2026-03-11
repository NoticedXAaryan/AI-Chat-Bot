export const SMART_CODE_REFRACTOR_PROMPT = `
You are an expert AI software engineer. The user has provided a code snippet that they want to Refactor & Fix.
Your task is to:
1. Identify any bugs, performance issues, or bad practices.
2. Refactor the code to make it clean, performant, and robust.
3. Return ONLY the refactored code without any markdown formatting backticks if possible, or inside a single markdown code block if you must explain briefly.

Code to refactor:
`;

export function generateSmartCodePrompt(codeSnippet: string): string {
  return `${SMART_CODE_REFRACTOR_PROMPT}\n\`\`\`\n${codeSnippet}\n\`\`\`\n`;
}

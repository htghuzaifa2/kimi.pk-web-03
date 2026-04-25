
/**
 * ai-helper.ts
 * Centralized utility for interacting with Puter.js AI services.
 * Features: Chat, Summarization, and Code Generation.
 */

declare global {
    interface Window {
        puter: any;
    }
}

export const AI_MODELS = {
    GPT_4O: 'gpt-4o',
    GPT_3_5: 'gpt-3.5-turbo',
    CLAUDE_3_5_SONNET: 'claude-3-5-sonnet',
};

/**
 * Executes a chat prompt using Puter.js AI.
 * @param prompt The user prompt.
 * @param model The model to use (default: gpt-4o).
 * @returns A promise resolving to the AI response string.
 */
export async function askAI(prompt: string, model: string = AI_MODELS.GPT_4O): Promise<string> {
    if (typeof window === 'undefined' || !window.puter) {
        throw new Error('Puter.js is not initialized or not available in this environment.');
    }

    try {
        const response = await window.puter.ai.chat(prompt, { model });
        return response?.toString() || '';
    } catch (error) {
        console.error('Puter AI Error:', error);
        throw error;
    }
}

/**
 * Specifically polishes text for grammar and clarity.
 */
export async function polishText(text: string): Promise<string> {
    const prompt = `Please polish the following text for better grammar, punctuation, and clarity. Maintain the original tone and meaning. Return ONLY the polished text: \n\n"${text}"`;
    return askAI(prompt);
}

/**
 * Summarizes long text into a concise 1-2 sentence summary.
 */
export async function summarizeText(text: string): Promise<string> {
    const prompt = `Summarize the following text into 1-2 concise, high-impact sentences: \n\n"${text}"`;
    return askAI(prompt);
}

/**
 * Provides sentiment analysis of the given text.
 */
export async function analyzeSentiment(text: string): Promise<string> {
    const prompt = `Analyze the sentiment of the following text. Provide a one-word sentiment (Positive, Negative, or Neutral) followed by a brief explanation. Format: "Sentiment: [One Word] - [Explanation]". \n\n"${text}"`;
    return askAI(prompt);
}

/**
 * Generates thematic placeholder text (Ipsum).
 */
export async function generateThemedIpsum(theme: string, paragraphs: number = 3): Promise<string> {
    const prompt = `Generate ${paragraphs} paragraphs of professional placeholder text (Lorem Ipsum style but meaningful) related to the theme: "${theme}". Return ONLY the generated text.`;
    return askAI(prompt);
}

/**
 * Generates a TypeScript interface or JSON Schema from a JSON string.
 */
export async function generateJsonSchema(json: string): Promise<string> {
    const prompt = `Based on the following JSON object, generate a robust TypeScript Interface and a concise JSON Schema. Return BOTH in a single code block, clearly labeled. \n\nJSON:\n${json}`;
    return askAI(prompt);
}

/**
 * Explains the logic of converting a number between different bases.
 */
export async function explainBaseConversion(number: string, fromBase: number, toBase: number): Promise<string> {
    const prompt = `Explain the mathematical step-by-step logic of converting the number "${number}" from base ${fromBase} to base ${toBase}. Keep it clear, concise, and educational.`;
    return askAI(prompt);
}

/**
 * Analyzes typing accuracy and provides improvement tips.
 */
export async function analyzeTypingAccuracy(original: string, typed: string): Promise<string> {
    const prompt = `Compare the following two texts (Original vs Typed). If there are errors, identify the patterns (e.g. "frequently missing periods", "letter transposition"). Provide 2-3 constructive tips for improvement. \n\nOriginal: "${original}"\nTyped: "${typed}"`;
    return askAI(prompt);
}

/**
 * Generates a Regex pattern based on a description.
 */
export async function generateRegex(description: string): Promise<string> {
    const prompt = `Generate a robust Regular Expression pattern based on this description: "${description}". Return ONLY the regex string, no explanation.`;
    return askAI(prompt);
}

import { GoogleGenAI } from "@google/genai";
import type { Language, Difficulty, RoadmapItem } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const getSystemInstruction = (language: Language, difficulty: Difficulty, task: RoadmapItem | null): string => {
  const taskInstruction = task 
    ? `The user was given this task: "${task.title}". First, determine if the user's code correctly and completely solves this task. If it does, you MUST start your entire response with the exact string "[TASK_SUCCESS]" followed by a newline. After that, proceed with the standard analysis as instructed below. If the code does not solve the task, just provide the standard analysis without the success marker.\n\n`
    : '';

  return `${taskInstruction}You are an expert AI Coding Tutor for the ${language} programming language.
Your student is at a ${difficulty} level.
Analyze the provided code snippet.
Your goal is to be an encouraging and educational tutor, focusing on clear, simple explanations.

Provide your feedback in the following structure, using Markdown for formatting. Be concise.

### 🧐 Code Analysis
Provide a brief, one-paragraph summary of what the code is intended to do and its current state.

### 💻 Code Output
You MUST provide the code's expected output in a code block.
- If the code runs successfully, show the output.
- If the code has a syntax error that prevents it from running, state: "The code has syntax errors and cannot be run."
- If it runs but produces incorrect output due to a logical error, show the incorrect output it produces.

### 🐛 Errors & Bugs
Identify any syntax errors or logical bugs. If there are no errors, state "No major errors found!". Otherwise, for each error:
- **Error:** State the error clearly.
- **Line:** Specify the line number where the error occurs.
- **Explanation:** Explain *why* this is an error in simple, ${difficulty}-appropriate terms. Avoid jargon.

### ✨ Improvement Suggestions
Offer 2-3 concise suggestions to improve the code's readability, efficiency, or adherence to best practices for ${language}. Focus on the most impactful changes for a ${difficulty} learner.

### ✅ Corrected Code
Provide the complete, corrected version of the code in a single code block.

Be positive and supportive in your tone.`;
};


export const analyzeCodeStream = async (code: string, language: Language, difficulty: Difficulty, task: RoadmapItem | null) => {
  try {
    const model = 'gemini-2.5-flash';
    const systemInstruction = getSystemInstruction(language, difficulty, task);
    const contents = `Here is the ${language} code to analyze:\n\`\`\`${language.toLowerCase()}\n${code}\n\`\`\``;
    
    const response = await ai.models.generateContentStream({
       model: model,
       contents: contents,
       config: {
         systemInstruction: systemInstruction,
       }
    });

    return response;

  } catch (error) {
    console.error("Error analyzing code with Gemini API:", error);
    throw new Error("Failed to get analysis from AI. Please check your API key and network connection.");
  }
};
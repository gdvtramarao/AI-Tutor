import type { Language } from '../types';
import { getPredictedCodeOutput } from './geminiService';

export const executeCode = async (code: string, language: Language): Promise<{ output: string; error: string }> => {
  if (language === 'JavaScript') {
    const logs: string[] = [];
    const originalConsoleLog = console.log;
    
    // Temporarily override console.log to capture output
    console.log = (...args) => {
      const formattedArgs = args.map(arg => {
        if (arg === undefined) return 'undefined';
        if (arg === null) return 'null';
        try {
          // Use JSON.stringify for objects/arrays for a structured view
          if (typeof arg === 'object') return JSON.stringify(arg, null, 2);
          return String(arg);
        } catch (e) {
          return '[Unserializable Object]';
        }
      });
      logs.push(formattedArgs.join(' '));
    };

    try {
      // Use the Function constructor for safer execution than eval()
      const func = new Function(code);
      const result = func();
      // If the function returns a value, log it as well.
      if (result !== undefined) {
          logs.push(`Returned: ${JSON.stringify(result, null, 2)}`);
      }
      return { output: logs.join('\n') || 'Code executed successfully with no output.', error: '' };
    } catch (e: any) {
      return { output: '', error: e.toString() };
    } finally {
      // Restore the original console.log
      console.log = originalConsoleLog;
    }
  }

  if (language === 'Python') {
    try {
      const result = await getPredictedCodeOutput(code, language);
      const isError = result.toLowerCase().includes("error") || result.includes("cannot be run");

      if (isError) {
        return { output: '', error: result };
      }
      return { output: result, error: '' };
    } catch (e: any) {
      return { output: '', error: `An unexpected error occurred while analyzing the code: ${e.toString()}` };
    }
  }

  return { output: '', error: `Execution for ${language} is not supported.` };
};
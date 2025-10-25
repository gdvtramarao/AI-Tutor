import React, { useMemo } from 'react';
import type { Language } from '../types';

// Utility to escape HTML to prevent XSS
const escapeHtml = (text: string) => {
  return text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
};

// Language definitions with token patterns (order matters)
const langPatterns: Record<Language, { type: string; pattern: RegExp }[]> = {
  Python: [
    { type: 'comment', pattern: /^#.*/ },
    { type: 'string', pattern: /^(?:'''[\s\S]*?'''|"""[\s\S]*?"""|'[^']*'|"[^"]*")/ },
    { type: 'keyword', pattern: /^\b(def|class|if|else|elif|for|while|return|import|from|in|and|or|not|is|True|False|None|try|except|finally|with|as|lambda|pass|break|continue|global|nonlocal|yield|assert|del|async|await)\b/ },
    { type: 'number', pattern: /^\b\d+(\.\d+)?\b/ },
    { type: 'operator', pattern: /^[+\-*/%=&|<>!^~]+/ },
    { type: 'punctuation', pattern: /^[{}()[\].,;:]/ },
  ],
  JavaScript: [
    { type: 'comment', pattern: /^\/\*[\s\S]*?\*\/|^\/\/.*/ },
    { type: 'string', pattern: /^`(?:\\`|[^`])*`|^'(?:\\'|[^'])*'|^"(?:\\"|[^"])*"/ },
    { type: 'keyword', pattern: /^\b(function|class|if|else|for|while|return|import|from|const|let|var|new|true|false|null|undefined|async|await|try|catch|finally|switch|case|break|continue|do|export|default|of|in|instanceof|typeof|yield|delete|void|with|this|super|get|set|debugger)\b/ },
    { type: 'number', pattern: /^\b\d+(\.\d+)?\b/ },
    { type: 'operator', pattern: /^[+\-*/%=&|<>!^~?:]+/ },
    { type: 'punctuation', pattern: /^[{}()[\].,;]/ },
  ],
  Java: [
    { type: 'comment', pattern: /^\/\*[\s\S]*?\*\/|^\/\/.*/ },
    { type: 'string', pattern: /^"(?:\\"|[^"])*"/ },
    { type: 'keyword', pattern: /^\b(public|private|protected|static|final|void|int|double|char|boolean|String|class|interface|enum|if|else|for|while|return|import|package|new|true|false|null|try|catch|finally|switch|case|break|continue|do|this|super|extends|implements|throws|throw|instanceof|synchronized)\b/ },
    { type: 'number', pattern: /^\b\d+(\.\d+)?\b/ },
    { type: 'operator', pattern: /^[+\-*/%=&|<>!^~?:]+/ },
    { type: 'punctuation', pattern: /^[{}()[\].,;]/ },
  ],
  'C++': [
    { type: 'comment', pattern: /^\/\*[\s\S]*?\*\/|^\/\/.*/ },
    { type: 'string', pattern: /^"(?:\\"|[^"])*"/ },
    { type: 'keyword', pattern: /^\b(int|double|char|bool|string|void|if|else|for|while|return|#include|using|namespace|std|cout|cin|class|struct|enum|public|private|protected|virtual|const|static|new|delete|true|false|nullptr|try|catch|throw|template|typename)\b/ },
    { type: 'number', pattern: /^\b\d+(\.\d+)?\b/ },
    { type: 'operator', pattern: /^[+\-*/%=&|<>!^~?:]+|::/ },
    { type: 'punctuation', pattern: /^[{}()[\].,;]/ },
  ],
  C: [
    { type: 'comment', pattern: /^\/\*[\s\S]*?\*\/|^\/\/.*/ },
    { type: 'string', pattern: /^"(?:\\"|[^"])*"/ },
    { type: 'keyword', pattern: /^\b(int|float|double|char|void|if|else|for|while|return|#include|#define|struct|enum|typedef|sizeof|const|static|extern|volatile|break|continue|switch|case|default|goto|long|short|signed|unsigned|union)\b/ },
    { type: 'number', pattern: /^\b\d+(\.\d+)?\b/ },
    { type: 'operator', pattern: /^[+\-*/%=&|<>!^~?:]+/ },
    { type: 'punctuation', pattern: /^[{}()[\].,;]/ },
  ],
};

const highlightCode = (code: string, language: Language): string => {
  if (!code) return '';
  const patterns = langPatterns[language];
  let remainingCode = code;
  let highlightedHtml = '';

  while (remainingCode.length > 0) {
    let matched = false;
    for (const { type, pattern } of patterns) {
      const match = remainingCode.match(pattern);
      if (match) {
        const token = match[0];
        highlightedHtml += `<span class="token-${type}">${escapeHtml(token)}</span>`;
        remainingCode = remainingCode.substring(token.length);
        matched = true;
        break;
      }
    }

    if (!matched) {
      highlightedHtml += escapeHtml(remainingCode[0]);
      remainingCode = remainingCode.substring(1);
    }
  }

  // Preserve trailing newline to prevent layout shifts
  if (code.endsWith('\n')) {
      highlightedHtml += '\n';
  }

  return highlightedHtml;
};

interface SyntaxHighlighterProps {
  code: string;
  language: Language;
}

const SyntaxHighlighter: React.FC<SyntaxHighlighterProps> = ({ code, language }) => {
  const highlightedMarkup = useMemo(() => ({
    __html: highlightCode(code, language)
  }), [code, language]);

  return (
    <pre className="w-full h-full m-0 border-none bg-transparent" aria-hidden="true">
      <code dangerouslySetInnerHTML={highlightedMarkup} />
    </pre>
  );
};

export default SyntaxHighlighter;
import { useState } from "react";
import { Copy, Check, Code2 } from "lucide-react";

interface CodePreviewProps {
  code: string;
  language?: string;
  title?: string;
  showLineNumbers?: boolean;
}

export function CodePreview({ 
  code, 
  language = "tsx", 
  title,
  showLineNumbers = true 
}: CodePreviewProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const lines = code.split('\n');

  return (
    <div className="code-preview">
      {title && (
        <div className="code-preview-header">
          <div className="code-preview-title">
            <Code2 className="code-preview-icon" />
            {title}
          </div>
          <button 
            onClick={handleCopy}
            className="code-preview-copy-btn"
            title={copied ? "Copied!" : "Copy code"}
          >
            {copied ? <Check className="copy-icon" /> : <Copy className="copy-icon" />}
          </button>
        </div>
      )}
      <pre className={`code-preview-content language-${language}`}>
        {showLineNumbers ? (
          <div className="code-with-lines">
            <div className="line-numbers">
              {lines.map((_, index) => (
                <div key={index} className="line-number">
                  {index + 1}
                </div>
              ))}
            </div>
            <code className="code-content">{code}</code>
          </div>
        ) : (
          <code className="code-content">{code}</code>
        )}
      </pre>
    </div>
  );
}

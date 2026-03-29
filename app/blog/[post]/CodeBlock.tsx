"use client";

import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vscDarkPlus } from "react-syntax-highlighter/dist/cjs/styles/prism";

export default function CodeBlock({ node, className, children, ...rest }: any) {
  const [copied, setCopied] = useState(false);
  const match = /language-(\w+)/.exec(className || "");
  const codeString = String(children).replace(/\n$/, "");

  const handleCopy = () => {
    navigator.clipboard.writeText(codeString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (match) {
    const originalLanguage = match[1];
    const language = originalLanguage.toLowerCase();
    
    return (
      <div style={{ position: "relative", margin: "1.5rem 0" }}>
        {/* Language Badge & Copy Button Header */}
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          padding: "0.4rem 1rem",
          backgroundColor: "#2d2d2d",
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
          borderBottom: "1px solid #1e1e1e",
          zIndex: 10
        }}>
          <span style={{ color: "#a0a0a0", fontSize: "0.75rem", fontFamily: "monospace", textTransform: "uppercase" }}>
            {language}
          </span>
          <button
            onClick={handleCopy}
            style={{
              background: "none",
              border: "none",
              color: copied ? "#4ade80" : "#a0a0a0",
              fontSize: "0.75rem",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "0.3rem",
              transition: "color 0.2s",
              padding: 0
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = copied ? "#4ade80" : "#fff")}
            onMouseLeave={(e) => (e.currentTarget.style.color = copied ? "#4ade80" : "#a0a0a0")}
          >
            {copied ? (
              <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"></polyline>
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
              </svg>
            )}
            {copied ? "Copied!" : "Copy code"}
          </button>
        </div>
        
        <SyntaxHighlighter
          {...rest}
          PreTag="div"
          children={codeString}
          language={language}
          style={{
            ...vscDarkPlus,
            "variable": { color: "#d4d4d4" }, // 변수는 원하시던 대로 하얀색 유지
            "property": { color: "#d4d4d4" }, 
            "plain": { color: "#d4d4d4" },
            "builtin": { color: "#d4d4d4" },
            "operator": { color: "#c586c0" }, // 연산자는 VSCode 특유의 예쁜 보라/핑크색으로 연출!
            // 문자열, 상수, 숫자는 vscDarkPlus의 기본 예쁜 색상(초록/다홍 등)으로 돌아갑니다.
          }}
          customStyle={{ 
            borderRadius: "8px", 
            fontSize: "0.9rem", 
            padding: "1rem",
            paddingTop: "2.5rem",
            margin: 0,
            color: "#d4d4d4", // 일반 텍스트가 빨갛게 변하는 현상 방지 1
          }}
          codeTagProps={{
            style: {
              backgroundColor: "transparent",
              padding: 0,
              borderRadius: 0,
              color: "#d4d4d4", // 일반 텍스트가 빨갛게 변하는 현상 방지 2
            }
          }}
        />
      </div>
    );
  }

  return (
    <code {...rest} className={className}>
      {children}
    </code>
  );
}

"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

const MarkdownRenderer = ({ content }: { content: string }) => {
  return (
    <ReactMarkdown
      rehypePlugins={[rehypeRaw]}
      components={{
        img: ({ node, ...props }: any) => {
          const isBadge = props.src?.includes("shields.io") || props.src?.includes("img.shields.io");
          return (
            <Image
              src={props.src}
              alt={props.alt || "Markdown Image"}
              width={1000}
              height={600}
              className={isBadge ? "" : "framed-image"}
              style={{ height: 'auto', width: 'auto', maxWidth: '100%' }}
              unoptimized={true}
            />
          );
        },
        a: ({ node, ...props }: any) => {
          const href = props.href || "";
          const isExternal = href.startsWith("http") && !href.includes("jeonghoonpark.com");
          if (isExternal) {
            return <a {...props} target="_blank" rel="noopener noreferrer" />;
          }
          return <a {...props} />;
        },
        iframe: ({ node, ...props }: any) => {
          // Fix React console warnings for boolean and deprecated attributes
          const normalizedProps = { ...props };
          
          const isFull = 
            normalizedProps.allowfullscreen === "true" || 
            normalizedProps.allowFullScreen === "true" ||
            normalizedProps.allowfullscreen === "" ||
            normalizedProps.allowFullScreen === "" ||
            !!normalizedProps.allowFullScreen;

          delete normalizedProps.allowfullscreen;
          delete normalizedProps.allowFullScreen;
          delete normalizedProps.webkitallowfullscreen;
          delete normalizedProps.webkitAllowFullScreen;
          delete normalizedProps.mozallowfullscreen;
          delete normalizedProps.mozAllowFullScreen;

          if (isFull) {
            normalizedProps.allowFullScreen = true;
          }

          if (normalizedProps.frameborder) {
            normalizedProps.frameBorder = normalizedProps.frameborder;
            delete normalizedProps.frameborder;
          }
          delete normalizedProps.frameBorder; // Double cleanup
          if (props.frameborder || props.frameBorder) {
            normalizedProps.frameBorder = props.frameborder || props.frameBorder;
          }

          return <iframe {...normalizedProps} />;
        },
      }}
    >
      {content}
    </ReactMarkdown>

  );
};

function RepoCard({ repo }: { repo: string }) {
  const [data, setData] = useState<{
    language: string;
    stars: number;
    forks: number;
    updated: string;
    description: string;
    name: string;
  } | null>(null);

  useEffect(() => {
    fetch(`https://api.github.com/repos/${repo}`)
      .then((res) => res.json())
      .then((json) => {
        setData({
          language: json.language,
          stars: json.stargazers_count,
          forks: json.forks_count,
          updated: new Date(json.pushed_at).toLocaleDateString(),
          description: json.description,
          name: json.name,
        });
      })
      .catch((err) => console.error("Error fetching repo info:", err));
  }, [repo]);

  if (!data) {
    return (
      <div className="repo-card loading">
        <div className="repo-name">{repo}</div>
        <div className="repo-desc">Loading repository details...</div>
      </div>
    );
  }

  return (
    <a
      href={`https://github.com/${repo}`}
      target="_blank"
      rel="noopener noreferrer"
      className="repo-card"
    >
      <div className="repo-header">
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          width="24"
          height="24"
          className="repo-icon"
        >
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
        </svg>
        <div className="repo-name">{data.name}</div>
      </div>
      <div className="repo-desc">{data.description || "No description provided."}</div>
      <div className="repo-footer">
        {data.language && (
          <div className="repo-stat">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M16 18l6-6-6-6M8 6l-6 6 6 6" /></svg>
            {data.language}
          </div>
        )}
        <div className="repo-stat">
          <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" /></svg>
          {data.stars}
        </div>
        <div className="repo-stat">
          <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M18.5 3C17.12 3 16 4.12 16 5.5c0 .94.53 1.75 1.3 2.17-.18.79-.53 1.54-1.05 2.2a25.32 25.32 0 0 1-1.65 1.83l-1.6 1.6-1.6-1.6c-.66-.66-1.22-1.26-1.65-1.83a8.91 8.91 0 0 1-1.05-2.2C9.47 7.25 10 6.44 10 5.5 10 4.12 8.88 3 7.5 3S5 4.12 5 5.5c0 .94.53 1.75 1.3 2.17.43 1.89 1.48 3.55 2.7 4.93L12 15.6l3-3c1.22-1.38 2.27-3.04 2.7-4.93.77-.42 1.3-1.23 1.3-2.17 0-1.38-1.12-2.5-2.5-2.5zm-11 5c-.83 0-1.5-.67-1.5-1.5S6.67 5 7.5 5 9 5.67 9 6.5 8.33 8 7.5 8zm11 0c-.83 0-1.5-.67-1.5-1.5S17.67 5 18.5 5 20 5.67 20 6.5 19.33 8 18.5 8zM12 21a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" /></svg>
          {data.forks}
        </div>
        <div className="repo-stat">
          <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" /></svg>
          {data.updated}
        </div>
      </div>
    </a>
  );
}

function processContent(content: string) {
  // Regex for includes: repository_card
  // Group 2 is the type, Group 3 is the value (repo_name)
  const regex = /({%\s*include\s+(repository_card\.liquid)\s+.*?(?:repo_name)=["'](.*?)["'].*?%})/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;

  while ((match = regex.exec(content)) !== null) {
    const [fullMatch, , type, value] = match;
    const startIndex = match.index;

    // Push text before the match
    if (startIndex > lastIndex) {
      parts.push(
        <MarkdownRenderer key={lastIndex} content={content.substring(lastIndex, startIndex)} />
      );
    }

    // Push the component
    if (type === "repository_card.liquid") {
      parts.push(<RepoCard key={startIndex} repo={value} />);
    }

    lastIndex = startIndex + fullMatch.length;
  }

  // Push remaining text
  if (lastIndex < content.length) {
    parts.push(
      <MarkdownRenderer key={lastIndex} content={content.substring(lastIndex)} />
    );
  }

  return parts;
}

interface DetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string;
  image?: string;
  tech?: string[];
  period?: string;
  onPrevious?: () => void;
  onNext?: () => void;
}

export default function DetailsModal({
  isOpen,
  onClose,
  title,
  content,
  image,
  tech,
  period,
  onPrevious,
  onNext,
}: DetailsModalProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo(0, 0);
    }
  }, [title]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            width="24"
            height="24"
          >
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>

        {onPrevious && (
          <button
            className="modal-nav b-prev"
            onClick={(e) => {
              e.stopPropagation();
              onPrevious();
            }}
            aria-label="Previous Project"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" width="48" height="48">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
        )}

        {onNext && (
          <button
            className="modal-nav b-next"
            onClick={(e) => {
              e.stopPropagation();
              onNext();
            }}
            aria-label="Next Project"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" width="48" height="48">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        )}

        <div className="modal-scroll-area" ref={scrollRef}>
          <div className="modal-header">
            {period && <span className="modal-period">{period}</span>}
            <h2 className="modal-title">{title}</h2>
            {tech && tech.length > 0 && (
              <div className="modal-tech-tags">
                {tech.map((t, i) => (
                  <span key={i} className="tech-tag">{t}</span>
                ))}
              </div>
            )}
          </div>

          <div className="modal-body markdown-content">{processContent(content)}</div>
        </div>
      </div>
    </div>
  );
}

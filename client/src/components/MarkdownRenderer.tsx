import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface MarkdownRendererProps {
  content: string;
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <ReactMarkdown
      className="prose prose-stone dark:prose-invert max-w-none"
      components={{
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <SyntaxHighlighter
              style={oneLight}
              language={match[1]}
              PreTag="div"
              {...props}
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code className={className} {...props}>
              {children}
            </code>
          );
        },
        img({ node, src, ...props }) {
          let imageSrc = src;
          if (src?.startsWith('assets/')) {
            imageSrc = `/${src}`;
          }
          return (
            <img
              {...props}
              src={imageSrc}
              style={{ maxWidth: '100%', height: 'auto' }}
              alt={props.alt || ''}
            />
          );
        },
        a({ node, ...props }) {
          return (
            <a
              {...props}
              style={{ color: '#1a0dab', textDecoration: 'underline' }}
            >
              {props.children}
            </a>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}

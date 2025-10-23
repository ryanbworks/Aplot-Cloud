'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import Link from 'next/link';
import { ExternalLink, Code, AlertCircle, CheckCircle, Info, Lightbulb, Copy, Check } from 'lucide-react';
import { useState } from 'react';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export function MarkdownRenderer({ content, className = "" }: MarkdownRendererProps) {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCode(id);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className={`prose prose-invert max-w-none ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Headings with enhanced styling
          h1: ({ children, ...props }) => (
            <h1 
              className="text-4xl font-bold text-foreground mb-8 mt-12 pb-4 border-b-2 border-green-500/30 bg-gradient-to-r from-green-500/10 to-transparent px-4 py-2 rounded-t-lg" 
              {...props}
            >
              {children}
            </h1>
          ),
          h2: ({ children, ...props }) => (
            <h2 
              className="text-3xl font-bold text-foreground mb-6 mt-10 pb-3 border-b border-green-500/20 bg-gradient-to-r from-green-500/5 to-transparent px-3 py-1 rounded-t-md" 
              {...props}
            >
              {children}
            </h2>
          ),
          h3: ({ children, ...props }) => (
            <h3 
              className="text-2xl font-semibold text-foreground mb-4 mt-8 flex items-center gap-2" 
              {...props}
            >
              <div className="w-1 h-6 bg-gradient-to-b from-green-500 to-green-400 rounded-full"></div>
              {children}
            </h3>
          ),
          h4: ({ children, ...props }) => (
            <h4 
              className="text-xl font-semibold text-foreground mb-3 mt-6 text-green-400" 
              {...props}
            >
              {children}
            </h4>
          ),
          h5: ({ children, ...props }) => (
            <h5 
              className="text-lg font-medium text-foreground mb-2 mt-4 text-green-300" 
              {...props}
            >
              {children}
            </h5>
          ),
          h6: ({ children, ...props }) => (
            <h6 
              className="text-base font-medium text-foreground mb-2 mt-3 text-green-200" 
              {...props}
            >
              {children}
            </h6>
          ),

          // Enhanced paragraphs
          p: ({ children, ...props }) => (
            <p className="text-foreground/90 leading-relaxed mb-6 text-base" {...props}>
              {children}
            </p>
          ),

          // Enhanced links with better styling
          a: ({ href, children, ...props }) => {
            const isExternal = href?.startsWith('http');
            return (
              <Link
                href={href || '#'}
                className="text-green-400 hover:text-green-300 underline decoration-green-400/60 hover:decoration-green-300 transition-all duration-300 inline-flex items-center gap-1 font-medium hover:bg-green-500/10 px-1 py-0.5 rounded"
                target={isExternal ? '_blank' : undefined}
                rel={isExternal ? 'noopener noreferrer' : undefined}
                {...props}
              >
                {children}
                {isExternal && <ExternalLink className="h-3 w-3" />}
              </Link>
            );
          },

          // Enhanced lists with better spacing and styling
          ul: ({ children, ...props }) => (
            <ul className="list-none text-foreground/90 mb-6 space-y-3" {...props}>
              {children}
            </ul>
          ),
          ol: ({ children, ...props }) => (
            <ol className="list-none text-foreground/90 mb-6 space-y-3" {...props}>
              {children}
            </ol>
          ),
          li: ({ children, ...props }) => (
            <li className="text-foreground/90 flex items-start gap-3" {...props}>
              <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
              <span>{children}</span>
            </li>
          ),

          // Enhanced code blocks with copy functionality
          code: ({ className, children, ...props }) => {
            const match = /language-(\w+)/.exec(className || '');
            const language = match ? match[1] : '';
            const isInline = !className?.includes('language-');
            const codeId = Math.random().toString(36).substr(2, 9);
            
            if (!isInline && language) {
              return (
                <div className="my-8 rounded-xl overflow-hidden border border-green-500/20 bg-gradient-to-br from-muted/30 to-muted/10 shadow-2xl">
                  <div className="bg-gradient-to-r from-green-500/20 to-green-400/10 px-6 py-3 border-b border-green-500/20 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="flex gap-1">
                        <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      </div>
                      <Code className="h-4 w-4 text-green-400" />
                      <span className="text-sm font-semibold text-green-300">
                        {language.toUpperCase()}
                      </span>
                    </div>
                    <button
                      onClick={() => copyToClipboard(String(children).replace(/\n$/, ''), codeId)}
                      className="flex items-center gap-2 px-3 py-1 text-xs font-medium text-green-400 hover:text-green-300 hover:bg-green-500/20 rounded-md transition-all duration-200"
                    >
                      {copiedCode === codeId ? (
                        <>
                          <Check className="h-3 w-3" />
                          Copiado!
                        </>
                      ) : (
                        <>
                          <Copy className="h-3 w-3" />
                          Copiar
                        </>
                      )}
                    </button>
                  </div>
                  <pre className="p-6 overflow-x-auto bg-gradient-to-br from-background/50 to-muted/20">
                    <code className={`language-${language} text-sm font-mono text-foreground/95 leading-relaxed`}>
                      {String(children).replace(/\n$/, '')}
                    </code>
                  </pre>
                </div>
              );
            }
            
            return (
              <code 
                className="bg-gradient-to-r from-green-500/20 to-green-400/10 text-green-300 px-2 py-1 rounded-md text-sm font-mono border border-green-500/30" 
                {...props}
              >
                {children}
              </code>
            );
          },

          // Enhanced blockquotes
          blockquote: ({ children, ...props }) => (
            <blockquote 
              className="border-l-4 border-green-400 bg-gradient-to-r from-green-500/10 to-transparent pl-6 py-4 my-8 rounded-r-xl shadow-lg" 
              {...props}
            >
              <div className="text-foreground/90 italic text-lg leading-relaxed">
                {children}
              </div>
            </blockquote>
          ),

          // Enhanced tables
          table: ({ children, ...props }) => (
            <div className="overflow-x-auto my-8 rounded-xl border border-green-500/20 shadow-lg">
              <table className="w-full border-collapse" {...props}>
                {children}
              </table>
            </div>
          ),
          thead: ({ children, ...props }) => (
            <thead className="bg-gradient-to-r from-green-500/20 to-green-400/10" {...props}>
              {children}
            </thead>
          ),
          tbody: ({ children, ...props }) => (
            <tbody className="bg-gradient-to-b from-background/50 to-muted/20" {...props}>
              {children}
            </tbody>
          ),
          tr: ({ children, ...props }) => (
            <tr className="border-b border-green-500/10 hover:bg-green-500/5 transition-all duration-300" {...props}>
              {children}
            </tr>
          ),
          th: ({ children, ...props }) => (
            <th className="border-r border-green-500/20 px-6 py-4 text-left font-bold text-foreground text-sm uppercase tracking-wider" {...props}>
              {children}
            </th>
          ),
          td: ({ children, ...props }) => (
            <td className="border-r border-green-500/10 px-6 py-4 text-foreground/90" {...props}>
              {children}
            </td>
          ),

          // Enhanced horizontal rule
          hr: ({ ...props }) => (
            <div className="my-12 flex items-center justify-center" {...props}>
              <div className="w-full h-px bg-gradient-to-r from-transparent via-green-500/30 to-transparent"></div>
              <div className="mx-4 w-2 h-2 bg-green-500 rounded-full"></div>
              <div className="w-full h-px bg-gradient-to-r from-transparent via-green-500/30 to-transparent"></div>
            </div>
          ),

          // Enhanced images
          img: ({ src, alt, ...props }) => (
            <div className="my-8 flex justify-center">
              <img
                src={src}
                alt={alt}
                className="rounded-xl border-2 border-green-500/20 shadow-2xl max-w-full h-auto hover:shadow-green-500/20 transition-all duration-300"
                {...props}
              />
            </div>
          ),

          // Enhanced custom components for special blocks
          div: ({ children, className, ...props }) => {
            if (className?.includes('callout')) {
              const type = className.includes('warning') ? 'warning' : 
                          className.includes('info') ? 'info' : 
                          className.includes('success') ? 'success' : 'tip';
              
              const icons = {
                warning: AlertCircle,
                info: Info,
                success: CheckCircle,
                tip: Lightbulb
              };
              
              const colors = {
                warning: 'border-yellow-400/50 bg-gradient-to-r from-yellow-500/10 to-yellow-400/5 text-yellow-400',
                info: 'border-blue-400/50 bg-gradient-to-r from-blue-500/10 to-blue-400/5 text-blue-400',
                success: 'border-green-400/50 bg-gradient-to-r from-green-500/10 to-green-400/5 text-green-400',
                tip: 'border-purple-400/50 bg-gradient-to-r from-purple-500/10 to-purple-400/5 text-purple-400'
              };
              
              const Icon = icons[type];
              
              return (
                <div className={`border-l-4 ${colors[type]} pl-6 py-4 my-8 rounded-r-xl shadow-lg flex items-start gap-4`}>
                  <Icon className="h-6 w-6 flex-shrink-0 mt-1" />
                  <div className="text-foreground/90 text-base leading-relaxed">{children}</div>
                </div>
              );
            }
            
            return <div className={className} {...props}>{children}</div>;
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

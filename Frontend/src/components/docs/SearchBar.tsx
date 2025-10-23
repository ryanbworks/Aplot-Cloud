'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Clock, ArrowRight, BookOpen } from 'lucide-react';
import { SearchResult } from '@/types/docs';
import { searchArticles } from '@/lib/docs';

interface SearchBarProps {
  onResultClick?: () => void;
  placeholder?: string;
  className?: string;
}

export function SearchBar({ onResultClick, placeholder = "Buscar na base de conhecimento...", className = "" }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);

  // Debounced search
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const timeoutId = setTimeout(async () => {
      try {
        const searchResults = await searchArticles(query);
        setResults(searchResults.slice(0, 8)); // Limit to 8 results
        setIsOpen(searchResults.length > 0);
      } catch (error) {
        console.error('Erro na busca:', error);
        setResults([]);
        setIsOpen(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [query]);

  const handleResultClick = useCallback(() => {
    onResultClick?.();
    setIsOpen(false);
    setQuery('');
    setSelectedIndex(-1);
    // Navigation will be handled by the Link component
  }, [onResultClick]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex(prev => 
            prev < results.length - 1 ? prev + 1 : 0
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex(prev => 
            prev > 0 ? prev - 1 : results.length - 1
          );
          break;
        case 'Enter':
          e.preventDefault();
          if (selectedIndex >= 0 && results[selectedIndex]) {
            handleResultClick();
          }
          break;
        case 'Escape':
          setIsOpen(false);
          setSelectedIndex(-1);
          inputRef.current?.blur();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, results, handleResultClick]);

  // Global keyboard shortcut (Ctrl+K)
  useEffect(() => {
    const handleGlobalKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleGlobalKeyDown);
    return () => document.removeEventListener('keydown', handleGlobalKeyDown);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setSelectedIndex(-1);
  };

  const clearSearch = () => {
    setQuery('');
    setResults([]);
    setIsOpen(false);
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };

  return (
    <div className={`relative ${className}`}>
      {/* Search Input */}
      <div className="relative">
        <motion.div
          className="relative flex items-center"
          whileFocus={{ scale: 1.02 }}
        >
          <Search className="absolute left-4 h-4 w-4 text-muted-foreground" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            onFocus={() => query && setIsOpen(true)}
            placeholder={placeholder}
            className="w-full pl-12 pr-12 py-3 bg-card/50 border border-border/40 rounded-xl text-foreground placeholder:text-muted-foreground focus:border-green-500/50 focus:bg-card/80 focus:outline-none focus:ring-2 focus:ring-green-500/20 transition-all duration-200"
          />
          {query && (
            <motion.button
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              onClick={clearSearch}
              className="absolute right-4 p-1 text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              <X className="h-4 w-4" />
            </motion.button>
          )}
        </motion.div>

        {/* Keyboard shortcut hint */}
        <div className="absolute right-4 top-1/2 -translate-y-1/2 hidden sm:flex items-center gap-1 text-xs text-muted-foreground">
          <kbd className="px-1.5 py-0.5 bg-muted/50 rounded text-xs">⌘</kbd>
          <kbd className="px-1.5 py-0.5 bg-muted/50 rounded text-xs">K</kbd>
        </div>
      </div>

      {/* Search Results */}
      <AnimatePresence>
        {isOpen && results.length > 0 && (
          <motion.div
            ref={resultsRef}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-2 bg-card/95 backdrop-blur-xl border border-green-500/20 rounded-xl shadow-2xl shadow-green-500/10 overflow-hidden z-50"
          >
            <div className="p-2">
              {results.map((result, index) => (
                <motion.a
                  key={`${result.article.category}-${result.article.slug}`}
                  href={`/suporte/base-conhecimento/${result.article.category}/${result.article.slug}`}
                  onClick={() => handleResultClick()}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.02 }}
                  className={`flex items-start gap-3 p-3 rounded-lg transition-all duration-200 ${
                    selectedIndex === index
                      ? 'bg-green-500/10 border border-green-500/30'
                      : 'hover:bg-green-500/5 border border-transparent'
                  }`}
                >
                  <div className="flex-shrink-0 mt-1">
                    <BookOpen className="h-4 w-4 text-green-500" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-foreground truncate">
                        {result.article.title}
                      </h4>
                      <span className="text-xs text-green-500 bg-green-500/10 px-2 py-0.5 rounded-full">
                        {result.category.name}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {result.article.description}
                    </p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{result.article.readTime} min</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>Relevância: {Math.round(result.relevanceScore)}%</span>
                      </div>
                    </div>
                  </div>
                  
                  <ArrowRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                </motion.a>
              ))}
            </div>
            
            {/* Footer */}
            <div className="border-t border-border/40 bg-muted/20 px-4 py-2">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>
                  {results.length} resultado{results.length !== 1 ? 's' : ''} encontrado{results.length !== 1 ? 's' : ''}
                </span>
                <div className="flex items-center gap-2">
                  <span>↑↓ navegar</span>
                  <span>↵ selecionar</span>
                  <span>esc fechar</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* No results */}
      <AnimatePresence>
        {isOpen && query && results.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-card/95 backdrop-blur-xl border border-border/40 rounded-xl shadow-xl overflow-hidden z-50"
          >
            <div className="p-6 text-center">
              <Search className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
              <p className="text-foreground font-medium mb-1">Nenhum resultado encontrado</p>
              <p className="text-sm text-muted-foreground">
                Tente termos diferentes ou verifique a ortografia
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

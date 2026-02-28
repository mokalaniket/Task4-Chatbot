import React, { useState, useRef, useEffect } from 'react';
import ChatMessage from './ChatMessage';

export default function ChatSidebar({ isOpen, onClose, messages, isLoading, onSendMessage, onClearChat }) {
  const [input, setInput] = useState('');
  const endRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => { 
    endRef.current?.scrollIntoView({ behavior: 'smooth' }); 
  }, [messages, isLoading]);
  
  // Focus input when opened
  useEffect(() => { 
    if (isOpen) inputRef.current?.focus(); 
  }, [isOpen]);
  
  // Close on Escape
  useEffect(() => {
    const handleEsc = (e) => e.key === 'Escape' && isOpen && onClose();
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    onSendMessage(input);
    setInput('');
  };

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`} aria-hidden={!isOpen}>
      {/* Header */}
      <header>
        <div className="title">
          <i className="fas fa-robot" />
          <h2>Page Assistant</h2>
        </div>
        <div className="actions">
          <button onClick={onClearChat} title="Clear chat">
            <i className="fas fa-trash-alt" />
          </button>
          <button onClick={onClose} title="Close">
            <i className="fas fa-times" />
          </button>
        </div>
      </header>
      
      {/* Message Area - Scrollable */}
      <div className="messages">
        {messages.map(m => <ChatMessage key={m.id} message={m} />)}
        
        {/* Loading/Thinking Indicator */}
        {isLoading && (
          <div className="loading">
            <div className="loading-bubble">
              <div className="dots">
                <span /><span /><span />
              </div>
              <span className="thinking-text">Thinking...</span>
            </div>
          </div>
        )}
        
        <div ref={endRef} />
      </div>
      
      {/* Input Area - Fixed at Bottom */}
      <form className="input-area" onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about this page..."
          disabled={isLoading}
        />
        <button type="submit" disabled={!input.trim() || isLoading}>
          <i className={`fas fa-${isLoading ? 'spinner fa-spin' : 'paper-plane'}`} />
        </button>
      </form>
    </aside>
  );
}
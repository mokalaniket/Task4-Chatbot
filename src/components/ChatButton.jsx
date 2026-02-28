import React from 'react';

export default function ChatButton({ onClick, isOpen }) {
  return (
    <button 
      className={`chat-btn ${isOpen ? 'active' : ''}`} 
      onClick={onClick} 
      title="Chat with Page"
      aria-label={isOpen ? 'Close chat' : 'Open chat assistant'}
    >
      <i className={`fas fa-${isOpen ? 'times' : 'robot'}`} />
      {!isOpen && <span className="pulse" />}
    </button>
  );
}
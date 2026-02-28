import React from 'react';

export default function ChatMessage({ message }) {
  const { text, sender, time, isError } = message;
  const isUser = sender === 'user';
  
  // Format bold text (**text**)
  const formatText = (t) => t.split(/(\*\*[^*]+\*\*)/).map((p, i) => 
    p.startsWith('**') ? <strong key={i}>{p.slice(2, -2)}</strong> : p
  );

  const formatTime = (t) => t?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <div className={`message ${isUser ? 'user' : 'ai'} ${isError ? 'error' : ''}`}>
      {/* AI Avatar - Left */}
      {!isUser && (
        <div className="avatar">
          <i className="fas fa-robot" />
        </div>
      )}
      
      {/* Message Content */}
      <div className="content">
        <div className="bubble">
          <p>{formatText(text)}</p>
        </div>
        <span className="time">{formatTime(time)}</span>
      </div>
      
      {/* User Avatar - Right */}
      {isUser && (
        <div className="avatar user">
          <i className="fas fa-user" />
        </div>
      )}
    </div>
  );
}
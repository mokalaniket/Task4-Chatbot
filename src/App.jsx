import React, { useState } from 'react';
import ChatButton from './components/ChatButton';
import ChatSidebar from './components/ChatSidebar';
import useChat from './hooks/useChat';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, isLoading, sendMessage, clearChat } = useChat();

  return (
    <div className="app">
      <header className="app-header">
        <h1><i className="fas fa-heartbeat" /> Healthcare Innovation Report</h1>
        <nav><a href="#home">Home</a><a href="#research">Research</a></nav>
      </header>

      {/* Main Content - AI reads from this */}
      <main id="mainContent" className="main-content">
        <article className="document">
          <h1>Artificial Intelligence in Healthcare – Global Report 2025</h1>
          
          <section>
            <h2>Executive Summary</h2>
            <p>
              Artificial Intelligence (AI) is transforming global healthcare systems.
              AI-powered diagnostic tools have improved early disease detection accuracy
              by <strong>32%</strong> over the last five years.
            </p>
          </section>

          <section>
            <h2>Market Growth</h2>
            <p>
              The global AI healthcare market was valued at <strong>$20 billion in 2023</strong>
              and is projected to reach <strong>$148 billion by 2030</strong>,
              growing at a compound annual growth rate (CAGR) of 38%.
            </p>
            <p>
              North America currently holds 44% of the global market share due to
              high technology adoption and strong research funding.
            </p>
          </section>

          <section>
            <h2>Applications of AI</h2>
            <ul>
              <li>Medical Imaging: AI improves tumor detection accuracy by 25%</li>
              <li>Drug Discovery: Reduces development time by 40%</li>
              <li>Virtual Health Assistants: Used by over 60% of hospitals</li>
              <li>Predictive Analytics: Reduces hospital readmission rates by 18%</li>
            </ul>
          </section>

          <section>
            <h2>Challenges</h2>
            <p>
              Despite rapid growth, AI adoption faces challenges including data privacy
              concerns, regulatory approvals, and integration with legacy hospital systems.
            </p>
            <p>
              Around 35% of healthcare providers report difficulty integrating AI
              solutions into existing infrastructure.
            </p>
          </section>

          <section>
            <h2>Future Outlook</h2>
            <p>
              By 2035, AI is expected to automate nearly <strong>45% of administrative
              healthcare tasks</strong>, saving the global industry over $200 billion annually.
            </p>
            <p>
              Experts predict AI-assisted robotic surgeries will increase by 50% in the
              next decade.
            </p>
          </section>
        </article>
      </main>

      {/* Existing Annotation Toggle Button */}
      <button className="annotation-btn" title="Toggle Annotations">
        <i className="fas fa-highlighter"></i>
      </button>

      {/* Chat Bot Button - ABOVE annotation button */}
      <ChatButton onClick={() => setIsOpen(!isOpen)} isOpen={isOpen} />
      
      {/* Mobile Overlay */}
      {isOpen && <div className="overlay" onClick={() => setIsOpen(false)} />}
      
      {/* Chat Sidebar */}
      <ChatSidebar 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        messages={messages} 
        isLoading={isLoading} 
        onSendMessage={sendMessage} 
        onClearChat={clearChat} 
      />
    </div>
  );
}
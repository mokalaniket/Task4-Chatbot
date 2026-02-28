import { useState, useCallback, useEffect } from 'react';
import { sendMessageToAI, extractPageContent } from '../services/aiService';

const genId = () => `${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

export default function useChat() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // Welcome message
  useEffect(() => {
    setMessages([{ 
      id: genId(), 
      text: "Hello! I'm your Page Assistant. Ask me anything about the content on this page.", 
      sender: 'ai', 
      time: new Date() 
    }]);
  }, []);

  const sendMessage = useCallback(async (text) => {
    if (!text?.trim() || isLoading) return;
    
    // Add user message
    setMessages(m => [...m, { 
      id: genId(), 
      text: text.trim(), 
      sender: 'user', 
      time: new Date() 
    }]);
    
    setIsLoading(true);

    try {
      // Extract fresh content from page
      const pageContent = extractPageContent();
      
      if (!pageContent) {
        throw new Error('Could not read page content.');
      }
      
      // Send to AI
      const response = await sendMessageToAI(text, pageContent);
      
      // Add AI response
      setMessages(m => [...m, { 
        id: genId(), 
        text: response, 
        sender: 'ai', 
        time: new Date() 
      }]);
      
    } catch (error) {
      // Error handling - show user-friendly message
      setMessages(m => [...m, { 
        id: genId(), 
        text: "I'm having trouble connecting right now. Please try again.", 
        sender: 'ai', 
        time: new Date(), 
        isError: true 
      }]);
      console.error('Chat Error:', error);
    } finally {
      setIsLoading(false);
    }
  }, [isLoading]);

  const clearChat = useCallback(() => {
    setMessages([{ 
      id: genId(), 
      text: "Chat cleared. How can I help you?", 
      sender: 'ai', 
      time: new Date() 
    }]);
  }, []);

  return { messages, isLoading, sendMessage, clearChat };
}
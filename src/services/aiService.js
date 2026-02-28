
// Get FREE key: https://aistudio.google.com/app/apikey
const API_KEY = "INSERT_KEY_HERE";

const BASE_URL = "https://generativelanguage.googleapis.com";

// System instruction as per requirement
const SYSTEM_INSTRUCTION = `Answer the user's question using strictly the context provided below. 
If the answer is not found in the context, say "I couldn't find that information on this page."
Be concise and accurate.`;

// EXTRACT CONTENT FROM mainContent DIV

export const extractPageContent = () => {
  // Find the mainContent container
  const el = document.getElementById('mainContent');
  
  if (!el) {
    console.error(' Element #mainContent not found');
    return null;
  }
  
  // Clone to avoid modifying actual DOM
  const clone = el.cloneNode(true);
  
  // Remove script, style tags (clean HTML)
  clone.querySelectorAll('script, style, noscript').forEach(e => e.remove());
  
  // Get text and clean whitespace
  let text = (clone.textContent || clone.innerText || '')
    .replace(/\s+/g, ' ')  // Remove extra whitespace
    .trim();
  
  console.log(' Extracted content:', text.length, 'characters');
  
  // Limit length for API
  return text.slice(0, 6000);
};

// GET AVAILABLE MODELS DYNAMICALLY

let cachedModels = null;

const getAvailableModels = async () => {
  if (cachedModels) return cachedModels;

  try {
    console.log('🔍 Fetching available models...');
    
    // Try v1beta first
    let res = await fetch(`${BASE_URL}/v1beta/models?key=${API_KEY}`);
    let version = 'v1beta';
    
    // Fallback to v1
    if (!res.ok) {
      res = await fetch(`${BASE_URL}/v1/models?key=${API_KEY}`);
      version = 'v1';
    }
    
    if (!res.ok) throw new Error('Cannot fetch models');
    
    const data = await res.json();
    
    // Filter models that support generateContent
    cachedModels = (data.models || [])
      .filter(m => m.supportedGenerationMethods?.includes('generateContent'))
      .map(m => ({
        name: m.name.replace('models/', ''),
        version
      }));
    
    console.log(' Found models:', cachedModels.map(m => m.name));
    return cachedModels;
    
  } catch (e) {
    console.warn(' Using fallback models');
    return [
      { name: 'gemini-1.5-flash', version: 'v1beta' },
      { name: 'gemini-1.5-pro', version: 'v1beta' },
      { name: 'gemini-pro', version: 'v1beta' },
      { name: 'gemini-1.5-flash', version: 'v1' },
      { name: 'gemini-pro', version: 'v1' },
    ];
  }
};

// SEND MESSAGE TO AI

export const sendMessageToAI = async (question, pageContent) => {
  // Validation
  if (!question?.trim()) throw new Error('Please enter a question.');
  if (!pageContent) throw new Error('No page content found.');
  
  if (!API_KEY || API_KEY === "INSERT_KEY_HERE") {
    throw new Error('API key not configured.');
  }

  // Construct prompt: System Instruction + Page Content + Question
  const prompt = `${SYSTEM_INSTRUCTION}

---
PAGE CONTENT:
${pageContent}
---

USER QUESTION: ${question}

ANSWER:`;

  // Get available models
  const models = await getAvailableModels();
  let lastError = null;

  // Try each model until one works
  for (const model of models) {
    try {
      const url = `${BASE_URL}/${model.version}/models/${model.name}:generateContent?key=${API_KEY}`;
      
      console.log(` Trying: ${model.name}`);

      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 1024
          }
        })
      });

      // Skip if model not found
      if (res.status === 404) {
        console.log(` ${model.name} not available`);
        continue;
      }

      // Handle errors
      if (!res.ok) {
        const err = await res.json().catch(() => ({}));
        const msg = err.error?.message || `HTTP ${res.status}`;
        
        if (res.status === 401 || res.status === 403) {
          throw new Error('Invalid API key');
        }
        if (res.status === 429) {
          throw new Error('Rate limit exceeded. Please wait and try again.');
        }
        
        lastError = new Error(msg);
        continue;
      }

      // Parse response
      const data = await res.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (text) {
        console.log(` Success with: ${model.name}`);
        return text.trim();
      }
      
    } catch (e) {
      if (e.message.includes('Invalid API key') || e.message.includes('Rate limit')) {
        throw e;
      }
      lastError = e;
    }
  }

  throw lastError || new Error('Unable to get response. Please try again.');
};
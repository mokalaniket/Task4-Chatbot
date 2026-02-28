# 🤖 Chat with Page

An interactive feature that allows users to ask questions about page content and receive AI-generated answers based on that page's text.

## 📋 Table of Contents

- AI API Selection
- How to Get API Key
- Quick Start
- Troubleshooting
- Security Note
- Acceptance Criteria

---

## ✅ AI API Selection

### Chosen: Google Gemini API (gemini-1.5-flash)

### Why Gemini?

| Reason | Details |
|--------|---------|
| Free Tier | ~60 requests/minute, no credit card required |
| Easy Setup | Single API key, simple REST integration |
| Fast | 1–2 second response time |
| Strong Context Understanding | Excellent for document-based Q&A |
| Reliable | Google infrastructure |

---
### Alternatives

| API         | Why Not Chosen                        |
| ----------- | ------------------------------------- |
| OpenAI      | Requires payment/credit card          |
| HuggingFace | Slower inference for free tier        |
| Cohere      | Smaller context window                |
| Sarvam.AI   | Limited documentation for integration |


## 🔑 How to Get API Key

### Step 1: Open Google AI Studio

Visit:
https://aistudio.google.com/app/apikey

### Step 2: Sign In
- Use any Google/Gmail account
- No billing required

### Step 3: Create API Key
1. Click **Create API Key**
2. Select **Create API key in new project**
3. Wait a few seconds

### Step 4: Copy the Key

Example format:
AIzaSyB_xxxxxxxxxxxxxxxxxxxxxxxxxxxx

### Step 5: Enable API (If You Get 403 Error)

Visit:
https://console.cloud.google.com/apis/library/generativelanguage.googleapis.com

Click **Enable** and wait 1–2 minutes.

### Step 6: Add Key to Code

Open:
src/services/aiService.js

Replace:

```javascript
const API_KEY = "INSERT_KEY_HERE";
```

With:

```javascript
const API_KEY = "YOUR_REAL_API_KEY";
```

---

# 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Add API Key
Follow the instructions above.

### 3. Start Application

```bash
npm start
```

### 4. Open Browser

Go to:
http://localhost:3000

### 5. Test the Chat

- Click the 🤖 robot icon (bottom-right corner)
- Ask a question related to the page content
- Press Enter or click Send
- AI responds based only on page text

---

# 🛠 Troubleshooting

### 1. 403 Error (Forbidden)
Cause:
- API not enabled
- Incorrect API key

Fix:
- Enable Generative Language API
- Check API key
- Wait 2–3 minutes after key generation

---

### 2. 400 Error (Bad Request)
Cause:
- Wrong model name
- Incorrect request body

Fix:
- Ensure model name is: gemini-1.5-flash
- Verify request JSON structure

---


### 3. "Cannot find answer in context"
Cause:
- Question unrelated to page content

Fix:
- Ask questions based only on text inside:
  <div id="mainContent">

---

### 4. Sidebar Not Opening
Cause:
- State or CSS issue

Fix:
- Check isOpen state logic
- Verify .chat-sidebar.open CSS rule
- Inspect browser console

---

### 5. Rate Limit Exceeded
Cause:
- Too many rapid requests

Fix:
- Wait 1 minute
- Avoid spamming Send button

---

# 🔐 Security Note

⚠️ Never push your real API key to GitHub.

Before submitting, ensure:

```javascript
const API_KEY = "INSERT_KEY_HERE";
```
### License
This is an evaluation task for Vikaspedia.

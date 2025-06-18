// Handle messages from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'summarize') {
      fetch('http://localhost:8000/api/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email_content: request.content })
      })
      .then(response => response.json())
      .then(data => sendResponse({ summary: data.summary }))
      .catch(error => sendResponse({ error: error.message }));
      return true;
    }
    
    if (request.action === 'generate-reply') {
      fetch('http://localhost:8000/api/generate-reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email_content: request.emailContent,
          user_context: request.userContext,
          tone: request.tone
        })
      })
      .then(response => response.json())
      .then(data => sendResponse({ reply: data.reply }))
      .catch(error => sendResponse({ error: error.message }));
      return true;
    }
  });
// Initialize when Gmail loads
function initializeExtension() {
  console.log('Gmail AI Assistant initializing...');
  observeComposeWindows();
}

// Watch for compose windows
function observeComposeWindows() {
  const observer = new MutationObserver(() => {
    const composeAreas = document.querySelectorAll('.M9:not(.ai-enhanced)');
    composeAreas.forEach(area => {
      area.classList.add('ai-enhanced');
      addAIAssistantButton(area);
    });
  });
  
  observer.observe(document.body, { childList: true, subtree: true });
}

// Add floating AI button to compose area
function addAIAssistantButton(composeArea) {
  const editable = composeArea.querySelector('.Am.Al.editable');
  if (!editable) return;
  
  const aiButton = document.createElement('button');
  aiButton.className = 'ai-assistant-trigger';
  aiButton.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <path d="M12 2L2 7v10c0 5.5 3.8 10.7 8 12 4.2-1.3 8-6.5 8-12V7l-8-5z"/>
      <path d="M12 8v4m0 4h.01"/>
    </svg>
    <span>AI Assistant</span>
  `;
  
  aiButton.onclick = () => openAIPanel(composeArea);
  editable.parentElement.appendChild(aiButton);
}

// Create and open AI panel
function openAIPanel(composeArea) {
  // Remove existing panel if any
  const existingPanel = document.querySelector('.ai-panel-container');
  if (existingPanel) {
    existingPanel.remove();
    return;
  }
  
  const panel = document.createElement('div');
  panel.className = 'ai-panel-container';
  panel.innerHTML = `
    <div class="ai-panel">
      <div class="ai-panel-header">
        <div class="ai-panel-title">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M12 2L2 7v10c0 5.5 3.8 10.7 8 12 4.2-1.3 8-6.5 8-12V7l-8-5z"/>
          </svg>
          <span>AI Email Assistant</span>
        </div>
        <button class="ai-close-btn">&times;</button>
      </div>
      
      <div class="ai-panel-content">
        <div class="ai-input-section">
          <label>What would you like to say?</label>
          <textarea 
            class="ai-context-input" 
            placeholder="E.g., Thank them for the meeting and confirm next Tuesday at 2pm..."
            rows="4"
          ></textarea>
        </div>
        
        <div class="ai-tone-section">
          <label>Select tone</label>
          <div class="ai-tone-options">
            <button class="ai-tone-btn active" data-tone="professional">
              <span class="tone-icon">💼</span>
              <span class="tone-label">Professional</span>
            </button>
            <button class="ai-tone-btn" data-tone="friendly">
              <span class="tone-icon">😊</span>
              <span class="tone-label">Friendly</span>
            </button>
            <button class="ai-tone-btn" data-tone="brief">
              <span class="tone-icon">⚡</span>
              <span class="tone-label">Brief</span>
            </button>
          </div>
        </div>
        
        <button class="ai-generate-btn">
          <span class="btn-text">Generate Reply</span>
          <div class="loading-spinner" style="display: none;">
            <div class="spinner"></div>
          </div>
        </button>
        
        <div class="ai-result-section" style="display: none;">
          <div class="result-header">
            <span>Generated Reply</span>
            <button class="copy-btn" title="Copy to clipboard">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
              </svg>
            </button>
          </div>
          <div class="ai-result-content"></div>
          <div class="result-actions">
            <button class="use-reply-btn">Use This Reply</button>
            <button class="regenerate-btn">Regenerate</button>
          </div>
        </div>
      </div>
    </div>
  `;
  
  document.body.appendChild(panel);
  setupPanelEvents(panel, composeArea);
  
  // Focus on input
  setTimeout(() => {
    panel.querySelector('.ai-context-input').focus();
  }, 100);
}

// Setup all panel interactions
function setupPanelEvents(panel, composeArea) {
  // Close button
  panel.querySelector('.ai-close-btn').onclick = () => panel.remove();
  
  // Click outside to close
  panel.onclick = (e) => {
    if (e.target === panel) panel.remove();
  };
  
  // Tone selection
  panel.querySelectorAll('.ai-tone-btn').forEach(btn => {
    btn.onclick = () => {
      panel.querySelectorAll('.ai-tone-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    };
  });
  
  // Generate button
  const generateBtn = panel.querySelector('.ai-generate-btn');
  generateBtn.onclick = async () => {
    const context = panel.querySelector('.ai-context-input').value.trim();
    if (!context) {
      panel.querySelector('.ai-context-input').classList.add('error');
      return;
    }
    
    panel.querySelector('.ai-context-input').classList.remove('error');
    const tone = panel.querySelector('.ai-tone-btn.active').dataset.tone;
    
    // Get email context
    const subjectInput = document.querySelector('input[name="subjectbox"]');
    const emailSubject = subjectInput ? subjectInput.value : '';
    const emailBody = composeArea.querySelector('.Am.Al.editable').innerText;
    
    // Show loading state
    generateBtn.disabled = true;
    generateBtn.querySelector('.btn-text').style.display = 'none';
    generateBtn.querySelector('.loading-spinner').style.display = 'block';
    
    try {
      // Call backend through background script
      const response = await chrome.runtime.sendMessage({
        action: 'generate-reply',
        emailContent: `Subject: ${emailSubject}\n\n${emailBody}`,
        userContext: context,
        tone: tone
      });
      
      if (response.reply) {
        // Show result
        panel.querySelector('.ai-result-content').innerText = response.reply;
        panel.querySelector('.ai-result-section').style.display = 'block';
        
        // Scroll to result
        panel.querySelector('.ai-result-section').scrollIntoView({ behavior: 'smooth' });
      } else {
        throw new Error(response.error || 'Failed to generate reply');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to generate reply. Please check your connection and try again.');
    } finally {
      // Reset button state
      generateBtn.disabled = false;
      generateBtn.querySelector('.btn-text').style.display = 'inline';
      generateBtn.querySelector('.loading-spinner').style.display = 'none';
    }
  };
  
  // Use reply button
  panel.querySelector('.use-reply-btn').onclick = () => {
    const replyText = panel.querySelector('.ai-result-content').innerText;
    const composeBody = composeArea.querySelector('.Am.Al.editable');
    if (composeBody) {
      composeBody.innerText = replyText;
      // Trigger input event to update Gmail's internal state
      composeBody.dispatchEvent(new Event('input', { bubbles: true }));
    }
    panel.remove();
  };
  
  // Copy button
  panel.querySelector('.copy-btn').onclick = () => {
    const text = panel.querySelector('.ai-result-content').innerText;
    navigator.clipboard.writeText(text);
    // Visual feedback
    const copyBtn = panel.querySelector('.copy-btn');
    copyBtn.style.color = '#10b981';
    setTimeout(() => { copyBtn.style.color = ''; }, 1000);
  };
  
  // Regenerate button
  panel.querySelector('.regenerate-btn').onclick = () => {
    panel.querySelector('.ai-generate-btn').click();
  };
  
  // Auto-resize textarea
  const textarea = panel.querySelector('.ai-context-input');
  textarea.addEventListener('input', () => {
    textarea.style.height = 'auto';
    textarea.style.height = textarea.scrollHeight + 'px';
  });
}

// Start extension
if (window.location.hostname === 'mail.google.com') {
  setTimeout(initializeExtension, 2000);
}
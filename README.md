# 🚀 Gmail AI Assistant

> **Transform your Gmail experience with AI-powered email composition**

A Chrome extension that integrates seamlessly with Gmail to provide intelligent email reply suggestions using OpenAI's GPT models. Write professional, friendly, or concise emails with just a few clicks!

![Gmail AI Assistant Demo](https://img.shields.io/badge/Status-Beta-orange)
![Python](https://img.shields.io/badge/Python-3.8+-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-0.115+-green)
![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-yellow)

## ✨ Features

- 🤖 **AI-Powered Email Generation** - Generate contextual email replies using OpenAI GPT
- 🎯 **Multiple Tone Options** - Professional, Friendly, or Brief email styles
- 🔄 **Smart Context Understanding** - Analyzes original email content for relevant responses
- 🎨 **Seamless Gmail Integration** - Works directly within Gmail's compose interface
- ⚡ **Real-time Generation** - Get instant email suggestions as you type
- 📋 **One-Click Copy & Use** - Copy generated replies or insert directly into compose

## 🛠️ Tech Stack

### Frontend (Chrome Extension)
- **JavaScript** - Vanilla JS for extension functionality
- **Chrome Extension API** - Native browser integration
- **CSS3** - Modern, responsive UI design

### Backend (API Server)
- **Python 3.8+** - Core backend language
- **FastAPI** - High-performance web framework
- **OpenAI API** - GPT model integration
- **Uvicorn** - ASGI server
- **Pydantic** - Data validation

## 🚀 Quick Start

### Prerequisites
- Python 3.8 or higher
- Chrome browser
- OpenAI API key

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/gmail-ai-assistant.git
   cd gmail-ai-assistant
   ```

2. **Set up the backend**
   ```bash
   cd backend
   pip install -r requirements.txt
   
   # Create .env file with your OpenAI API key
   echo "OPENAI_API_KEY=your_openai_api_key_here" > .env
   
   # Start the backend server
   python main.py
   ```

3. **Install the Chrome extension**
   - Open Chrome and go to `chrome://extensions/`
   - Enable "Developer mode" (toggle in top right)
   - Click "Load unpacked"
   - Select the `extension/` folder from this project

4. **Start using Gmail AI Assistant**
   - Go to Gmail
   - Compose a new email or reply to an existing one
   - Click the "AI Assistant" button that appears
   - Enter your context and select tone
   - Generate your AI-powered reply!

## 📁 Project Structure

```
GMAIL-AI-ASSISTANT/
├── backend/
│   ├── main.py              # FastAPI server with OpenAI integration
│   └── requirements.txt     # Python dependencies
├── extension/
│   ├── manifest.json        # Chrome extension configuration
│   ├── background.js        # Extension background script
│   ├── content.js          # Gmail integration script
│   └── styles.css          # Extension UI styles
├── venv/                   # Python virtual environment
└── README.md              # This file
```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the `backend/` directory:

```env
OPENAI_API_KEY=your_openai_api_key_here
```

### API Endpoints

- `GET /` - Health check
- `POST /api/generate-reply` - Generate email reply
  ```json
  {
    "email_content": "Original email content",
    "user_context": "What you want to say",
    "tone": "professional|friendly|brief"
  }
  ```

## 🎯 Usage Examples

### Professional Tone
**Input:** "Thank them for the meeting and confirm next Tuesday at 2pm"
**Output:** A formal, business-appropriate email confirming the meeting

### Friendly Tone
**Input:** "Ask how their vacation was and share a funny story"
**Output:** A warm, conversational email with personal touch

### Brief Tone
**Input:** "Confirm receipt of the documents"
**Output:** A concise, direct confirmation email

## 🔒 Security & Privacy

- **Local Processing** - All API calls go through your local backend
- **No Data Storage** - Email content is not stored or logged
- **Secure API Keys** - OpenAI API key stored in environment variables
- **CORS Protection** - Configured for Chrome extension security

## 🤝 Contributing

We welcome contributions! Please feel free to submit a Pull Request.

### Development Setup
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Troubleshooting

### Common Issues

**Extension not appearing in Gmail:**
- Ensure the backend server is running on port 8001
- Check that the extension is loaded in Chrome
- Refresh the Gmail page

**"Failed to generate reply" error:**
- Verify your OpenAI API key is correct
- Check that the backend server is running
- Ensure you have sufficient OpenAI API credits

**Backend connection issues:**
- Confirm the server is running: `curl http://localhost:8001/`
- Check firewall settings
- Verify port 8001 is not in use by another application

## 🚀 Roadmap

- [ ] Email summarization feature
- [ ] Multiple language support
- [ ] Custom tone training
- [ ] Email scheduling suggestions
- [ ] Integration with other email providers
- [ ] Mobile app version

## 📞 Support

- **Issues:** [GitHub Issues](https://github.com/yourusername/gmail-ai-assistant/issues)
- **Discussions:** [GitHub Discussions](https://github.com/yourusername/gmail-ai-assistant/discussions)
- **Email:** your-email@example.com

---

<div align="center">
  <p>Made with ❤️ for better email productivity</p>
  <p>
    <a href="https://github.com/yourusername/gmail-ai-assistant/stargazers">
      <img src="https://img.shields.io/github/stars/yourusername/gmail-ai-assistant" alt="Stars">
    </a>
    <a href="https://github.com/yourusername/gmail-ai-assistant/network">
      <img src="https://img.shields.io/github/forks/yourusername/gmail-ai-assistant" alt="Forks">
    </a>
    <a href="https://github.com/yourusername/gmail-ai-assistant/issues">
      <img src="https://img.shields.io/github/issues/yourusername/gmail-ai-assistant" alt="Issues">
    </a>
  </p>
</div> 
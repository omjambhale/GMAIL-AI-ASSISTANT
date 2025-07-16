# Contributing to Gmail AI Assistant

Thank you for your interest in contributing to Gmail AI Assistant! This document provides guidelines and information for contributors.

## 🤝 How to Contribute

### Reporting Bugs
- Use the [GitHub Issues](https://github.com/yourusername/gmail-ai-assistant/issues) page
- Include detailed steps to reproduce the bug
- Provide your browser version and OS information
- Include any error messages or console logs

### Suggesting Features
- Use the [GitHub Discussions](https://github.com/yourusername/gmail-ai-assistant/discussions) page
- Describe the feature and its benefits
- Consider implementation complexity

### Code Contributions
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes
4. Test thoroughly
5. Commit with clear messages: `git commit -m "Add feature: description"`
6. Push to your fork: `git push origin feature/your-feature-name`
7. Create a Pull Request

## 🛠️ Development Setup

### Prerequisites
- Python 3.8+
- Chrome browser
- OpenAI API key

### Local Development
1. Clone your fork
2. Set up the backend:
   ```bash
   cd backend
   pip install -r requirements.txt
   echo "OPENAI_API_KEY=your_key" > .env
   python main.py
   ```
3. Load the extension in Chrome
4. Test in Gmail

### Code Style
- **Python**: Follow PEP 8 guidelines
- **JavaScript**: Use consistent indentation (2 spaces)
- **CSS**: Use consistent naming conventions
- **Comments**: Write clear, descriptive comments

## 📋 Pull Request Guidelines

### Before Submitting
- [ ] Code follows style guidelines
- [ ] All tests pass (if applicable)
- [ ] Documentation is updated
- [ ] No sensitive data is included

### PR Description
- Describe the changes clearly
- Include screenshots for UI changes
- Reference related issues
- Mention any breaking changes

## 🧪 Testing

### Manual Testing
- Test in different Gmail layouts
- Verify all tone options work
- Check error handling
- Test with various email content

### Automated Testing (Future)
- Unit tests for backend API
- Integration tests for extension
- E2E tests for complete workflow

## 📝 Documentation

### Code Documentation
- Document complex functions
- Add inline comments for tricky logic
- Update README for new features

### User Documentation
- Update installation instructions
- Add usage examples
- Document new features

## 🚀 Release Process

### Versioning
We use [Semantic Versioning](https://semver.org/):
- **Major**: Breaking changes
- **Minor**: New features
- **Patch**: Bug fixes

### Release Checklist
- [ ] All tests pass
- [ ] Documentation updated
- [ ] Version bumped
- [ ] Changelog updated
- [ ] Release notes written

## 🆘 Getting Help

- **Issues**: [GitHub Issues](https://github.com/yourusername/gmail-ai-assistant/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/gmail-ai-assistant/discussions)
- **Email**: your-email@example.com

## 📄 Code of Conduct

We are committed to providing a welcoming and inclusive environment for all contributors. Please be respectful and constructive in all interactions.

## 🙏 Recognition

Contributors will be recognized in:
- README contributors section
- Release notes
- Project documentation

Thank you for contributing to Gmail AI Assistant! 🚀 
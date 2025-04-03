# Internship Application Assistant
<div align="center">
  <img src="https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png" alt="JavaScript Logo" height="60"/>
  <img src="https://upload.wikimedia.org/wikipedia/commons/7/7e/Gmail_icon_%282020%29.svg" alt="Gmail Logo" height="60"/>
</div>
> Automate your internship application process with personalized emails

## 📋 Overview

This tool streamlines the internship application process by automating email communications. It allows you to send personalized or bulk application emails with your CV attached, saving time while maintaining a professional approach.

## ⚙️ Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/search-internship-js.git
   cd search-internship-js
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your information
   ```

## 🛠️ Configuration

### Required Files
- `CV.pdf` - Your resume/CV file
- `entreprises.json` - Company contact details for personalized emails
- `emails.txt` - List of email addresses for bulk sending
- `.env` - Your personal information and email credentials

### Templates
The application uses two HTML templates:
- `message.html` - Template for personalized company emails
- `message-bulk.html` - Template for bulk emails

## 🚀 Usage

### Test Before Sending
```bash
# Test company-specific email
npm run test

# Test bulk emails
npm run test:bulk
```

### Send Applications
```bash
# Send to companies in entreprises.json
npm run start

# Send to email list in emails.txt
npm run start:bulk
```

## 📝 Email Security

For Gmail users:
- Enable 2-Step Verification
- Generate an App Password
- Use the App Password in your `.env` file

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!
Feel free to check the issues page.

## 📄 License

GPL Licensed

---

Created by EL GORRIM MOHAMED

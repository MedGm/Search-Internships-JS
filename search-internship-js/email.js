// Author: EL GORRIM MOHAMED
// Based on Search-Internship by LAAMIRI Ouail

const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

/**
 * Generate an HTML message from a template file with company-specific data
 * 
 * @param {Object} data - The data to interpolate into the template
 * @param {string} filePath - Path to the HTML template file
 * @returns {string} - The generated HTML message
 */
function messageFromFile(data, filePath) {
  try {
    const htmlTemplate = fs.readFileSync(filePath, 'utf8');
    
    // Replace all placeholders in the template with actual values
    return htmlTemplate.replace(/\{(\w+)\}/g, (match, key) => {
      if (key === 'EntrepriseSecteurActivite' && !data[key]) {
        return 'DEVELOPMENT INFORMATIQUE';
      }
      return data[key] || match;
    });
  } catch (error) {
    console.error(`Error generating message from file: ${error.message}`);
    return '';
  }
}

/**
 * Generate an HTML message from a template file with basic data (for bulk emails)
 * 
 * @param {Object} data - The data to interpolate into the template
 * @param {string} filePath - Path to the HTML template file
 * @returns {string} - The generated HTML message
 */
function messageFromHtml(data, filePath) {
  try {
    const htmlTemplate = fs.readFileSync(filePath, 'utf8');
    
    // Replace placeholders in the template with actual values
    return htmlTemplate.replace(/\{(\w+)\}/g, (match, key) => {
      return data[key] || match;
    });
  } catch (error) {
    console.error(`Error generating message from HTML: ${error.message}`);
    return '';
  }
}

/**
 * Send an email using SMTP
 * 
 * @param {string} senderEmail - Sender email address
 * @param {string} senderPassword - Sender email password
 * @param {string} to - Recipient email address
 * @param {string} emailSubject - Email subject
 * @param {string} emailBody - Email body (HTML)
 * @param {string} attachmentPath - Path to attachment file (optional)
 * @returns {Promise<boolean>} - Promise resolving to true if email sent successfully
 */
async function sendEmailSmtp(senderEmail, senderPassword, to, emailSubject, emailBody, attachmentPath = null) {
  try {
    // Set up the SMTP transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: senderEmail,
        pass: senderPassword
      }
    });

    // Prepare email options
    const mailOptions = {
      from: senderEmail,
      to: to,
      subject: emailSubject,
      html: emailBody
    };

    // Add attachment if provided
    if (attachmentPath) {
      mailOptions.attachments = [
        {
          filename: path.basename(attachmentPath),
          path: attachmentPath
        }
      ];
    }

    // Send the email
    await transporter.sendMail(mailOptions);
    return true;
  } catch (error) {
    console.error(`Error sending email: ${error.message}`);
    return false;
  }
}

module.exports = {
  messageFromFile,
  messageFromHtml,
  sendEmailSmtp
};

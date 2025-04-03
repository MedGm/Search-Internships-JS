// Author: EL GORRIM MOHAMED
// Based on Search-Internship by LAAMIRI Ouail

const fs = require('fs');
const path = require('path');
const { messageFromHtml, sendEmailSmtp } = require('./email');
require('dotenv').config();

/**
 * Parse email addresses from a text file
 * 
 * @param {string} filePath - Path to the text file
 * @returns {Array} - Array of email addresses
 */
function parseTextFile(filePath) {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    // Split by newlines and filter out empty lines
    const emails = fileContent.split('\n')
      .map(line => line.trim())
      .filter(line => line && line.includes('@'));
    
    return emails;
  } catch (error) {
    console.error(`Error parsing text file: ${error.message}`);
    return [];
  }
}

/**
 * Main function to execute the application
 */
async function main() {
  try {
    // Load environment variables
    const {
      MY_EMAIL,
      PASSWORD_EMAIL,
      MY_PHONE,
      MY_NAME,
      MY_LINKEDIN,
      SUBJECT
    } = process.env;
    
    // Validate required environment variables
    if (!MY_EMAIL || !PASSWORD_EMAIL || !SUBJECT) {
      throw new Error('Missing required environment variables');
    }
    
    // Define file paths
    const emailsFilePath = path.join(__dirname, 'emails.txt');
    const messageTemplatePath = path.join(__dirname, 'message-bulk.html');
    const cvPath = path.join(__dirname, 'CV.pdf');
    
    // Check if files exist
    if (!fs.existsSync(emailsFilePath)) {
      throw new Error(`File not found: ${emailsFilePath}`);
    }
    if (!fs.existsSync(messageTemplatePath)) {
      throw new Error(`File not found: ${messageTemplatePath}`);
    }
    if (!fs.existsSync(cvPath)) {
      throw new Error(`File not found: ${cvPath}`);
    }
    
    // Parse email addresses
    const emails = parseTextFile(emailsFilePath);
    if (emails.length === 0) {
      throw new Error('No email addresses found in the text file');
    }
    
    console.log(`Found ${emails.length} email addresses to send emails to`);
    
    // Prepare data for email template
    const templateData = {
      MyEmail: MY_EMAIL,
      MyPhone: MY_PHONE,
      MyName: MY_NAME,
      MyLinkedIn: MY_LINKEDIN
    };
    
    // Generate email body from template
    const emailBody = messageFromHtml(templateData, messageTemplatePath);
    
    // Send emails to each address
    let successCount = 0;
    for (const email of emails) {
      // Send email
      const isSuccess = await sendEmailSmtp(
        MY_EMAIL,
        PASSWORD_EMAIL,
        email,
        SUBJECT,
        emailBody,
        cvPath
      );
      
      if (isSuccess) {
        successCount++;
        console.log(`✅ Email sent successfully to ${email}`);
      } else {
        console.log(`❌ Failed to send email to ${email}`);
      }
      
      // Add a delay between emails to avoid being flagged as spam
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
    
    console.log(`\n📊 Summary: ${successCount} out of ${emails.length} emails sent successfully`);
  } catch (error) {
    console.error(`Error in main function: ${error.message}`);
    process.exit(1);
  }
}

// Execute the main function
main();

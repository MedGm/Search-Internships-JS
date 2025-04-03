// Author: EL GORRIM MOHAMED
// Test script for the bulk email functionality

const path = require('path');
const { messageFromHtml, sendEmailSmtp } = require('./email');
require('dotenv').config();

/**
 * Function to test email sending with bulk email template
 */
async function testBulkEmail() {
  try {
    // Load environment variables
    const {
      MY_EMAIL,
      PASSWORD_EMAIL,
      MY_PHONE,
      MY_NAME,
      MY_LINKEDIN,
      SUBJECT,
      TEST_EMAIL
    } = process.env;
    
    // Validate required environment variables
    if (!MY_EMAIL || !PASSWORD_EMAIL || !SUBJECT || !TEST_EMAIL) {
      throw new Error('Missing required environment variables. Please make sure TEST_EMAIL is set in your .env file.');
    }
    
    // Define file paths
    const messageTemplatePath = path.join(__dirname, 'message-bulk.html');
    const cvPath = path.join(__dirname, 'CV.pdf');
    
    console.log('📧 Testing email functionality with bulk email template...');
    
    // Prepare data for email template
    const templateData = {
      MyEmail: MY_EMAIL,
      MyPhone: MY_PHONE,
      MyName: MY_NAME,
      MyLinkedIn: MY_LINKEDIN
    };
    
    // Generate email body from template
    const emailBody = messageFromHtml(templateData, messageTemplatePath);
    
    // Send test email
    const isSuccess = await sendEmailSmtp(
      MY_EMAIL,
      PASSWORD_EMAIL,
      TEST_EMAIL,
      `[TEST] ${SUBJECT}`,
      emailBody,
      cvPath
    );
    
    if (isSuccess) {
      console.log(`✅ Test email sent successfully to ${TEST_EMAIL}`);
    } else {
      console.log(`❌ Failed to send test email to ${TEST_EMAIL}`);
    }
  } catch (error) {
    console.error(`Error in test function: ${error.message}`);
    process.exit(1);
  }
}

// Execute the test function
testBulkEmail();

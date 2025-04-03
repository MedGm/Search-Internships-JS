// Author: EL GORRIM MOHAMED
// Based on Search-Internship by LAAMIRI Ouail

const fs = require('fs');
const path = require('path');
const { messageFromFile, sendEmailSmtp } = require('./email');
require('dotenv').config();

/**
 * Parse company data from a JSON file
 * 
 * @param {string} filePath - Path to the JSON file
 * @returns {Array} - Array of parsed company entries
 */
function parseJsonFile(filePath) {
  try {
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const data = JSON.parse(fileContent);
    
    const parsedData = [];
    
    for (const entry of data.data) {
      const parsedEntry = {
        Id: entry.Id,
        EntrepriseVille: entry.EntrepriseVille,
        EntrepriseTechnologie: entry.EntrepriseTechnologie,
        EntrepriseSecteurActivite: entry.EntrepriseSecteurActivite,
        EntrepriseName: entry.EntrepriseName,
        EntrepriseLogo: entry.EntrepriseLogo,
        EntrepriseContactSiteWeb: entry.EntrepriseContactSiteWeb,
        EntrepriseContactPhone: entry.EntrepriseContactPhone,
        EntrepriseContactName: entry.EntrepriseContactName,
        EntrepriseContactEmail: entry.EntrepriseContactEmail,
        Activite: entry.Activite
      };
      
      parsedData.push(parsedEntry);
    }
    
    return parsedData;
  } catch (error) {
    console.error(`Error parsing JSON file: ${error.message}`);
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
    const jsonFilePath = path.join(__dirname, 'entreprises.json');
    const messageTemplatePath = path.join(__dirname, 'message.html');
    const cvPath = path.join(__dirname, 'CV.pdf');
    
    // Check if files exist
    if (!fs.existsSync(jsonFilePath)) {
      throw new Error(`File not found: ${jsonFilePath}`);
    }
    if (!fs.existsSync(messageTemplatePath)) {
      throw new Error(`File not found: ${messageTemplatePath}`);
    }
    if (!fs.existsSync(cvPath)) {
      throw new Error(`File not found: ${cvPath}`);
    }
    
    // Parse company data
    const companies = parseJsonFile(jsonFilePath);
    if (companies.length === 0) {
      throw new Error('No companies found in the JSON file');
    }
    
    console.log(`Found ${companies.length} companies to send emails to`);
    
    // Send emails to each company
    let successCount = 0;
    for (const company of companies) {
      // Skip if no contact email is provided
      if (!company.EntrepriseContactEmail) {
        console.log(`Skipping ${company.EntrepriseName} - No contact email provided`);
        continue;
      }
      
      // Prepare data for email template
      const templateData = {
        EntrepriseContactName: company.EntrepriseContactName || 'Hiring Manager',
        EntrepriseName: company.EntrepriseName,
        EntrepriseSecteurActivite: company.EntrepriseSecteurActivite,
        MyEmail: MY_EMAIL,
        MyPhone: MY_PHONE,
        MyName: MY_NAME,
        MyLinkedIn: MY_LINKEDIN
      };
      
      // Generate email body from template
      const emailBody = messageFromFile(templateData, messageTemplatePath);
      
      // Send email
      const isSuccess = await sendEmailSmtp(
        MY_EMAIL,
        PASSWORD_EMAIL,
        company.EntrepriseContactEmail,
        SUBJECT,
        emailBody,
        cvPath
      );
      
      if (isSuccess) {
        successCount++;
        console.log(`✅ Email sent successfully to ${company.EntrepriseContactName} at ${company.EntrepriseName}`);
      } else {
        console.log(`❌ Failed to send email to ${company.EntrepriseContactName} at ${company.EntrepriseName}`);
      }
      
      // Add a delay between emails to avoid being flagged as spam
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
    
    console.log(`\n📊 Summary: ${successCount} out of ${companies.length} emails sent successfully`);
  } catch (error) {
    console.error(`Error in main function: ${error.message}`);
    process.exit(1);
  }
}

// Execute the main function
main();

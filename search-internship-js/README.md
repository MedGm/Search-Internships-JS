# Search-Internship-JS

A JavaScript tool for automating internship application emails. This tool helps you send personalized internship applications to multiple companies or contacts with ease.

## Features

- Send personalized emails to companies with company-specific details
- Send bulk emails to a list of contacts
- Attach your CV automatically
- Easy configuration with environment variables
- Test functionality before sending mass emails

## Setup

### 1. Clone or Download the Repository

Clone this repository or download it to your local machine.

### 2. Install Dependencies

Navigate to the project directory and install the required dependencies:

```bash
$ cd search-internship-js
$ npm install
```

### 3. Configuration

#### Environment Variables

Create a `.env` file in the project root by copying the provided `.env.example`:

```bash
$ cp .env.example .env
```

Edit the `.env` file and set the following variables:

- **MY_EMAIL**: Your email address
- **MY_PHONE**: Your phone number
- **MY_NAME**: Your full name
- **MY_LINKEDIN**: Your LinkedIn profile URL
- **PASSWORD_EMAIL**: Your email password (for Gmail, use an app-specific password)
- **SUBJECT**: The subject line for your application emails
- **TEST_EMAIL**: Email address to use for testing

#### Email Templates

The email body templates are defined in:
- `message.html` for company-specific emails
- `message-bulk.html` for bulk emails

Feel free to customize these templates to suit your needs while preserving the placeholder variables.

#### CV

Make sure your CV is placed in the project root with the filename `CV.pdf`.

#### Company Data

For company-specific emails, prepare a JSON file named `entreprises.json` in the project root with the following structure:

```json
{
  "data": [
    {
      "Id": "1",
      "EntrepriseVille": "City Name",
      "EntrepriseTechnologie": "Technologies",
      "EntrepriseSecteurActivite": "Sector",
      "EntrepriseName": "Company Name",
      "EntrepriseLogo": "Logo URL",
      "EntrepriseContactSiteWeb": "Website",
      "EntrepriseContactPhone": "Contact Phone",
      "EntrepriseContactName": "Contact Name",
      "EntrepriseContactEmail": "contact@company.com",
      "Activite": "Activities"
    },
    ...
  ]
}
```

#### Email List

For bulk emails, prepare a text file named `emails.txt` in the project root with one email address per line.

### 4. Testing the Application

Before sending mass emails, test the functionality:

For company-specific emails:
```bash
$ npm run test
```

For bulk emails:
```bash
$ npm run test:bulk
```

### 5. Running the Application

To send emails to companies from `entreprises.json`:
```bash
$ npm run start
```

To send bulk emails to addresses in `emails.txt`:
```bash
$ npm run start:bulk
```

## Notes for Gmail Users

If you're using Gmail, you'll need to:
1. Enable 2-Step Verification for your Google account
2. Generate an App Password specifically for this application
3. Use that App Password in the `PASSWORD_EMAIL` field of your `.env` file

## License

This project is GPL licensed.


By EL GORRIM MOHAMED
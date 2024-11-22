# Dynamic Form Generator
A dynamic form generator built with React and TypeScript that generates forms from JSON schemas. This project is designed to simplify the creation of customizable forms with various input types.

# Features
Generate dynamic forms using JSON schema.
Supports various input types like text, email, textarea, select, and more.
Validation for required fields and custom rules.
Export form data as JSON.

# Setup Instructions
1. Prerequisites
Make sure you have the following installed:

Node.js (version 14 or later)
Git
2. Clone the Repository
bash
Copy code
git clone https://github.com/YOUR_USERNAME/DynamicJsonForm.git
cd DynamicJsonForm
3. Install Dependencies
Install all required packages:

bash
Copy code
npm install
4. Start the Development Server
To run the application locally:

bash
Copy code
npm run dev
The app will be available at http://localhost:5173.

# Build for Production
To build the application for production:

bash
Copy code
npm run build
The output files will be located in the dist/ folder.

# Example JSON Schemas
Below are some example schemas to test the form generator:

# Basic Contact Form
json
Copy code
{
  "formTitle": "Contact Us",
  "formDescription": "Fill out the form below to get in touch.",
  "fields": [
    { "id": "name", "type": "text", "label": "Name", "required": true, "placeholder": "Enter your name" },
    { "id": "email", "type": "email", "label": "Email", "required": true, "placeholder": "Enter your email" },
    { "id": "message", "type": "textarea", "label": "Message", "required": false, "placeholder": "Your message" }
  ]
}
# Registration Form
json
Copy code
{
  "formTitle": "User Registration",
  "fields": [
    { "id": "username", "type": "text", "label": "Username", "required": true },
    { "id": "password", "type": "password", "label": "Password", "required": true },
    { "id": "dob", "type": "date", "label": "Date of Birth", "required": false },
    { "id": "gender", "type": "select", "label": "Gender", "required": true, "options": [
      { "value": "male", "label": "Male" },
      { "value": "female", "label": "Female" },
      { "value": "other", "label": "Other" }
    ]}
  ]
}

# Local Development Guide
## Folder Structure
plaintext
Copy code
├── src/
│   ├── Components/
│   │   ├── DynamicForm.tsx       # Main component to render the form
│   │   ├── FormField.tsx         # Component for rendering individual fields
│   ├── Interfaces/
│   │   └── dynamicForm.interface.ts # TypeScript interfaces and enums
│   ├── styles/
│   │   └── form.css              # Styles for the form
├── public/
│   ├── index.html                # HTML entry point
├── package.json                  # Dependencies and scripts
├── README.md                     # Documentation
# Testing
Run unit tests using:

bash
Copy code
npm test
Development Workflow
Modify components or styles in the src/ directory.
Test changes locally using npm run dev.
Commit and push changes to the repository:
bash
Copy code
git add .
git commit -m "Update components"
git push origin main
Deployment
Deploy the app on platforms like Vercel or Netlify. Ensure the following:

# Build command: npm run build
Output directory: dist/
Contributing
Fork the repository.
Create a feature branch:
bash
Copy code
git checkout -b feature-name
Commit your changes and submit a pull request.

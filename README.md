# TempEmailValidator

**TempEmailValidator** is an open-source Node.js package that helps to validate temporary and disposable emails, preventing fake registrations, frauds, and spam. This package is ideal for developers who want to ensure the authenticity of email addresses provided by users in their registration and authentication systems.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
  - [Basic Example](#basic-example)
- [Features](#features)
- [Testing](#testing)
- [Contributing](#contributing)
- [License](#license)
- [Useful Links](#useful-links)

## Installation

To get started with **TempEmailValidator** in your project, simply install the package via npm:

```bash
npm install tempemailvalidator
```

Or if you are using Yarn:
```bash
yarn add tempemailvalidator
```

Usage
Basic Example
Once the package is installed, you can start using it to validate temporary emails. Here is a basic example:

```js
const TempEmailValidator = require('tempemailvalidator');

// Create an instance of the validator
const validator = new TempEmailValidator();

// Check if an email is temporary
async function checkEmail(email) {
  const isTemporary = await validator.isTemporaryEmail(email);
  if (isTemporary) {
    console.log(`${email} is a temporary email.`);
  } else {
    console.log(`${email} is a valid email.`);
  }
}

checkEmail('example@tempmail.com');
```

## Parameters
- email: The email address to be validated.
- isTemporaryEmail(): Returns true if the email is temporary, otherwise returns false.
## Features
- Temporary Email Validation: Detects emails provided by well-known temporary and disposable email services.
- Easy Integration: Easy to install and integrate into your Node.js projects with a simple npm install.
- Up-to-date Database: The list of temporary email domains is constantly updated to ensure accuracy.
- Simple API: Easy-to-use methods with support for Promises and async/await.
##Testing
This project uses Jest for unit testing.

## Running Tests
To run the tests, simply execute the following command:
```bash
npm test
```

Or if you are using Yarn:
```bash
yarn test
```

## Contributing
Contributions are welcome! 
If you'd like to help improve this project, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature (git checkout -b feature/your-feature-name).
3. Make your changes and add tests.
4. Commit your changes ``(git commit -am 'Add new feature').``
5. Push to your branch ``(git push origin feature/your-feature-name).``
6. Open a pull request.
## Reporting Bugs
If you encounter a bug, please open an issue in the repository with a detailed description of the issue, including examples and error messages.

License
This project is licensed under the ISC License.


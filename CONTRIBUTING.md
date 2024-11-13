# Contributing to TempEmailValidator

Thank you for your interest in contributing to TempEmailValidator! We’re excited to build a reliable temporary email detection tool with your help. Please follow these guidelines to make the contribution process easier for everyone.

---

## Table of Contents
1. [Getting Started](#getting-started)
2. [How to Contribute](#how-to-contribute)
   - [Reporting Bugs](#reporting-bugs)
   - [Suggesting Features](#suggesting-features)
   - [Code Contributions](#code-contributions)
3. [Code Style](#code-style)
4. [Testing](#testing)
5. [License](#license)

---

## Getting Started

1. **Fork the repository**: This allows you to make changes to your own copy of the project.
2. **Clone your fork**: Clone your fork to your local machine and set up the development environment:
    ```bash
    git clone https://github.com/your-username/tempemailvalidator.git
    cd tempemailvalidator
    npm install
    ```
3. **Create a new branch**: Always create a new branch for your changes to keep your work organized.
    ```bash
    git checkout -b feature/your-feature-name
    ```

---

## How to Contribute

### Reporting Bugs
If you find a bug, please [open an issue](https://github.com/your-username/tempemailvalidator/issues) and include:
- **Steps to reproduce the issue**.
- **Expected vs. actual behavior**.
- Any **relevant logs, screenshots, or code snippets**.

### Suggesting Features
We welcome feature requests! If you have an idea to improve the library, please open an issue and include:
- **A clear description of the feature**.
- **Use cases** where this feature could be helpful.
- If possible, **suggested implementation details**.

### Code Contributions
1. **Check open issues**: If you see an issue you’d like to work on, please comment to express your interest. We encourage discussions and planning to ensure everyone is aligned.
2. **Make changes**: Commit and push your changes with clear and descriptive messages.
3. **Open a pull request (PR)**: When your work is ready, open a PR to the `main` branch. Please follow these guidelines:
    - Provide a **title** and **description** of your changes.
    - Reference any relevant issues, if applicable.
    - Keep PRs focused and small. Large PRs can be harder to review.

---

## Code Style
Please adhere to the existing code style for consistency. Key guidelines:
- **Use ES modules** for imports/exports.
- **Error handling**: Make sure to handle any potential errors, especially for DNS resolutions.
- Follow **consistent naming conventions** and **indentation**.

---

## Testing
Ensure that your contributions are thoroughly tested. We use a mix of unit and integration tests:
- Add tests for new or modified features in the `tests` directory.
- Make sure all tests pass before submitting a PR:
    ```bash
    npm test
    ```

If you need help or clarification, feel free to ask in your PR.

---

## License
By contributing to TempEmailValidator, you agree that your contributions will be licensed under the MIT License.

Thank you for helping make TempEmailValidator better! We look forward to working with you.

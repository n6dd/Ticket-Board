# README Generator
 ![badge](https://img.shields.io/badge/license-MIT-blue.svg)

 ## Description
 A simple and secure Kanban board application that uses JSON Web Tokens (JWT) for user authentication. This project provides a clean login workflow, protected routes, and session management using JWTs.

 ## Table of Contents
 - [Description](#description)
 - [Installation]($installation)
 - [Usage](#usage)
 - [License](#license)
 - [Contributing](#contributing)
 - [Tests](#tests)
 - [Question]($questions)
 - [Additional Info](#additional-info)

 ## Usage
 1. Open the login page

 Enter your username and password.

 2. Successful login

 If the credentials are valid, a JWT is issued, stored in localStorage, and you’re redirected to the Kanban board.

 3. Failed login

 If the credentials are invalid, an error message is displayed.

 4. Protected Kanban board

 The board is only accessible with a valid JWT.

 If unauthenticated, you will be redirected to the login page.

 5. Session timeout

 After a period of inactivity, the JWT expires.

 The next action will redirect you to the login page.

 6. Logout 

 Clears the JWT from localStorage and redirects to the login page.

 ## Credits
 

 ## License
 This project is licensed under MIT.

 [MIT](https://mit-license.org/)

 ## Tests
 

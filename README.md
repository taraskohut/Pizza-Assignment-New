# Angular Project with JSON Server

This project is an Angular application that uses **JSON Server** as a mock backend for data.

## Prerequisites

- **Node.js**: Recommended version **20+**
- **NPM** (comes with Node.js)

## Installation

1. Clone the repository or download the source code.
2. Navigate to the project directory in your terminal.
3. Install dependencies:

   ```bash
   npm install
   ```
4. If JSON Server is not already installed globally, install it:

   ```bash
   npm install -g json-server
   ```
## Running the Application
1. Start the JSON Server and the Angular application using the following command:

   ```bash
    npm run start
   ```
or use Angular CLI directly:
    ```bash
    ng serve
    ```

Open your browser and navigate to:
```plaintext
http://localhost:4200
```
The Angular application will be served here.

## Additional Information
* JSON Server simulates a REST API. Ensure you have a db.json file in your project directory or configured as per your setup.
Modify db.json to reflect your mock data.
* Troubleshooting
If you encounter issues with JSON Server, ensure it is installed globally:

   ```bash
   npm install -g json-server
   ```
If the Angular application doesn't start, ensure all dependencies are installed correctly with npm install.

Enjoy building your Angular application!

# Resume Builder Website

This project is a Resume Builder website created using Vite, React, and Firebase. It allows users to create and manage their resumes online. Firebase is used for user authentication and data storage.

## Features

- User authentication with Firebase Authentication.
- Create, edit, and delete resume details.
- Store resume data in Firebase Firestore.

## Technologies Used

- [Vite](https://vitejs.dev/): Frontend build tool for modern web development.
- [React](https://reactjs.org/): JavaScript library for building user interfaces.
- [Firebase](https://firebase.google.com/): Platform for building web and mobile applications by Google.

## Installation

1. Clone the repository:

    ```bash
    git clone <repository-url>
    ```

2. Navigate to the project directory:

    ```bash
    cd resume-builder
    ```

3. Install dependencies:

    ```bash
    npm install
    ```

4. Create a Firebase project and set up authentication and Firestore.

5. Create a `.env` file in the root directory of the project and add Firebase configuration:

    ```
    VITE_API_KEY=<your-api-key>
    VITE_AUTH_DOMAIN=<your-auth-domain>
    VITE_PROJECT_ID=<your-project-id>
    VITE_STORAGE_BUCKET= <storage-bucket>
    VITE_MESSAGE_SENDER_ID= <message-sender-id>
    VITE_APP_ID= <app-id>
    ```
6. Start the development server:

    ```bash
    npm run dev
    ```

7. Open the browser and navigate to `http://localhost:3000`.

## Usage

1. Sign up for an account or log in using your existing account.
2. Create a new resume by filling out the required information.
3. Edit or delete your existing resumes as needed.
4. Your resume data will be stored securely in Firebase Firestore.

## Contributing

Contributions are welcome! If you'd like to contribute to this project, feel free to open an issue or submit a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

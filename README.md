# MessageXL Web

MessageXL Web is a lightweight and elegant web application designed for sharing longer messages with Markdown support. It provides a simple and intuitive interface for composing, publishing, and sharing messages instantly.

**Please Note:** This application is provided as-is. Users are responsible for their own actions and content shared through this platform. MessageXL is not responsible for any damage or harm caused by messages, illegal content, or visiting untrusted websites.

## Features

* **Markdown Support:** Write messages with rich formatting using Markdown syntax.
* **Live Preview:** See how your message will look as you type.
* **Dark/Light Mode:** Toggle between themes for comfortable viewing.
* **Responsive Design:** Works seamlessly on desktop and mobile devices.
* **No Account Required:** Share messages instantly without registration.
* **Firebase Backend:** Secure and scalable data storage using Firebase Firestore.
* **Unique Shareable Links:** Generates links in the format `https://messagexl.web.app/?m=[messageId]` for easy sharing.
* **Security Disclaimer:** Prominent warning regarding external links and data security.
* **Confetti Animation:** Celebratory confetti upon successful message creation.
* **Ad Free & Data Privacy:** This app is and will always be free of charge, and ad free, we don't collect any data and we will not do so in the entire existense of this project and its later versions (forks etc.).
* **Illegal Content Reporting:** Users should report illegal content to their local police department or whatever they can report stuff too in their country or area.

## Demo

Check out the live demo: [MessageXL Demo](https://messagexl.web.app/)

## Getting Started

### Prerequisites

* Node.js (v14 or higher recommended)
* Firebase account

### Installation

1.  Clone the repository:
    ```bash
    git clone [https://github.com/dadevmikey/messagexl.git](https://www.google.com/search?q=https://github.com/dadevmikey/messagexl.git)
    cd messagexl
    ```
2.  Create a `firebase-config.js` file in the project root (this file will be ignored by git):
    ```javascript
    // firebase-config.js
    const firebaseConfig = {
      apiKey: "YOUR_API_KEY",
      authDomain: "YOUR_AUTH_DOMAIN",
      projectId: "YOUR_PROJECT_ID",
      storageBucket: "YOUR_STORAGE_BUCKET",
      messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
      appId: "YOUR_APP_ID"
    };

    export default firebaseConfig;
    ```
3.  Replace the placeholder values with your actual Firebase project credentials.
4.  Install dependencies (if you're using a build tool):
    ```bash
    npm install
    ```
5.  Start the development server:
    ```bash
    npm start
    ```

### Deployment

#### Firebase Hosting

1.  Install Firebase CLI:
    ```bash
    npm install -g firebase-tools
    ```
2.  Login to Firebase:
    ```bash
    firebase login
    ```
3.  Initialize your project:
    ```bash
    firebase init
    ```
    * Select Hosting
    * Choose your Firebase project
    * Set public directory to "public"
    * Configure as a single-page app: No
4.  Deploy to Firebase:
    ```bash
    firebase deploy
    ```

## Security and Disclaimer

**Warning:** Exercise caution when visiting external links or downloading content. Never enter sensitive information like passwords or payment details, as this service is free and ad-free. We do not collect user data. Report illegal content to your local authorities. MessageXL is not responsible for harmful or damaging content. Visit only trusted websites.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1.  Fork the repository.
2.  Create your feature branch (`git checkout -b feature/amazing-feature`).
3.  Commit your changes (`git commit -m 'Add some amazing feature'`).
4.  Push to the branch (`git push origin feature/amazing-feature`).
5.  Open a Pull Request.

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

* [Marked.js](https://marked.js.org/) for Markdown parsing.
* [DOMPurify](https://github.com/cure53/DOMPurify) for sanitizing HTML.
* [Iconify](https://iconify.design/) for beautiful icons.
* [JS-Confetti](https://github.com/loonywizard/js-confetti) for confetti effects.

## Contact

DaDevMikey - @DaManMikey on Discord - nexasstudiosdevelopment@gmail.com

Project Link: [https://github.com/dadevmikey/messagexl](https://github.com/dadevmikey/messagexl)

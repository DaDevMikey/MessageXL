# MessageXL

MessageXL is a lightweight, elegant web application for sharing longer messages with Markdown support. It allows users to compose, publish, and share messages with a beautiful, responsive interface.

![MessageXL Screenshot](screenshot.png)

## Features

- **Markdown Support**: Write messages with rich formatting using Markdown syntax
- **Live Preview**: See how your message will look as you type
- **Dark/Light Mode**: Toggle between themes for comfortable viewing
- **Responsive Design**: Works on desktop and mobile devices
- **No Account Required**: Share messages instantly without registration
- **Firebase Backend**: Secure and scalable data storage

## Demo

Check out the live demo: [MessageXL Demo](https://your-demo-url-here.com)

## Getting Started

### Prerequisites

- Node.js (v14 or higher recommended)
- Firebase account

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/messagexl.git
   cd messagexl
   ```

2. Create a `firebase-config.js` file in the project root (this file will be ignored by git):
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

3. Replace the placeholder values with your actual Firebase project credentials.

4. Install dependencies (if you're using a build tool):
   ```bash
   npm install
   ```

5. Start the development server:
   ```bash
   npm start
   ```

### Deployment

#### Firebase Hosting

1. Install Firebase CLI:
   ```bash
   npm install -g firebase-tools
   ```

2. Login to Firebase:
   ```bash
   firebase login
   ```

3. Initialize your project:
   ```bash
   firebase init
   ```
   - Select Hosting
   - Choose your Firebase project
   - Set public directory to "public"
   - Configure as a single-page app: No

4. Deploy to Firebase:
   ```bash
   firebase deploy
   ```

## Project Structure

```
messagexl/
├── public/              # Static files
│   ├── index.html       # Main HTML file
│   ├── styles.css       # Styles
│   └── script.js        # Main JavaScript file
├── firebase-config.js   # Firebase configuration (gitignored)
├── .gitignore           # Git ignore file
└── README.md            # This file
```

## Security

- This application uses Firebase Firestore for data storage
- Firebase security rules should be configured to prevent unauthorized access
- No sensitive user data is collected or stored

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Marked.js](https://marked.js.org/) for Markdown parsing
- [DOMPurify](https://github.com/cure53/DOMPurify) for sanitizing HTML
- [Iconify](https://iconify.design/) for beautiful icons
- [JS-Confetti](https://github.com/loonywizard/js-confetti) for confetti effects

## Contact

Your Name - [@your_twitter](https://twitter.com/your_twitter) - email@example.com

Project Link: [https://github.com/yourusername/messagexl](https://github.com/yourusername/messagexl) 
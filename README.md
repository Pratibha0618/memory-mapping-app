# Memory Mapping Application

A React-based web application for creating, managing, and sharing personal memories on an interactive map. Users can pin memories to specific locations, view them in timeline format, and share them with others.

## Features

- **Interactive Map**: Add memories by clicking on map locations using Leaflet
- **Memory Management**: Create, edit, and delete personal memories with titles, descriptions, and locations
- **Timeline View**: Browse memories in a chronological timeline format
- **Memory Sharing**: Share memories with read-only access via secure links
- **User Authentication**: Firebase-based authentication with email/password and password reset
- **Responsive Design**: Modern Material-UI interface that works on all devices
- **Real-time Updates**: Live synchronization of memories across sessions

## Tech Stack

- **Frontend**: React 18, Material-UI, Leaflet Maps
- **Backend**: Firebase (Authentication, Firestore Database)
- **Styling**: Material-UI components with custom theming
- **Maps**: Leaflet with OpenStreetMap tiles
- **Deployment**: Netlify

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Firebase project with Firestore and Authentication enabled

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd memory-map
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with your Firebase configuration:
```env
REACT_APP_FIREBASE_API_KEY=your_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
REACT_APP_FIREBASE_PROJECT_ID=your_project_id
REACT_APP_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
REACT_APP_FIREBASE_APP_ID=your_app_id
```

## Available Scripts

### `npm start`
Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

### `npm run build`
Builds the app for production to the `build` folder

### `npm test`
Launches the test runner in interactive watch mode

## Project Structure

```
src/
├── components/
│   ├── Map.js              # Interactive map with memory markers
│   ├── MemoryForm.js       # Form for adding/editing memories
│   ├── Timeline.js         # Timeline view of memories
│   ├── ShareDialog.js      # Memory sharing functionality
│   ├── Login.js            # Authentication component
│   ├── LandingPage.js      # Application landing page
│   └── ...
├── contexts/
│   └── AuthContext.js      # Authentication context provider
├── firebase/
│   └── config.js           # Firebase configuration
├── App.js                  # Main application component
└── index.js               # Application entry point
```

## Key Components

### Map Component
- Interactive Leaflet map with custom markers
- Click-to-add memory functionality
- Memory popups with edit/delete options
- Read-only mode for shared memories

### Memory Form
- Material-UI dialog for memory creation/editing
- Form validation and error handling
- Location, title, and description fields

### Timeline View
- Chronological display of memories
- Card-based layout with animations
- Responsive grid system

### Authentication
- Firebase Authentication integration
- Email/password login and registration
- Password reset functionality
- Protected routes

## Deployment

### Netlify Deployment

1. Build the application:
```bash
npm run build
```

2. Deploy to Netlify:
   - Connect your GitHub repository to Netlify
   - Set build command: `npm run build`
   - Set publish directory: `build`
   - Add environment variables in Netlify dashboard

### Environment Variables for Production

Ensure all Firebase configuration variables are set in your deployment environment.

## Firebase Setup

1. Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
2. Enable Authentication with Email/Password provider
3. Create a Firestore database
4. Set up security rules for your database
5. Get your Firebase configuration and add to `.env` file

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request


# Event Management System

A simple React app to browse events from the Ticketmaster API, register for them, and view your registered events.

## Features
- Search events by keyword and category
- View event details
- Sign up and log in
- Register for events
- "My Events" page for logged-in users

## Tech Used
React, Redux Toolkit, React Router, Ticketmaster API

## Requirements
- Node.js (v18 or later)
- A free API key from [developer.ticketmaster.com](https://developer.ticketmaster.com/)

## Setup

1. Clone the project:
```bash
   git clone https://github.com/Murtaza-626/Event-Managment-System.git
   cd Event-Managment-System
```

2. Install packages:
```bash
   npm install
```

3. Create a file named `.env` in the main folder (next to `package.json`) and add your API key:
```
   REACT_APP_TICKETMASTER_API_KEY=your_api_key_here
```

## Run the App

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

> If you change the `.env` file, stop the app (Ctrl + C) and run `npm start` again.

## Build for Production

```bash
npm run build
```

## Notes
- User data is saved in the browser's localStorage (no backend).
- Do not upload your `.env` file to GitHub.

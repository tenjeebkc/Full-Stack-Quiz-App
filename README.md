# Full-Stack Quiz App

A full-stack quiz application built with React, Node.js, Express, and MongoDB.

# Features

* Timed multiple-choice quizzes
* Randomized questions
* Score calculation
* Save quiz results
* View quiz history
* Clear quiz history
* REST API
* Input validation and error handling

# Tech Stack

* Frontend: React, JavaScript, Vite, CSS
* Backend: Node.js, Express.js
* Database: MongoDB Atlas
* ODM: Mongoose

# Run Locally

1. Clone the repository

* git clone YOUR_REPOSITORY_URL
* cd Full-Stack-Quiz-App

2. Install dependencies

* cd client
* npm install
* cd ../server
* npm install

3. Environment Variables

* Create .env files for the client and server.

* Client: VITE_API_URL=http://localhost:3000

* Server: MONGO_URI=YOUR_MONGODB_CONNECTION_STRING
PORT=3000
CLIENT_URL=http://localhost:5173

4. Start the application

Start the backend:

* cd server
* node server.js

Start the frontend in another terminal:

* cd client
* npm run dev

Open the local URL provided by Vite.

* Keep .env files private and never commit database credentials to GitHub.

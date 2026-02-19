# StreamX — Netflix-style Frontend

A production-quality, responsive Netflix-style frontend built with HTML, CSS, and modern JavaScript (ES6+). Includes localStorage-based authentication and OMDb API integration for movie data.

## Features
- Dark Netflix-style theme (#141414)
- Responsive layout: mobile, tablet, desktop
- Hero banner with featured movie
- Horizontal rows: Trending, Action, Drama, Sci-Fi
- Hover effects on movie cards (scale + shadow)
- Movie details modal (title, poster, year, genre, plot, IMDb rating, runtime)
- Sign Up / Login using localStorage

## Tech Stack
- HTML5 (semantic)
- CSS3 (Flexbox + Grid)
- JavaScript (ES6+)
- Fetch API
- LocalStorage

## Pages
- `signup.html` — Create account (Name, Email, Password)
- `login.html` — Login (Email, Password)
- `index.html` — Home (after login)

## OMDb API
- Base: `https://www.omdbapi.com/`
- API Key: `3abdd6cf`
- Example: `https://www.omdbapi.com/?apikey=3abdd6cf&s=avengers`

## Getting Started
1. Clone or download the repository.
2. Create `.env` from `.env.example` and set `OMDB_API_KEY`.
3. Install dependencies: `npm install`
4. Start server: `npm start`
5. Open `http://localhost:3000/signup.html` or `http://localhost:3000/login.html`

## Development
- Files are static. Use any local server if needed:
  - VS Code Live Server
  - `python -m http.server` (Python)
  - Or open HTML files directly

## Authentication Flow
1. First screen: Sign Up / Login
2. Sign Up stores `{ name, email, password }` in `localStorage`
3. Login validates `email` and `password` from `localStorage`
4. On success, redirects to Home
5. Logout clears session and redirects to Login

## File Structure
```
index.html
login.html
signup.html
styles/
  main.css
scripts/
  auth.js
  api.js
  home.js
  movieDetails.js
```

## Deployment
- Host on GitHub Pages or any static host.
- Ensure all files are in the repository root (or configure paths accordingly).

## Credits
- Movie data from OMDb API (The Open Movie Database).

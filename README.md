# Personal Information Form

Simple Node.js + Express app that presents a clean personal information form, validates input on the server, sanitizes it, and displays a success page.

## Setup

Open a terminal and run:

```powershell
cd c:\CLASSROOM\github-1\2.7
npm install
npm start
```

The app will run at `http://localhost:3000`.

## Routes

- `GET /` - show the form
- `POST /submit` - validate and process the submission

## Notes

- Server-side validation uses `express-validator`.
- Inputs are trimmed and escaped to reduce XSS risk.

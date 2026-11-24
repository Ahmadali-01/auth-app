# Secure Authentication System

A complete full-stack authentication system built with Next.js, Auth.js (NextAuth), and Prisma.

## 🚀 Features
- **User Registration** with secure password hashing (Argon2id).
- **Credentials Login** using database-validated sessions.
- **Protected Routes** using Next.js Middleware.
- **Secure Logout** clearing session cookies.
- **Password Reset Flow** using secure, single-use, time-limited hashed tokens.

## 🛡️ Security Measures
1. **Password Hashing:** Uses `@node-rs/argon2` with memory cost 64MB and time cost 3.
2. **Enumeration Prevention:** Login and Forgot Password endpoints return generic error messages to prevent attackers from guessing valid emails.
3. **Reset Token Security:** Reset tokens are hashed (SHA-256) before being stored in the database. They expire in 60 minutes.
4. **Server-Side Protection:** Middleware and Server Components check the session before rendering protected pages.
5. **CSRF Protection:** Handled automatically by Auth.js.

## 🔄 Auth Flow
1. **Sign-Up:** User submits form → Zod validates data → Password is hashed → User saved to Prisma DB.
2. **Login:** User submits form → Auth.js Credentials provider → Zod validates → Argon2 verifies hash → JWT session generated.
3. **Protected Routes:** `middleware.ts` intercepts requests to `/dashboard` → Verifies session → Redirects to `/login` if unauthenticated.
4. **Password Reset:** User requests reset → SHA-256 hash of random token saved to DB → Raw token printed to server logs (dev). User submits new password with token → Server validates hash and expiry → Password updated.

## 💻 Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Authentication:** Auth.js v5 (NextAuth)
- **Database ORM:** Prisma (v6)
- **Database:** SQLite (dev)
- **Validation:** Zod
- **Styling:** Tailwind CSS
- 

## 🛠️ Local Setup
1. Clone the repo
2. Run `npm install`
3. Add `.env` file (copy from `.env.example`)
4. Run `npx prisma db push`
5. Run `npm run dev`

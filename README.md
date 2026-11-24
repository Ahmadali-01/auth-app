# Task 4: Authentication & Database Integration

A complete full-stack authentication system built with Next.js, Auth.js (NextAuth), and Prisma. This project includes sign-up, login, logout, password reset, session management, and protected routes.

## 🚀 Tech Stack
- **Framework:** Next.js (App Router)
- **Authentication:** Auth.js v5 (NextAuth)
- **Database ORM:** Prisma
- **Database:** PostgreSQL (Neon Cloud)
- **Password Hashing:** Argon2id
- **Validation:** Zod
- **Styling:** Tailwind CSS
- **Deployment:** Netlify

## 🔐 Authentication Flow

1. **Sign-Up (Registration):**
   - User inputs Name, Email, and Password.
   - Zod validates the inputs (e.g., password length).
   - Password is securely hashed using `Argon2id` before being saved.
   - User data is stored in the PostgreSQL database via Prisma.

2. **Login:**
   - User enters credentials.
   - Auth.js uses the Credentials provider to verify the email.
   - `Argon2` verifies the input password against the stored hash.
   - Upon success, a secure HTTP-only session cookie is generated.

3. **Logout:**
   - Clears the session cookie and safely redirects the user to the home page.

4. **Protected Routes:**
   - The `/dashboard` route is protected using Next.js Middleware (`proxy.ts`).
   - If an unauthenticated user tries to access `/dashboard`, they are immediately redirected to `/login`.

5. **Password Reset Flow:**
   - User requests a reset link via email.
   - A secure 32-byte random token is generated and **SHA-256 hashed** before saving to the DB.
   - The raw token is sent via email. 
   - When the user clicks the link, the server validates the hashed token, ensures it hasn't expired (60 mins), and allows the password update.

## 🛡️ Security Measures Implemented

1. **Password Hashing (Argon2id):** Passwords are never stored in plain text. We use Argon2id with memory cost of 64MB, which is resistant to GPU cracking.
2. **Server-Side Protection:** Middleware checks the session securely on the server before serving the dashboard, preventing client-side bypasses.
3. **Enumeration Prevention:** Login errors always return a generic "Invalid email or password" message to prevent attackers from guessing valid emails.
4. **Secure Reset Tokens:** Reset tokens are time-limited (60 minutes), single-use, and stored as hashes in the database.
5. **Form Validation:** Both client and server sides use Zod schemas to prevent injection and malformed data.
6. **CSRF Protection:** Handled automatically by Auth.js.

## ⚙️ Local Setup
1. Clone the repo: `git clone https://github.com/Ahmadali-01/auth-app.git`
2. Install dependencies: `npm install`
3. Create `.env` file with `DATABASE_URL` and `AUTH_SECRET`.
4. Push DB schema: `npx prisma db push`
5. Run project: `npm run dev`

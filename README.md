# SHINOBI STREAM — React + Supabase

## What is included
- React + Vite responsive anime streaming catalogue with animated dark crimson design.
- Username/password registration and persistent Supabase Auth session (no repeated login until sign-out/session expiry).
- Search, genre filters, movie filter, watchlist, anime details and HTML video playback.
- Admin dashboard: add/edit/delete anime, upload poster/banner images, add episode URLs and optional subtitles.
- Admin PIN verified by Supabase Edge Function; first admin created through a one-time server-side bootstrap function.
- Supabase SQL schema and Row Level Security policies.

The logo is an original stylized shinobi emblem, not an official Itachi portrait. Use authorized artwork for an actual character portrait. This project does not provide copyrighted anime episodes; only upload/embed media you own or are licensed to use.

## 1. Supabase setup
1. Create a project at https://supabase.com/dashboard.
2. Copy Project URL and `anon` public key from Project Settings → API.
3. Authentication → Providers → Email: turn OFF email confirmations for the username-only alias login. No emails are sent because the site maps usernames to internal `.invalid` aliases. For email-based password recovery, redesign signup to collect a real email.
4. SQL Editor: run `supabase/migrations/0001_shinobi_schema.sql`.
5. In Edge Functions secrets, set `ADMIN_PIN` to your private PIN. Supabase provides `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` to deployed functions automatically. Never put service role key or PIN in frontend code.

## 2. Configure and run
Copy `.env.example` to `.env` and set:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Install Node.js 20+, then:
```bash
npm install
npm run dev
```
For production:
```bash
npm run build
```
Vite creates `dist/`.

## 3. Deploy Supabase Edge Functions
Install Supabase CLI, then:
```bash
supabase login
supabase link --project-ref YOUR_PROJECT_REF
supabase secrets set ADMIN_PIN="your-private-admin-pin"
supabase functions deploy bootstrap-admin --no-verify-jwt
supabase functions deploy verify-admin-pin
```
`bootstrap-admin` is intentionally callable before anyone has an account; the secret PIN protects it and it refuses after the first admin is created. Keep the PIN private. The function creates the first admin Auth user and promotes its profile.

Create first admin using curl:
```bash
curl -X POST "https://YOUR_PROJECT_REF.supabase.co/functions/v1/bootstrap-admin" \
  -H "Content-Type: application/json" \
  -H "apikey: YOUR_SUPABASE_ANON_KEY" \
  -d '{"username":"your_admin_name","password":"a-long-admin-password","pin":"YOUR_PRIVATE_PIN"}'
```
Then sign into the website with that username/password and use the Admin button (shown for admin profile) to enter the PIN and open the dashboard.

## 4. Push to GitHub from Android
1. Download and extract this ZIP.
2. Create a GitHub repository named `shinobi-stream`.
3. In Chrome open the repository → Add file → Upload files.
4. Upload the extracted files/folders, keeping `src/` and `supabase/` folders intact. Do not upload `.env` or `node_modules`.
5. Commit changes.

## 5. Deploy frontend on Vercel
1. In Vercel choose Add New → Project and import your GitHub repository.
2. Framework: Vite. Build command: `npm run build`. Output directory: `dist`.
3. Add environment variables `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
4. Deploy. Push future GitHub commits to trigger redeploys.

## Security / production checklist
- Never commit `.env`; never expose `ADMIN_PIN` or `SUPABASE_SERVICE_ROLE_KEY`.
- Admin privileges are enforced by database RLS, not just hidden UI.
- The PIN check is server-side. The first-admin bootstrap is one-time.
- Use HTTPS, backups, and a strong private PIN/password. Consider rate limiting, monitoring and password recovery before a public launch.
- The app stores episode source URLs; actual playback depends on CORS, browser codecs, and the media host's permission/availability.
- Public artwork bucket is intended for poster/banner delivery; uploads are restricted by admin role.

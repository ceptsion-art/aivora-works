# Aivora AI — corrected backend setup (October 2026)

This build improves account isolation and adds a password-update button for reset emails. It is **not** a guarantee that a live deployment is configured: you must run live smoke tests with your own accounts.

## Deployment — Git-connected Netlify (recommended)
1. Extract this ZIP. Upload **all files and directories at the root** of a GitHub repository (no extra nesting): `netlify.toml`, `public/`, `netlify/`, etc.
2. Connect the Git repository to the **existing** Netlify site **aivora-works**, keeping its existing site ID and domain.
3. Build settings: base directory blank; publish directory `public` (also set in `netlify.toml`); functions `netlify/functions` (also in `netlify.toml`).
4. Set these site environment variables with **Functions** scope: `SUPABASE_URL=https://<ref>.supabase.co`, `SUPABASE_PUBLISHABLE_KEY=sb_publishable_...`, `GEMINI_API_KEY=<private Google key>`. Optionally `GEMINI_MODEL=gemini-3.5-flash-lite`. Do not upload any secret keys or `.env`.
5. In Supabase Authentication > URL Configuration use Site URL `https://aivora-works.netlify.app` and Redirect URL `https://aivora-works.netlify.app/**`.
6. Ensure you have already run `SUPABASE_EXTRA_SQL.sql` once. Existing tables should not be dropped.
7. Deploy and verify in the Netlify dashboard that functions `config`, `mentor`, and `github` exist. A successful static-site deploy **does not prove** functions were included.

## Required live smoke tests
A. Visit `https://aivora-works.netlify.app/.netlify/functions/config`. Expect JSON `url` with `.supabase.co` and `key` beginning `sb_publishable_`. The publishable key is safe to expose under RLS; **never** expose `GEMINI_API_KEY` or Supabase secret key.
B. Visit `https://aivora-works.netlify.app/api/mentor`. Expect `connected:true`. This ONLY proves the Gemini key exists, NOT that a Google call works.
C. Create a fresh student account and verify its email, then sign in and sign out. Test password reset by following an email link.
D. Change career skills or roadmaps; wait two seconds, reload, and sign into the same account. Progress should reappear. Sign into a **second account** in a private window; it must NOT see the first account’s progress.
E. With a signed-in account, ask the mentor a question and verify an authentic, responsive Gemini message — **not a demo fallback**. Google quota, key restrictions, and model availability can cause errors.
F. Check Netlify Functions logs and browser console if any smoke test fails.

## Known limitations and public launch cautions
- Existing career scores are illustrative self-assessments. Job and skill matching is heuristic, not a live hiring prediction.
- Career progress is synchronized in `public.app_state` as JSON; the earlier seven normalized tables are not individually wired to UI widgets.
- Gemini requests are not yet tied to authenticated Supabase sessions or robust server-side abuse protection. Before public launch, add verified JWT checks, shared rate limiting, usage quotas, and budget alerts.
- Supabase default email delivery has rate limits; use SMTP service before inviting many students.
- Testing with mocked services is not a real production guarantee.

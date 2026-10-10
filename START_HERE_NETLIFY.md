# Aivora AI — Netlify + Gemini setup

This version is specifically built for **Netlify**, not Vercel. You already have a Gemini key; **never paste it inside the website files** or into a public chat.

## Where your key goes

1. Sign in to https://app.netlify.com and open **your existing Aivora project**.
2. Open **Project configuration → Environment variables** (sometimes called Site configuration).
3. Choose **Add variable**. Key: `GEMINI_API_KEY`. Value: your existing Google AI Studio key. Use the Production context (or all deploy contexts). If scopes are shown, include **Functions**.
4. Optional model override: `GEMINI_MODEL` = `gemini-3.5-flash-lite` (the default); check your AI Studio project's model availability.
5. Save. **Deploy this Netlify-compatible project** to the *same Netlify site*, so it includes `netlify/functions/mentor.mjs` and `netlify/functions/github.mjs`. Changing the env var alone cannot turn the old Vercel /api functions into Netlify Functions.
6. **Redeploy** after saving variables; existing deploys won't automatically receive updates.
7. In your browser, visit `https://YOUR-SITE.netlify.app/api/mentor`. Expect a JSON object with `"connected":true` (key is set, not proof Gemini's response works). Never should it show your key.
8. Open `https://YOUR-SITE.netlify.app/#dashboard/mentor` and ask a question to confirm Gemini responds. A live answer, without a demo-fallback warning, confirms end-to-end operation.

## How to update your existing Netlify site

**Recommended:** Put all extracted project contents into the root of the GitHub repository already connected to your Netlify site, then commit/push; Netlify rebuilds with the Functions. Ensure `netlify.toml` is in the repository root. Do **not** upload just `public/index.html`.

**No Git repository?** From a computer with Node.js, extract this ZIP, open a terminal in the extracted folder, run `npx netlify-cli login`, `npx netlify-cli link` (select the existing Netlify site), then `npx netlify-cli deploy --prod` to upload the public folder **and the Functions**. A simple drag/drop of only the HTML or publish folder may omit the Functions.

## Included files

- `public/index.html`, `public/styles.css`, `public/app.js`: unchanged Aivora career dashboard and interactive experience, with corrected Netlify setup text.
- `netlify/functions/mentor.mjs`: server-side Gemini calls for AI Mentor, interview feedback, 30-day planner and opt-in resume feedback.
- `netlify/functions/github.mjs`: public GitHub metadata lookup.
- `netlify.toml`: sets the public publish directory and Functions directory.

## Notes

The key never leaves the server. `/api/mentor` GET reveals connection status only, not the key. Actual usage is subject to Google's quotas. Free tier may have content-use conditions. This is still a prototype: demo login and progress are stored locally per device; no shared user database. Production launch needs centralized abuse protection, authentication and privacy controls.

# Abhishek & Sweta: engagement invitation

A static Next.js site (landing envelope, invitation, RSVP, details) exported to GitHub Pages.

## Commands

- `npm run dev` start the dev server
- `npm run build` static export to `out/`
- `npm test` unit tests
- `npm run smoke` browser smoke test (run `npm run build` first)

## Deploy

In the repository go to Settings > Pages > Source and choose GitHub Actions. Every push to `main` builds and deploys.

## RSVP form setup

RSVPs are posted to a Google Form. Fill `GOOGLE_FORM` in `src/lib/site.ts`:

1. Create a Google Form with matching questions: name, contact, email, attending (multiple choice with the two labels in `attendingLabels`), message.
2. Use "Get pre-filled link", fill every question with a sample value, and open the link. Read the `entry.N` ids from the URL into `entries`.
3. Set `actionUrl` to the form URL ending in `/formResponse`, for example `https://docs.google.com/forms/d/e/<FORM_ID>/formResponse`.

Until configured, submissions are skipped with a console warning.

The gift registry link is `LINKS.registry` in the same file.

# Andrei Popescu — Portfolio

Static portfolio site: business automation, workflow scripts, and web design work. No build step — plain HTML, CSS, and JS.

## Preview locally

```
node preview-server.js
```

Then open http://localhost:8811 in a browser.

## Structure

- `index.html` — all page content and sections
- `styles.css` — design system (colors, type, layout)
- `script.js` — mobile nav, project lightbox, live terminal widget, contact form
- `assets/` — project screenshots, walkthrough videos, and sample deliverables, grouped by case study

## To finish setting up

The contact form on the page posts to Formspree. To make it live:

1. Create a free form at [formspree.io](https://formspree.io) using your own email.
2. Copy the form ID it gives you.
3. In `index.html`, replace `YOUR_FORM_ID` in the `<form action="...">` line with that ID.
4. Commit and push — the form will start delivering to your inbox.

Until that's done, the form shows a friendly message pointing visitors to Upwork instead.

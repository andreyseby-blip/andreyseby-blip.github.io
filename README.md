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

## Contact form

Connected to Formspree (`https://formspree.io/f/mwlpkkvy`). Submissions go to the inbox used to create that form. `script.js` posts the form via `fetch` with `Accept: application/json` — Formspree's recommended AJAX pattern — so no extra client library is needed.

The first real submission triggers a one-time confirmation email from Formspree that has to be approved before messages start arriving normally.

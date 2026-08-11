# Workflow

- After making an approved change to this repo, commit it and push directly to `origin/main` automatically — no need to ask for confirmation before pushing.
- Write commit messages in the same plain, imperative style as existing history (see `git log`), no conventional-commit prefixes.
- `css/style.css` and `js/*.js` are referenced from every HTML page with a `?v=N` cache-busting query string (Netlify caches `/css/*` and `/js/*` for 1h via `netlify.toml`). Whenever you edit `style.css` or any `js/*.js` file, bump `?v=N` to `?v=N+1` on every reference across all HTML pages in the same commit — otherwise visitors with a warm cache can get mismatched HTML/CSS/JS (symptom seen once: canvas backgrounds losing their positioning CSS and inflating their sections).

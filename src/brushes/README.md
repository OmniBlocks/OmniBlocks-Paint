# Brushes scaffold

This folder contains a minimal scaffold for adding 'brush' support to the bitmap editor.

Files added:
- `index.js` — small exposed API to register/query brushes.
- `simple-brush.js` — a tiny example brush implementation (alpha mask based).

This is intentionally minimal: it provides a stable place to expand brush implementations and to wire into the existing bitmap brush/paint tooling.

TODO:
- Hook the `index.js` API into the bitmap brush tool in `src/`.
- Add unit tests for brush stamping and edge cases.

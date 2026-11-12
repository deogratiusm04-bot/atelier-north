# Atelier North

A responsive editorial fashion storefront built with React, TypeScript, Vite, Tailwind CSS, and Lucide icons.

## Getting started

```sh
npm install
npm run dev
```

## Quality checks

```sh
npm run typecheck
npm run lint
npm test
npm run build
```

The production build runs the strict TypeScript check before bundling. `vercel.json` rewrites application routes to `index.html` for SPA hosting.

## Structure

- `src/components/` — reusable product, modal, cart, and layout UI
- `src/context/` — persistent shopping bag state
- `src/data/` — seasonal product catalog
- `src/hooks/` — shared cart and keyboard hooks
- `src/pages/` — storefront page sections
- `src/types/` — shared TypeScript models

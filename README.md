# OCR Platform (React + Vite + Tailwind)

## Scripts

- `yarn dev` — desarrollo
- `yarn build` — build
- `yarn preview` — preview de build
- `yarn test` — tests (Vitest + RTL)
- `yarn lint` — lint
- `yarn format` — formateo Prettier

## Estructura

- `src/pages/OcrPage.jsx` — flujo principal (upload, tags, preview, resultados)
- `src/pages/ApiHubPage.jsx` — endpoints simulados y ejemplos
- `src/components/ocr/*` — UI modular (UploadPdf, TagsManager, TemplatesPanel, etc.)
- `src/components/ui/ToastProvider.jsx` — toasts globales (ARIA live)
- `src/components/a11y/FocusTrap.jsx` — accesibilidad en modales
- `src/components/errors/ErrorBoundary.jsx` — fallback visual de errores
- `src/hooks/useDebounce.js` — debounce para buscadores

## Notas

- Tailwind 3.x con utilidades en `index.css` (`.card`, `.btn-*`, `.input`, `.badge-*`)
- Sidebar desactivado por defecto: `src/config/ui.js`

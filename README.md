## Travel Bag Checklist Generator

A professional Next.js 14 App Router experience that creates smart packing lists using static travel intelligence, Tailwind CSS UI, Zustand global state and LocalStorage persistence. The generator merges rule-based logic with curated JSON data so adding new destinations or seasons is as simple as editing a file.

### Tech Stack

- Next.js 14 (App Router) + React 18
- Tailwind CSS (v4) with custom theming + dark mode
- Zustand store persisted to LocalStorage
- Static JSON travel data (`data/travelData.json`)
- jsPDF + AutoTable for offline PDF exports

### Features

- Trip planner that captures destination, duration, trip type, weather, season, travel mode and optional gender
- Rule engine that layers universal, country, region, season, weather and transport recommendations
- Generated checklist page with category reordering, collapsible sections, add/edit/delete items, checkboxes and sticky controls
- Save trips, duplicate, delete, regenerate with new rules, export PDF and share read-only links encoded in the URL
- LocalStorage history with manual export/import support and data reset from Settings
- Shareable read-only view at `/share/[token]`

## Getting Started

```bash
npm install
npm run dev
# visit http://localhost:3000
```

### Available Scripts

- `npm run dev` – start local development server
- `npm run build` – create production build
- `npm run start` – serve the production build
- `npm run lint` – run ESLint

## Updating Travel Data

1. Open `data/travelData.json`.
2. Add new countries, regions, weather items or trip types.
3. Restart `npm run dev` (or redeploy). The generator automatically consumes the new JSON without backend changes.

## Folder Structure

```
app/
 ├─ page.tsx                # Marketing home
 ├─ plan/page.tsx           # Trip planner
 ├─ checklist/page.tsx      # Interactive checklist
 ├─ history/page.tsx        # LocalStorage history
 ├─ settings/page.tsx       # Theme + storage settings
 └─ share/[token]/page.tsx  # Read-only shared view
components/
 ├─ plan/                   # Planner UI
 ├─ checklist/              # Checklist board
 ├─ history/                # History list
 ├─ settings/               # Settings panel
 └─ layout/ui/providers     # Shell + theme
lib/
 └─ generateChecklist.ts    # Rule-based engine
store/
 └─ useTripStore.ts         # Zustand global state
utils/
 ├─ id.ts                   # ID helpers
 ├─ pdf.ts                  # jsPDF export
 ├─ share.ts                # Share link encoding
 ├─ storage.ts              # LocalStorage wrapper
 └─ styles.ts               # Class helper
data/
 └─ travelData.json         # Expandable travel intelligence
```

## Deployment

1. Set `NEXT_PUBLIC_SITE_URL` if you want absolute URLs in share links (optional, defaults to window origin).
2. Run `npm run build`.
3. Deploy the `.next` output to any Node-friendly host (Vercel, Netlify, Render, etc.).

The project is fully static + client side, so Vercel’s default Next.js deployment is recommended.

## How to Use

1. Navigate to **Plan Trip** and enter travel details.
2. Review the preview card, then continue to the **Generated Checklist**.
3. Customize items, reorder categories, save the trip, export PDF, or share the checklist link.
4. Manage saved data in **Trip History** and **Settings** (toggle theme, export or reset LocalStorage).

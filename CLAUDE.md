# OpenSheet — SaaS Sheet/Doc Creation

Next.js SaaS app for creating spreadsheets and documents. Dark blue UI.

## Stack
- Next.js (App Router, TypeScript)
- Supabase (in `supabase/` folder)
- Tailwind CSS

## Auth Flow
Unauthenticated users trying to create a sheet/doc get redirected to `/signup?then=sheet` or `/signup?then=doc`.

## Design
- Dark deep blue background (`hsl(201,100%,13%)`)
- Fullscreen background video on homepage

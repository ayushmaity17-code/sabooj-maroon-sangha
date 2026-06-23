# Sabooj Maroon Club

A premium, responsive club website built with Next.js 15, TypeScript, Tailwind CSS, Framer Motion, GSAP, Lenis and shadcn-style UI primitives.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Editing content

No backend is required. Update these files:

- `data/members.ts` — committee member identity and contact details
- `data/gallery.ts` — gallery images, categories and captions
- `data/events.ts` — event cards
- `data/timeline.ts` — journey milestones
- `data/contact.ts` — club contact details and social links

To add a gallery image:

1. Place the image in `public/gallery`.
2. Add one object to `data/gallery.ts`.

To add a committee member:

1. Place their portrait in `public/members`.
2. Add one object to `data/members.ts`.

The included names, contact details, dates and member illustrations are starter content. Replace them with official club information before launch.

## Production

```bash
npm run build
npm start
```

The project is ready for a standard Vercel import. No environment variables are required for the current static contact form. Connect the form to a provider such as Resend, Formspree or a Next.js route handler when submissions need to be delivered.

Before launch, replace `https://saboojmaroon.club` in metadata, sitemap and robots files if the production domain differs.

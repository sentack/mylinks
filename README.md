# MyLinks — Portfolio Builder

MyLinks is a Next.js starter project that helps people create beautiful, responsive portfolio microsites and shareable business cards without needing deep coding skills or lots of time. It's aimed at creators, freelancers, and professionals who want a polished online presence fast. This project is actively being developed and is still in production — expect new features and UX polish over time.

---

## 🚀 Quick pitch

If you want to publish your own portfolio or a quick digital business card but don't have the time to learn frontend coding or design, MyLinks gives you templates and a live preview system so you can customize content (bio, work, education, projects, contact, business cards) and publish a modern presence quickly.

---

## ✨ Features

### 1. Portfolio builder with 3 different layouts (1 / 2 / 3) with different visual styles
  - [`PortfolioLayout1`](components/portfolio/portfolio-layout-1.tsx)
  - [`PortfolioLayout2`](components/portfolio/portfolio-layout-2.tsx)
  - [`PortfolioLayout3`](components/portfolio/portfolio-layout-3.tsx)
- Modular sections for each portfolio
    - `HeroSection`
    - `AboutSection`
    - `ServicesSection`
    - `ExperienceSection`
    - `EducationSection`
    - `ProjectsSection`
    - `ContactSection`
### 2. Business card builder
  - 5 Prebuilt card templates: [`components/cards/card1.tsx` ... `card5.tsx`]
  - Public card route: [app/card/page.tsx](app/card/page.tsx)
  - Create and customize a sharable digital business card quickly
---

## 🗂️ Project structure (high-level)

- [app](app/) — Next.js app routes and pages (public profile route: [app/u/[username]/page.tsx](app/u/[username]/page.tsx))
- [components](components/) — UI building blocks, portfolio templates and business card templates
- [lib](lib/) — Supabase client wrappers ([lib/supabase-server.ts](lib/supabase-server.ts), [lib/supabase-browser.ts](lib/supabase-browser.ts))
- [public](public/) — static assets
- [scripts](scripts/) — SQL and helper scripts
- Next config / TypeScript / Tailwind config: [next.config.ts](next.config.ts), [tsconfig.json](tsconfig.json), [postcss.config.mjs](postcss.config.mjs)

---

## 🛠️ Getting started (local development)

1. Install dependencies
```bash
# npm
npm install
# or yarn
yarn
```
2. Add environment variables (see .env) and configure Supabase keys.
```
Run dev server
```
3. Run dev server
```
npm run dev 
```
4. Open ``` http://localhost:3000 ```
Key files to inspect while customizing:

- Public profile rendering: app/u/[username]/page.tsx
- Business card page and templates: app/card/page.tsx, components/cards/
- Layout templates: portfolio-layout-1, portfolio-layout-2, portfolio-layout-3
- Profile editor: refined-profile-form
- Supabase integration: lib/supabase-server.ts

## 💡 Tips & notes
- This project uses IntersectionObservers and small framer-motion bits in some components for entrance animations.
- Components are intentionally modular — you can reuse or remove any section.
- The app provides a simple navigation and a mobile-friendly drawer in portfolio-layout-3.

## 🤝 Contributing
Contributions are welcome. Open PRs for:
- Bug fixes
- Improved accessibility
- New layouts, card templates, or section styles
- Better Supabase integration / migrations

## ⚠️ Status
This project is actively in production. New features, visual updates, and refactors will continue to land. Expect occasional breaking changes while the UX and APIs stabilize.

## 📜 License

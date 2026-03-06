# Solo Leveling Portfolio

Solo Leveling–themed developer portfolio. React, TypeScript, Vite. Skills as shadow army, project highlights, and “summon” CTA.

**Live (staging):** [GitHub Pages](https://albertshkhyan.github.io/solo-leveling-portfolio/)

## Preview

[![Solo Leveling Portfolio — full-screen screenshot of the live staging site](src/assets/albertshkhyan.github.io_solo-leveling-portfolio_full-screen.png)](https://albertshkhyan.github.io/solo-leveling-portfolio/)

**Video demo**

<video src="src/assets/video-demo-1.mp4" controls width="720" title="Solo Leveling Portfolio — video demo"></video>

## Tech stack

- **React 18** + **TypeScript**
- **Vite 6**
- **Tailwind CSS 4**
- **Motion** (animations)

## Prerequisites

- **Node.js** 20+
- **pnpm** 9+

## Setup

```bash
pnpm install
```

## Scripts

| Command        | Description                    |
|----------------|--------------------------------|
| `pnpm run dev` | Start dev server               |
| `pnpm run build` | Production build             |
| `pnpm run preview` | Preview production build   |
| `pnpm run lint` | Run ESLint                     |
| `pnpm run lint:fix` | ESLint with auto-fix      |
| `pnpm run tsc` | Type check only                |
| `pnpm run test` | Run tests (Vitest)           |
| `pnpm run test:watch` | Tests in watch mode      |

## Build (base path)

The app is built for **GitHub Pages** by default (`base: '/solo-leveling-portfolio/'`). To build for a different base (e.g. production at root):

```bash
VITE_BASE_URL=/ pnpm run build
```

## CI/CD

- **CI** (`.github/workflows/ci.yml`): On every push and PR to `main` — lint, typecheck, test, build.
- **Deploy staging** (`.github/workflows/deploy-staging.yml`): On push to `main` — build and deploy to GitHub Pages.

## Design

Original UI design: [Figma — Implement UI Design](https://www.figma.com/design/J4pgOFI7A6wUe2q9BVPhSf/Implement-UI-Design).

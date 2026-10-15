# ISF Startup Jathara 2026 — Startup Jathara @ Dandakaranya

[![Next.js](https://img.shields.io/badge/Next.js-16.4.0-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-blue?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.x-38bdf8?style=flat&logo=tailwind-css)](https://tailwindcss.com/)

> **"The Future Grows from the Roots"**  
> Connecting Bharat's grassroots innovators, rural entrepreneurs, and tribal craft enterprises with venture capital, institutional governance, and global markets.

---

## 🏛️ Event Overview

- **Summit**: ISF Startup Jathara 2026 (Startup Jathara @ Dandakaranya)
- **Dates**: 18–20 December 2026
- **Venue**: GIET University, Gunupur, Rayagada, Odisha, India
- **Host Institution**: [GIET University](https://www.giet.edu) (State Private University)
- **Organizers**: India Startup Festival (ISF) & IncubateX Innovation Foundation

---

## 🌐 Public Website Routes

The application features 18 statically optimized, accessible public routes:

| Route | Purpose |
| :--- | :--- |
| `/` | Cinematic summit homepage with 3D perspective hero, innovation orbit, botanical timeline, thematic verticals, and GIET institutional showcase |
| `/about` | Institutional background, leadership, and mission overview |
| `/programme` | Tentative 3-day programme breakdown and track agenda |
| `/startups` | Startup showcase tracks and Junicorn rural innovation cohort information |
| `/investors` | Investor delegations, sovereign funds, and venture capital engagement |
| `/venue` | GIET University campus showcase, travel logistics, rail & flight connections |
| `/speakers` | Keynote speakers and institutional dignitaries directory |
| `/partners` | Ecosystem partners, institutional sponsors, and patronage directory |
| `/register` | Unified participation registration with role-based intake flows |
| `/faq` | Frequently asked questions regarding travel, accommodation, and pitches |
| `/contact` | Organizing committee contact information and travel helpdesk |
| `/privacy` | Data privacy guidelines and delegate confidentiality commitments |
| `/terms` | Event terms, exhibition guidelines, and participation standards |

---

## 🛠️ Technology Stack

- **Framework**: Next.js 16 (App Router with Turbopack)
- **Library**: React 19
- **Type System**: TypeScript (strict mode enabled)
- **Styling**: Tailwind CSS & Vanilla CSS with responsive design system
- **Icons**: Lucide React
- **Asset Optimization**: Next.js Image Optimization with local responsive assets

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.18+ or Node.js 20+
- npm (or yarn / pnpm)

### Installation

```bash
# Clone the repository
git clone https://github.com/themebinayak/STARTUP-JATHARA-2026.git
cd STARTUP-JATHARA-2026

# Install dependencies
npm install
```

### Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Quality Assurance & Build Checks

```bash
# Type check
npx tsc --noEmit

# Lint
npm run lint

# Production build
npm run build
```

---

## 📁 Repository Structure

```
STARTUP-JATHARA-2026/
├── public/                 # Optimized static assets & official institutional crests
│   ├── logos/              # Official GIET University crest & ISF insignia
│   └── images/             # Dandakaranya landscape & campus assets
├── src/
│   ├── app/                # Next.js App Router pages, layout, and metadata
│   ├── components/         # Modular, accessible UI components
│   │   ├── common/         # Buttons, badges, headings, institutional logo wells
│   │   ├── home/           # Hero, orbit, timeline, verticals, GIET showcase
│   │   ├── layout/         # Header, mobile drawer, footer
│   │   └── travel/         # Logistics, transit routes, interactive campus cards
│   ├── data/               # Centralized domain models and verified event data
│   └── types/              # Comprehensive TypeScript interfaces
├── docs/                   # Institutional documentation and event blueprints
├── .env.example            # Environment variable template
├── package.json            # Package manifest & scripts
└── tsconfig.json           # TypeScript configuration
```

---

## 🔒 Security & Compliance

- No credentials, tokens, or private secrets are tracked in this repository.
- Environment variables are managed via `.env.example`.
- Frontend architecture strictly maintains backend-ready boundaries for planned microservices and registration workflows.

---

## 📜 License

Proprietary — © 2026 India Startup Festival (ISF) & GIET University. All rights reserved.

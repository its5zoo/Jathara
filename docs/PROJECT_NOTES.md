# ISF STARTUP JATHARA 2026 — PROJECT NOTES & ARCHITECTURAL MANIFESTO

## 1. Executive Summary
- **Event Name**: ISF Startup Jathara 2026
- **Event Identity**: Startup Jathara @ Dandakaranya
- **Summit Dates**: 18–20 December 2026 (Welcome Dinner: Thursday evening, 17 December 2026)
- **Venue**: GIET University, Goboriguda, Po-Kharling, Gunupur, Rayagada District, Odisha 765022, India
- **Current Authorized Scope**: Public Website Frontend Only
- **Primary Focus**: Decentralizing startup opportunities to tribal and rural youth, grassroots innovation, Araku coffee networking, sector roundtables, and Dandakaranya eco-immersion.

---

## 2. Verified Facts vs. Unconfirmed / Draft Status
Per instructions, no official facts have been fabricated:
1. **Convening Ecosystem**:
   - **Organizer**: International Startup Foundation (ISF) — [https://www.isfnetwork.org/](https://www.isfnetwork.org/)
   - **Host Institution**: GIET University, Gunupur — [https://www.giet.edu/](https://www.giet.edu/)
   - **Associated Innovation Foundation**: IncubateX Innovation Foundation — [https://www.incubationx.com/](https://www.incubationx.com/)
2. **Brochure Programme Timetable**:
   - Explicitly identified as **"Tentative Programme — Subject to Change"**.
   - Verified sessions:
     - Day 1 (18 Dec): Registration & breakfast, Exhibition inauguration, Inauguration & awards, Araku Coffee breaks, Healthcare & Lifesciences Roundtable, Agri & Food Roundtable, Lunch, Selected Tribal and Rural Junicorn pitches, Araku Coffee, Global Investors & GCC Connect Roundtable, Cultural Programme & Gala Dinner.
     - Day 2 (19 Dec): Dandakaranya Forest trekking (arrangements pending).
     - Day 3 (20 Dec): Breakfast, Roundtable on strengthening rural & tribal startup ecosystem, Early lunch & departures.
3. **Transit Hubs**:
   - Visakhapatnam International Airport (VTZ) ~190 km (4.5 to 5h road transit).
   - Rayagada Railway Station (RGDA) ~75 km.
   - Palasa Railway Station (PSA) ~90 km.
   - Gunupur Railway Station (GNPR) ~4 km.
   - Jeypore Airport (PYB) ~150 km.
   - Bhubaneswar Airport (BBI) ~340 km.
   - Highway corridor: NH-326.
4. **Registration Status**:
   - Registration portal is in preparation. No fake form submission or fictitious database storage is simulated.
5. **Speakers & Dignitaries**:
   - Official roster is under steering committee review. Polished empty states are provided rather than synthetic mock personas.

---

## 3. Technology Stack & Directory Structure
- **Framework**: Next.js 16 (App Router) with React 19 and Turbopack
- **Language**: Strict TypeScript 5
- **Styling**: Tailwind CSS v4 with custom color system:
  - Deep Forest Green (`#081a14`, `#0d281e`, `#143e30`, `#256f57`)
  - Warm Ivory (`#fcfbf8`, `#f7f4ec`, `#ede7db`)
  - Muted Terracotta / Copper (`#c25e38`, `#a74e2d`)
  - Restrained Gold (`#d6b25e`, `#be9740`)
  - Slate Charcoal (`#161e1b`, `#333e3a`, `#4a5752`)
- **Icons**: Lucide React
- **Data Architecture**: Centralized typed models in `src/lib/types/index.ts` and source-of-truth datasets in `src/data/eventData.ts`.

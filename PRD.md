# RefundTimeline — PRD
# Federal & State Tax Refund Dates

---

## Overview

**Service Name:** RefundTimeline  
**Tagline:** When Will My Tax Refund Arrive? Federal & State Refund Schedule 2025  
**Domain suggestion:** refundtimeline.com (or Vercel subdomain for dev)  
**Folder:** `C:\MakingApps\260413\refund-timeline\`  
**GitHub Repo:** `taeshin11/refund-timeline` (create via `gh repo create`)  
**Deploy:** Vercel (`npx vercel --prod`)  
**Backend:** Not needed — fully static data (JSON)  

RefundTimeline is a programmatic SEO site that gives taxpayers clear, actionable refund timelines for federal (IRS) and state tax refunds. Most tax filers have one burning question after filing: "When will I get my refund?" This site provides IRS refund schedule tables, state-by-state processing times, and a simple estimator. Zero API cost — all data is static JSON derived from publicly available IRS publications and state revenue department pages.

---

## Target Users & Pain Points

| User Segment | Pain Point |
|---|---|
| W-2 filers | Filed taxes, don't know when to expect direct deposit or check |
| State tax filers | Confused about state refund timing vs federal |
| Late filers | Want to know if late filing affects refund timing |
| Paper filers | Refund takes 6-8 weeks — want to know exact expectations |
| EITC/ACTC filers | IRS holds these refunds until mid-Feb by law; users don't know why |

**Core user intent:** "When will I get my tax refund 2025?" / "IRS refund schedule 2025" / "California tax refund how long"

---

## Core Features

| ID | Feature | Priority | Status |
|---|---|---|---|
| F01 | IRS refund schedule table (by filing date + method) | P0 | TODO |
| F02 | State refund pages `/states/[state]` — per-state timelines | P0 | TODO |
| F03 | Refund estimator `/calculator` — estimate refund amount + date | P0 | TODO |
| F04 | FAQ pages `/faq/[slug]` — common refund questions | P0 | TODO |
| F05 | Filing status filter (Single, MFJ, MFS, HoH) on estimator | P1 | TODO |
| F06 | EITC/ACTC special notice section | P0 | TODO |
| F07 | Refund calendar view (visual timeline) | P1 | TODO |
| F08 | "Check your refund status" link buttons to IRS Where's My Refund | P0 | TODO |
| F09 | State direct links to state refund check tools | P0 | TODO |
| F10 | Visitor counter (today + total) in footer | P0 | TODO |
| F11 | i18n (8 languages) via next-intl | P0 | TODO |
| F12 | Google Sheets webhook on every user interaction | P0 | TODO |
| F13 | Adsterra ad placements (Social Bar, Native Banner, Display) | P0 | TODO |
| F14 | Schema.org JSON-LD (FAQPage, HowTo, BreadcrumbList, WebApplication) | P0 | TODO |
| F15 | Sitemap.xml + robots.txt auto-generated | P0 | TODO |
| F16 | hreflang tags for all 8 language variants | P0 | TODO |
| F17 | research_history/ folder with milestone logs | P0 | TODO |
| F18 | Tax year selector (2024 taxes, 2023 taxes) | P1 | TODO |
| F19 | Push notification opt-in (web push via OneSignal free tier) | P2 | TODO |

---

## Tech Stack

```
Framework:        Next.js 14 (App Router, SSG — fully static, no server needed)
Styling:          Tailwind CSS v3
i18n:             next-intl
Data:             Static JSON files in /data/ (IRS schedule + state data)
Icons:            Lucide React
Deployment:       Vercel (npx vercel --prod)
Repo:             GitHub (gh repo create taeshin11/refund-timeline --public)
Analytics:        Vercel Analytics (free)
Push:             OneSignal free tier (optional, P2)
Visitor Counter:  Vercel KV (free) or simple localStorage + GitHub Gist counter
```

### Environment Variables (`.env.local`)
```
NEXT_PUBLIC_GS_WEBHOOK_URL=          # Google Apps Script webhook URL
NEXT_PUBLIC_ADSTERRA_SOCIAL_BAR=     # TODO: add when received
NEXT_PUBLIC_ADSTERRA_NATIVE=         # TODO: add when received
NEXT_PUBLIC_ADSTERRA_DISPLAY=        # TODO: add when received
NEXT_PUBLIC_ONESIGNAL_APP_ID=        # Optional — OneSignal push
```

---

## Data Sources (Free — All Static JSON)

### 1. IRS Refund Schedule (`data/irs-schedule.json`)
Based on publicly published IRS processing timelines:
```json
{
  "tax_year": 2024,
  "updated": "2025-01-15",
  "schedules": [
    {
      "filing_date_range_start": "2025-01-27",
      "filing_date_range_end": "2025-02-01",
      "direct_deposit_expected": "2025-02-11",
      "paper_check_expected": "2025-02-18",
      "notes": "Standard processing, e-file + direct deposit"
    }
  ],
  "eitc_actc_hold_until": "2025-02-27",
  "paper_return_weeks": 6,
  "amended_return_weeks": 16,
  "processing_time_efile_dd": "21 days",
  "processing_time_efile_check": "28 days",
  "processing_time_paper": "6-8 weeks"
}
```

Fill the schedule JSON with ~25 date range rows covering the entire filing season (Jan 27 – April 15).

### 2. State Data (`data/states/`)
One JSON file per state:
```json
{
  "state": "California",
  "slug": "california",
  "abbreviation": "CA",
  "agency": "Franchise Tax Board",
  "agency_url": "https://www.ftb.ca.gov",
  "check_refund_url": "https://www.ftb.ca.gov/refund/",
  "processing_time_efile": "3 weeks",
  "processing_time_paper": "4-6 weeks",
  "direct_deposit_available": true,
  "state_tax_rate_range": "1% - 13.3%",
  "filing_deadline_2025": "2025-04-15",
  "extension_deadline": "2025-10-15",
  "notes": "FTB typically processes e-filed returns faster during peak season.",
  "faqs": [
    {
      "q": "How do I check my California tax refund status?",
      "a": "Visit ftb.ca.gov/refund and enter your SSN and the refund amount."
    }
  ]
}
```

Create JSON files for all 50 states + DC. States without income tax (FL, TX, WA, etc.) get a page noting no state income tax.

### 3. FAQ Data (`data/faqs.json`)
Static FAQ entries covering:
- Why is my refund delayed?
- What does "Your return is still being processed" mean?
- Why was my refund lower than expected?
- How do I check my refund status?
- When does the IRS start accepting returns?
- What is the EITC refund hold rule?
- Can I get my refund faster?
- What if I filed a paper return?
- How long does a state refund take?
- What is Where's My Refund?

### 4. Tax Brackets (`data/tax-brackets-2024.json`)
For the refund estimator calculator:
```json
{
  "year": 2024,
  "standard_deductions": {
    "single": 14600,
    "married_filing_jointly": 29200,
    "married_filing_separately": 14600,
    "head_of_household": 21900
  },
  "brackets": {
    "single": [
      { "rate": 0.10, "min": 0, "max": 11600 },
      { "rate": 0.12, "min": 11600, "max": 47150 }
    ]
  }
}
```

---

## Page Structure & SEO

### Routes

| Route | Purpose | Primary Keywords |
|---|---|---|
| `/` | Homepage — IRS schedule table + filing status | "tax refund schedule 2025", "when will I get my tax refund" |
| `/states` | All states index | "state tax refund schedule" |
| `/states/[state]` | Per-state refund info | "[state] tax refund schedule", "[state] tax refund how long" |
| `/calculator` | Refund amount + date estimator | "tax refund calculator 2025", "how much refund will I get" |
| `/faq` | FAQ index | "tax refund FAQ", "tax refund questions" |
| `/faq/[slug]` | Individual FAQ answers | long-tail: "why is my refund delayed", "irs refund still processing" |
| `/eitc-actc` | EITC/ACTC hold explained | "EITC refund date 2025", "earned income credit refund" |
| `/where-is-my-refund` | Guide to IRS WMR tool | "where is my refund", "IRS where's my refund" |
| `/amended-return` | Amended return timeline | "amended tax return refund time", "1040X refund schedule" |
| `/sitemap.xml` | Auto-generated | — |
| `/robots.txt` | Allow all | — |

### SEO Implementation
```tsx
// generateMetadata for /states/[state]:
export async function generateMetadata({ params }) {
  const state = getStateBySlug(params.state);
  return {
    title: `${state.name} Tax Refund Schedule 2025 — Processing Time | RefundTimeline`,
    description: `${state.name} state tax refund typically takes ${state.processing_time_efile} for e-file. Check status at ${state.agency}. Full 2025 schedule inside.`,
    alternates: {
      canonical: `https://refundtimeline.com/states/${params.state}`,
      languages: {
        'en': `/en/states/${params.state}`,
        'ko': `/ko/states/${params.state}`,
        'ja': `/ja/states/${params.state}`,
        'zh': `/zh/states/${params.state}`,
        'es': `/es/states/${params.state}`,
        'fr': `/fr/states/${params.state}`,
        'de': `/de/states/${params.state}`,
        'pt': `/pt/states/${params.state}`,
      }
    }
  }
}
```

### Schema.org JSON-LD
```json
// Homepage — HowTo schema:
{
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Check Your IRS Tax Refund Status",
  "step": [
    { "@type": "HowToStep", "text": "File your federal tax return electronically" },
    { "@type": "HowToStep", "text": "Wait 24 hours after e-filing" },
    { "@type": "HowToStep", "text": "Visit IRS Where's My Refund tool" },
    { "@type": "HowToStep", "text": "Enter your SSN, filing status, and exact refund amount" }
  ],
  "totalTime": "PT5M"
}

// FAQ pages — FAQPage schema:
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "When will I get my 2025 tax refund?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most e-filed returns with direct deposit are processed within 21 days..."
      }
    }
  ]
}

// Calculator — WebApplication schema
// State pages — BreadcrumbList + FAQPage
```

### Sitemap Auto-generation
```ts
// Covers:
// - All 50 states + DC
// - FAQ slugs (10+)
// - Static pages: /, /calculator, /faq, /eitc-actc, /where-is-my-refund, /amended-return
// - All × 8 locales
```

---

## UI/UX Guidelines

### Color Palette (Soft Pastel — Trust/Government-adjacent)
```css
--bg-primary:       #fef9f0;   /* warm cream — approachable, not clinical */
--bg-card:          #ffffff;
--bg-accent:        #fff7ed;   /* pale amber */
--bg-highlight:     #fde68a;   /* yellow — for important notices */
--bg-success:       #d1fae5;   /* green — refund received state */
--bg-warning:       #fef3c7;   /* yellow — pending/processing state */
--bg-info:          #dbeafe;   /* blue — informational */
--text-primary:     #1c1917;
--text-secondary:   #78716c;
--accent-blue:      #3b82f6;   /* IRS-adjacent blue for trust */
--border:           #e7e5e4;
```

### Layout
- **Hero:** "When Will My Refund Arrive?" with prominent filing date selector
- **Main schedule table:** Filing Date Range | E-file DD | E-file Check | Paper Return
- Highlight current week's row in the table
- **IRS status check CTA:** Prominent button "Check IRS Refund Status →" (external link to IRS WMR)
- **State tab/selector:** Quick dropdown to jump to any state
- **EITC/ACTC notice:** Warning banner for users with earned income credit
- **FAQ accordion** below schedule table
- **Footer:** Visitor counter, last updated date, disclaimer, IRS links

### Key UI Components
```
components/
  RefundScheduleTable.tsx      — main IRS schedule table (highlight current row)
  FilingDatePicker.tsx         — user selects their filing date → shows row
  StateSelector.tsx            — dropdown/search for state pages
  RefundStatusCard.tsx         — shows expected range for a filing date
  RefundCalendar.tsx           — visual calendar with color-coded refund windows
  RefundEstimator.tsx          — calculator: income + deductions → refund amount + date
  EITCNotice.tsx               — banner for EITC/ACTC holders
  FAQAccordion.tsx             — expandable FAQ list
  StateRefundCard.tsx          — per-state processing time card
  RefundStatusButton.tsx       — CTA button linking to IRS/state refund check tools
  ProgressTimeline.tsx         — visual step timeline (Filed → Accepted → Processed → Sent)
  VisitorCounter.tsx
  LanguageSwitcher.tsx
  Breadcrumb.tsx
  SchemaLD.tsx
  AdPlaceholder.tsx
```

### UX Flow — Homepage
1. User lands on `/`
2. Sees schedule table prominently (fold within view on mobile)
3. Enters their filing date → row highlights
4. Sees expected deposit date for their situation
5. Clicks "Check My Refund Status" → opens IRS WMR in new tab (event tracked)
6. Scrolls to see state selector
7. Selects their state → sees state page summary
8. FAQ accordion below for common questions

---

## i18n Requirements

**Languages:** en, ko, ja, zh, es, fr, de, pt

### Translation Keys
```json
{
  "nav.home": "Home",
  "nav.states": "States",
  "nav.calculator": "Calculator",
  "nav.faq": "FAQ",
  "hero.title": "When Will My Tax Refund Arrive?",
  "hero.subtitle": "2025 IRS & State Tax Refund Schedule",
  "hero.filingDatePrompt": "Enter your filing date:",
  "schedule.title": "IRS Refund Schedule 2025",
  "schedule.filingDateRange": "Filing Date Range",
  "schedule.directDeposit": "Direct Deposit",
  "schedule.paperCheck": "Paper Check",
  "schedule.paperReturn": "Paper Return",
  "notice.eitc": "EITC/ACTC Notice: The IRS cannot issue these refunds before mid-February by law.",
  "cta.checkIRS": "Check IRS Refund Status",
  "cta.checkState": "Check {state} Refund Status",
  "calculator.title": "Tax Refund Estimator",
  "calculator.filingStatus": "Filing Status",
  "calculator.income": "Gross Income",
  "calculator.withholding": "Federal Taxes Withheld",
  "calculator.deductions": "Deductions",
  "calculator.estimate": "Estimate My Refund",
  "calculator.result": "Estimated Refund",
  "faq.title": "Frequently Asked Questions",
  "state.processingEfile": "E-file Processing Time",
  "state.processingPaper": "Paper Processing Time",
  "state.checkStatus": "Check Refund Status",
  "state.filingDeadline": "2025 Filing Deadline",
  "footer.visitorToday": "Visitors today",
  "footer.visitorTotal": "Total visitors",
  "footer.disclaimer": "This site provides estimates based on publicly available IRS data. Actual processing times may vary.",
  "footer.lastUpdated": "Last updated"
}
```

---

## Ad Integration (Adsterra)

```jsx
// 1. Social Bar — in <head> (app/layout.tsx)
// TODO: Add Adsterra Social Bar script when key received
// <Script src="https://[social-bar-url]" strategy="afterInteractive" />

// 2. Native Banner — below hero (before schedule table)
<div id="adsterra-native" className="my-6 container mx-auto px-4">
  {/* TODO: Replace with Adsterra Native Banner code when key received */}
  <div className="border-2 border-dashed border-amber-200 rounded-xl p-6 text-center text-amber-300 text-sm bg-amber-50">
    [Adsterra Native Banner]
  </div>
</div>

// 3. Display Banner — mid-page (between table and FAQ)
<div id="adsterra-display" className="my-8 flex justify-center">
  {/* TODO: Add Adsterra Display code when key received */}
  <div className="border-2 border-dashed border-gray-200 rounded-lg p-4 text-center text-gray-300 w-full max-w-3xl text-sm">
    [Adsterra Display — 728×90 / 320×50 mobile]
  </div>
</div>
```

---

## Google Sheets Webhook

### Tracked Events
- `page_view` — every route load
- `filing_date_select` — user picks their filing date in schedule table
- `irs_check_click` — "Check IRS Refund Status" CTA clicked
- `state_check_click` — state refund status link clicked
- `calculator_submit` — refund estimator submitted
- `faq_expand` — FAQ item expanded
- `state_page_view` — state detail page viewed (include state name in detail)
- `language_switch`

### Apps Script (same pattern as other projects)
```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet()
    .getSheetByName('Events') || SpreadsheetApp.getActiveSpreadsheet().insertSheet('Events');
  const data = JSON.parse(e.postData.contents);
  sheet.appendRow([
    new Date(), data.event_type, data.page, 
    data.locale, data.detail, data.referrer, data.user_agent
  ]);
  return ContentService.createTextOutput('OK');
}
```

---

## Visitor Counter

```ts
// lib/visitorCounter.ts — same pattern as other projects
// localStorage for today's count (date-keyed)
// Vercel KV for total count
// API route: POST /api/visitor
```

Footer display:
```jsx
<div className="text-xs text-stone-400 text-center mt-4 pb-2">
  <span>{t('footer.visitorToday')}: <strong>{today}</strong></span>
  {' · '}
  <span>{t('footer.visitorTotal')}: <strong>{total}</strong></span>
</div>
```

---

## Milestones

### M1 — Project Scaffold (Day 1)
**Tasks:**
- [ ] `gh repo create taeshin11/refund-timeline --public --clone`
- [ ] `npx create-next-app@latest . --typescript --tailwind --app`
- [ ] `npm install next-intl lucide-react`
- [ ] Create `feature_list.json`, `claude-progress.txt`, `init.sh`
- [ ] Create `research_history/` + `M1-scaffold.md`
- [ ] Set up Tailwind with warm cream palette
- [ ] Create base `app/layout.tsx`
- [ ] Create `.env.local.example`

**Commit:** `M1: scaffold — Next.js 14, Tailwind cream palette, next-intl`
```bash
git add -A && git commit -m "M1: scaffold — Next.js 14, Tailwind cream palette, next-intl" && git push origin main
```

---

### M2 — Static Data (Day 2)
**Tasks:**
- [ ] Create `data/irs-schedule.json` — full 2025 filing season schedule (Jan 27–Apr 15, 25 rows)
- [ ] Create `data/states/` — JSON files for all 50 states + DC
- [ ] Create `data/faqs.json` — 15+ FAQ entries with slugs
- [ ] Create `data/tax-brackets-2024.json` — all filing statuses + brackets
- [ ] Create `lib/schedule.ts` — helpers to query schedule by filing date
- [ ] Create `lib/states.ts` — load + query state data
- [ ] Create `lib/faqs.ts` — load + query FAQ data
- [ ] Create `app/api/visitor/route.ts`
- [ ] Log to `research_history/M2-data.md`

**Commit:** `M2: static data — IRS schedule, 51 state files, FAQs, tax brackets`
```bash
git add -A && git commit -m "M2: static data — IRS schedule, 51 state files, FAQs, tax brackets" && git push origin main
```

---

### M3 — Homepage & Core UI (Day 3)
**Tasks:**
- [ ] Build `app/[locale]/page.tsx` — homepage with schedule table
- [ ] Build `RefundScheduleTable.tsx` — table with filing date row highlighting
- [ ] Build `FilingDatePicker.tsx` — date input that highlights corresponding table row
- [ ] Build `RefundStatusCard.tsx` — shows result for selected date
- [ ] Build `EITCNotice.tsx` — warning banner
- [ ] Build `RefundCalendar.tsx` — visual calendar component
- [ ] Build `FAQAccordion.tsx`
- [ ] Create all 8 locale message files
- [ ] Implement `LanguageSwitcher.tsx`, `VisitorCounter.tsx`
- [ ] Add Adsterra placeholder divs
- [ ] Wire Google Sheets webhook
- [ ] Log to `research_history/M3-homepage.md`

**Commit:** `M3: homepage — schedule table, date picker, FAQ accordion, i18n, ads`
```bash
git add -A && git commit -m "M3: homepage — schedule table, date picker, FAQ accordion, i18n, ads" && git push origin main
```

---

### M4 — Programmatic SEO Pages (Day 4)
**Tasks:**
- [ ] Build `/states` index page
- [ ] Build `/states/[state]` — `generateStaticParams` for all 51 entries
- [ ] Build `/faq` index page
- [ ] Build `/faq/[slug]` — `generateStaticParams` from faqs.json
- [ ] Build `/eitc-actc` deep-dive page
- [ ] Build `/where-is-my-refund` guide page
- [ ] Build `/amended-return` page
- [ ] Add `generateMetadata()` with hreflang to all pages
- [ ] Add Schema.org JSON-LD (HowTo, FAQPage, BreadcrumbList)
- [ ] Generate `app/sitemap.ts` + `app/robots.ts`
- [ ] Log to `research_history/M4-seo-pages.md`

**Commit:** `M4: programmatic SEO — states, FAQs, special pages, sitemap, schema`
```bash
git add -A && git commit -m "M4: programmatic SEO — states, FAQs, special pages, sitemap, schema" && git push origin main
```

---

### M5 — Calculator & Extras (Day 5)
**Tasks:**
- [ ] Build `/calculator` — tax refund amount estimator
- [ ] Implement `RefundEstimator.tsx` with tax bracket logic
- [ ] Add filing status selector (Single/MFJ/MFS/HoH)
- [ ] Build `ProgressTimeline.tsx` — visual step tracker
- [ ] Add `StateSelector.tsx` dropdown for quick state navigation
- [ ] Add tax year selector (2024 / 2023 returns)
- [ ] Log to `research_history/M5-calculator.md`

**Commit:** `M5: calculator, timeline component, state selector, tax year filter`
```bash
git add -A && git commit -m "M5: calculator, timeline component, state selector, tax year filter" && git push origin main
```

---

### M6 — Deploy & QA (Day 6)
**Tasks:**
- [ ] `npx vercel --prod`
- [ ] Verify all 51 state pages render
- [ ] Verify all FAQ pages render
- [ ] Test filing date picker interaction
- [ ] Verify sitemap.xml completeness
- [ ] Validate Schema.org JSON-LD
- [ ] Verify all 8 locales
- [ ] Test Google Sheets webhook events
- [ ] Log to `research_history/M6-deploy.md`

**Commit:** `M6: production deploy — Vercel, all QA passed`
```bash
git add -A && git commit -m "M6: production deploy — Vercel, all QA passed" && git push origin main
```

---

## File Structure

```
refund-timeline/
├── app/
│   ├── [locale]/
│   │   ├── page.tsx                    # Homepage
│   │   ├── states/
│   │   │   ├── page.tsx                # All states
│   │   │   └── [state]/
│   │   │       └── page.tsx
│   │   ├── faq/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   │       └── page.tsx
│   │   ├── calculator/
│   │   │   └── page.tsx
│   │   ├── eitc-actc/
│   │   │   └── page.tsx
│   │   ├── where-is-my-refund/
│   │   │   └── page.tsx
│   │   └── amended-return/
│   │       └── page.tsx
│   ├── api/
│   │   └── visitor/
│   │       └── route.ts
│   ├── layout.tsx
│   ├── sitemap.ts
│   └── robots.ts
├── components/
│   ├── RefundScheduleTable.tsx
│   ├── FilingDatePicker.tsx
│   ├── RefundStatusCard.tsx
│   ├── RefundCalendar.tsx
│   ├── RefundEstimator.tsx
│   ├── EITCNotice.tsx
│   ├── FAQAccordion.tsx
│   ├── StateRefundCard.tsx
│   ├── StateSelector.tsx
│   ├── RefundStatusButton.tsx
│   ├── ProgressTimeline.tsx
│   ├── VisitorCounter.tsx
│   ├── LanguageSwitcher.tsx
│   ├── Breadcrumb.tsx
│   ├── SchemaLD.tsx
│   └── ads/
│       ├── AdsterraSocialBar.tsx
│       ├── AdsterraNativeBanner.tsx
│       └── AdsterraDisplay.tsx
├── lib/
│   ├── schedule.ts
│   ├── states.ts
│   ├── faqs.ts
│   ├── taxBrackets.ts
│   ├── analytics.ts
│   └── visitorCounter.ts
├── data/
│   ├── irs-schedule.json
│   ├── faqs.json
│   ├── tax-brackets-2024.json
│   └── states/
│       ├── alabama.json
│       ├── alaska.json
│       ├── arizona.json
│       ├── ... (all 51)
│       └── wyoming.json
├── messages/
│   ├── en.json
│   ├── ko.json
│   ├── ja.json
│   ├── zh.json
│   ├── es.json
│   ├── fr.json
│   ├── de.json
│   └── pt.json
├── research_history/
│   ├── M1-scaffold.md
│   ├── M2-data.md
│   ├── M3-homepage.md
│   ├── M4-seo-pages.md
│   ├── M5-calculator.md
│   └── M6-deploy.md
├── feature_list.json
├── claude-progress.txt
├── init.sh
├── .env.local.example
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## Harness Files Spec

### `feature_list.json`
```json
{
  "project": "refund-timeline",
  "version": "1.0.0",
  "features": [
    { "id": "F01", "name": "IRS refund schedule table", "priority": "P0", "status": "TODO", "milestone": "M3" },
    { "id": "F02", "name": "State refund pages", "priority": "P0", "status": "TODO", "milestone": "M4" },
    { "id": "F03", "name": "Refund estimator calculator", "priority": "P0", "status": "TODO", "milestone": "M5" },
    { "id": "F04", "name": "FAQ pages", "priority": "P0", "status": "TODO", "milestone": "M4" },
    { "id": "F05", "name": "Filing status filter", "priority": "P1", "status": "TODO", "milestone": "M5" },
    { "id": "F06", "name": "EITC/ACTC notice section", "priority": "P0", "status": "TODO", "milestone": "M3" },
    { "id": "F07", "name": "Refund calendar view", "priority": "P1", "status": "TODO", "milestone": "M3" },
    { "id": "F08", "name": "IRS WMR link buttons", "priority": "P0", "status": "TODO", "milestone": "M3" },
    { "id": "F09", "name": "State refund check links", "priority": "P0", "status": "TODO", "milestone": "M4" },
    { "id": "F10", "name": "Visitor counter", "priority": "P0", "status": "TODO", "milestone": "M3" },
    { "id": "F11", "name": "i18n 8 languages", "priority": "P0", "status": "TODO", "milestone": "M3" },
    { "id": "F12", "name": "Google Sheets webhook", "priority": "P0", "status": "TODO", "milestone": "M3" },
    { "id": "F13", "name": "Adsterra ads", "priority": "P0", "status": "TODO", "milestone": "M3" },
    { "id": "F14", "name": "Schema.org JSON-LD", "priority": "P0", "status": "TODO", "milestone": "M4" },
    { "id": "F15", "name": "Sitemap + robots.txt", "priority": "P0", "status": "TODO", "milestone": "M4" },
    { "id": "F16", "name": "hreflang tags", "priority": "P0", "status": "TODO", "milestone": "M4" },
    { "id": "F17", "name": "research_history logs", "priority": "P0", "status": "TODO", "milestone": "M1" },
    { "id": "F18", "name": "Tax year selector", "priority": "P1", "status": "TODO", "milestone": "M5" },
    { "id": "F19", "name": "Web push notifications", "priority": "P2", "status": "TODO", "milestone": "M6" }
  ]
}
```

### `claude-progress.txt`
```
# RefundTimeline — Claude Progress Log
# Format: [TIMESTAMP] [MILESTONE] [STATUS] [NOTES]
# Statuses: STARTED | IN_PROGRESS | COMPLETE | BLOCKED

[START] Project initialized
```

### `init.sh`
```bash
#!/usr/bin/env bash
set -e

echo "=== RefundTimeline Init Script ==="

gh repo create taeshin11/refund-timeline --public --clone || echo "Repo may already exist"
npm install
cp .env.local.example .env.local || true
mkdir -p research_history data/states

git add -A
git commit -m "M1: scaffold — Next.js 14, Tailwind cream palette, next-intl" || true
git push origin main || true

echo "=== Init complete ==="
echo "Steps:"
echo "  1. Deploy Google Apps Script webhook, add URL to .env.local"
echo "  2. Run: npx vercel --prod"
```

---

## Additional Notes for Claude Code

1. **IRS WMR link:** `https://www.irs.gov/refunds` — always open in new tab with `target="_blank" rel="noopener noreferrer"`

2. **Schedule table logic:** The `FilingDatePicker` component should accept a date input and use a binary search or linear scan over `irs-schedule.json` to find the matching row. Highlight that row in the table with a soft yellow background. Show the expected deposit date in a prominent `RefundStatusCard`.

3. **States without income tax:** Alaska, Florida, Nevada, New Hampshire (interest/dividends only), South Dakota, Tennessee, Texas, Washington, Wyoming. Their state pages should say "No state income tax — no state refund applicable" with helpful info.

4. **EITC legal hold:** Per the PATH Act, the IRS cannot issue EITC/ACTC refunds before February 15. The `EITCNotice` component should always be visible on the homepage and calculator page.

5. **Tax refund estimator formula:**
   ```ts
   function estimateRefund(grossIncome: number, withholding: number, filingStatus: FilingStatus, useStandardDeduction: boolean) {
     const stdDed = STANDARD_DEDUCTIONS[filingStatus];
     const taxableIncome = Math.max(0, grossIncome - stdDed);
     const taxOwed = calculateTaxFromBrackets(taxableIncome, filingStatus);
     const refund = withholding - taxOwed;
     return { refund, taxOwed, taxableIncome };
   }
   ```

6. **SEO tip:** The `/where-is-my-refund` page targets extremely high-volume queries. Include the exact IRS tool URL, step-by-step instructions with screenshots placeholder, and a clear note that this site is NOT affiliated with the IRS.

7. **Content freshness:** Include "Last Updated: [date from data file]" prominently at the top of the schedule table. Update the JSON files at the start of each tax season (January).

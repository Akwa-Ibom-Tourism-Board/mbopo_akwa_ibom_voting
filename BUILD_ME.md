# BUILD_ME — Mbopo Akwa Ibom Voting

## What this is

A new, standalone frontend — **Mbopo Akwa Ibom Voting** — built in this repo
(`mbopo_akwa_ibom_voting`), a sibling of `mbopo_akwa_ibom_design` (the main
Mbopo Akwa Ibom platform) and `mbopo_akwa_ibom_backend`. It lets the public
browse picture news, vote for Mbopo Akwa Ibom candidates (paid votes, ₦100
each), and see the pageant's sponsors.

**This is a frontend-only build for now.** Every page must work end-to-end
against **local dummy data** — no real API calls, no real payment gateway.
Structure the data layer (see "Dummy data, built to be swapped later" below)
so that wiring the real backend and a real payment gateway afterward is a
small, contained change, not a rewrite. Do not wait on backend availability
to build this; a separate pass will wire it up once the UI is approved.

This document is the full spec. Build directly from it. Where something is
ambiguous, an explicit **Assumption:** is called out — if any of those are
wrong, flag it rather than silently guessing further.

---

## 1. Visual identity — reuse, don't reinvent

This app must look, structurally and visually, like a natural extension of
`mbopo_akwa_ibom_design` — same brand, same chrome, same component
language. Concretely:

- **Copy these wholesale** from `../mbopo_akwa_ibom_design/src/` into this
  repo, unmodified except where this doc says otherwise:
  - `theme/` (all of it — `colors.ts`, `theme.ts`, `GlobalStyle.ts`,
    `media.ts`, `utils.ts`, `useTheme.ts`, `styled.d.ts`, `animations.ts`,
    `index.ts`). **Do not introduce any new color tokens.** Every color used
    anywhere in this app must come from `theme.colors.*` / `theme.gradients.*`
    as already defined there — this is a hard requirement, not a style
    preference.
  - `shared/ui/` — the full primitive set (`button`, `card`, `dialog`,
    `tooltip`, `toast`, `input`, `password-input`, `textarea`, `select`,
    `combobox`, `dropdown-menu`, `checkbox`, `label`, `avatar`, `switch`,
    `otp-input`, `sonner`) and its `index.ts` barrel. Not all of these will
    be used, but copy the set so the component vocabulary matches exactly —
    building a second, slightly-different `Button`/`Card`/`Select` would be
    the wrong outcome here.
  - `shared/components/Navbar.tsx` + `Navbar.styles.ts`, `Footer.tsx` +
    `Footer.styles.ts`, `PageShell.tsx`, `PageHeroBanner.tsx` +
    `.styles.ts`, `Container.tsx`, `Reveal.tsx` — adapt per §2 below, but
    these are the foundation, not references to rebuild from scratch.
  - Brand assets from `src/assets/`: `akwa-ibom-logo-main.png`,
    `arise-logo-main.png`, `mbopo-logo-dark.webp` (same logos, same places —
    navbar brand cluster, footer).
  - Fonts: same Google Fonts pair, Montserrat (body) + Playfair Display
    (display/headings), loaded the same way (see `index.html` in the design
    repo for the exact `<link>` tags).
- **Reference, don't necessarily copy, for the "beautiful card" visual
  language**: `src/features/home/components/EligibilitySection.styles.ts`
  and `RewardsSection.styles.ts` for how this codebase already does
  card panels, soft shadows, and pill badges — match that polish level.

The result should be indistinguishable, chrome-wise, from a page living
inside the main Mbopo Akwa Ibom app — a visitor should never feel like
they've landed on a different, less-finished site.

---

## 2. Navbar & Footer — adapted, not identical

**Navbar**: same structural component (`HeaderFrame` fixed at the top,
logo cluster, centered pill nav links, mobile hamburger drawer below
1024px — see `Navbar.styles.ts` in the design repo for the exact
breakpoints/measurements), but:

- Nav tabs are exactly: **Picture News**, **Voting**, **Sponsors**.
- **Drop the `DisclaimerStrip`** (the orange "Applying is free..." bar) —
  its copy is specific to the registration flow and doesn't apply here.
  The header is just the logo row + nav links, no strip above it.
- Logo cluster (Akwa Ibom State + ARISE government logos) stays, linking
  home (`/`) same as today.
- No "Sign In" / "Register Now" CTA is required in the nav — this is a
  public voting site, not the applicant portal. *Assumption: voting and
  browsing require no login at all (see §6 for how a voter is identified
  instead). If login should actually be required, say so before this is
  built further.*
- Since there's no `DisclaimerStrip`, the header is shorter and more
  predictable — you likely don't need the dynamic `--site-header-height`
  ResizeObserver machinery the main app uses to clear a variable-height
  header (that complexity exists there specifically because the strip can
  wrap to two lines). A fixed, single-breakpoint-aware top padding on hero/
  banner content is fine here — just make sure nothing on any page starts
  underneath the fixed nav on any screen size (this has bitten the main
  app before — don't repeat it).

**Footer**: same component, same three logos, same bottom bar
(`© {year} Mbopo Akwa Ibom. All rights reserved.` / `Beauty with Purpose`).
Update the link columns to this app's own pages instead of the main app's:

- "Explore" column: Picture News, Voting, Sponsors.
- "Mbopo Akwa Ibom" column: link out to the main platform's home page and
  its Terms & Privacy pages (absolute URLs, since they're a separate
  deployment) — *Assumption: the main site's production URL isn't known
  yet; use a placeholder constant (`MAIN_SITE_URL`) in one place so it's a
  one-line change once the real domain is known.*
- Keep the same contact line and social row treatment as the reference
  Footer.

---

## 3. Tech stack & project setup

Match `mbopo_akwa_ibom_design` exactly — same tooling, same versions where
it matters, so this codebase feels like the same team wrote it:

- **React 19** + **TypeScript** (strict) + **Vite 5**
- **styled-components v6** for all styling (no CSS modules, no Tailwind)
- **react-router-dom v6** for routing
- **@tanstack/react-query v5** for all data fetching (even against dummy
  data — see §6, this is what makes the later backend swap cheap)
- **react-hook-form + zod** (`@hookform/resolvers`) for the custom
  vote-quantity input and any other form
- **lucide-react** for icons
- **sonner** for toasts (reuse `shared/ui/sonner` as copied)
- Path alias `@/*` → `./src/*` (copy `vite-tsconfig-paths`, the
  `tsconfig.json` `paths` entry, and `vite.config.ts` from the design repo
  verbatim)
- Same `tsconfig.json` strictness: `strict: true`,
  `noUncheckedIndexedAccess: true`, `noFallthroughCasesInSwitch: true`,
  `noImplicitOverride: true`, `noImplicitReturns: true`,
  `noUncheckedSideEffectImports: true` — copy it over rather than
  reconstructing it, the exact flags matter for consistency.
- Same `eslint.config.js` (flat config, `typescript-eslint` +
  `eslint-plugin-react-hooks` + `eslint-plugin-react-refresh` +
  `eslint-plugin-prettier`/`eslint-config-prettier`) and `prettier` setup,
  copied over. `npm run lint` (`eslint .`, zero warnings) and
  `npx tsc --noEmit` must both be clean before calling any stage done —
  same bar as the main app.
- `package.json` scripts identical to the design repo:
  `dev` / `build` / `build:dev` / `preview` / `lint` / `format`.

No new dependency should be introduced casually — if a real need comes up
(e.g. a date-formatting helper), `date-fns` is already an approved choice
in the ecosystem (used by the design repo); prefer what's already proven
there over adding something new.

---

## 4. Architecture — feature-based, same shape as the main app

```
src/
  app/                        # App.tsx, routes.tsx, providers.tsx, ErrorBoundary, ScrollRestoration
  assets/                     # logos (copied), any candidate/sponsor placeholder images
  features/
    picture-news/
      api/                    # getPictureNewsList(), getPictureNewsItem() — dummy-backed, see §6
      components/             # NewsCard, NewsGrid, NewsGallery, etc.
      pages/                  # PictureNewsListPage, PictureNewsDetailPage
      types/                  # PictureNewsItem, etc.
      data/                   # mock-news.ts — the dummy dataset itself
    voting/
      api/                    # getCandidates(), getCandidate(id), getVoteTiers(), submitVotePurchase()
      components/             # CandidateCard, CandidateGrid, SearchBar, LgaFilter, VoteTierPicker, VoteCountBadge, ScoreDisclaimerBadge
      pages/                  # CandidatesPage, CandidateDetailPage, VotePurchasePage, VoteConfirmationPage
      types/                  # Candidate, VoteTier, VotePurchase
      data/                   # mock-candidates.ts, vote-tiers.ts
    sponsors/
      api/                    # getSponsors()
      components/             # SponsorCard, SponsorGrid
      pages/                  # SponsorsPage
      types/                  # Sponsor
      data/                   # mock-sponsors.ts
  shared/
    components/               # Navbar, Footer, PageShell, PageHeroBanner, Container, Reveal (adapted copies)
    ui/                       # copied primitives (see §1)
    hooks/
  lib/                        # formatting helpers (currency, numbers), validation
  theme/                      # copied from the design repo, untouched
```

Every feature follows the same internal shape the main app uses
(`api/`, `components/`, `pages/`, `types/`, each with an `index.ts` barrel
exporting only what other features/the router actually need). Pages are
wired into `app/routes.tsx`, not imported ad hoc elsewhere.

---

## 5. Routes

| Path | Page | Notes |
|---|---|---|
| `/` | Redirect to `/picture-news`, **or** a thin landing page introducing the three sections — *Assumption: redirecting straight to Picture News is simplest and matches "picture news, voting, sponsors" being the whole app; build a minimal landing hero only if a true homepage is wanted instead. Default to the redirect unless told otherwise.* |
| `/picture-news` | `PictureNewsListPage` | Grid of news cards |
| `/picture-news/:id` | `PictureNewsDetailPage` | Full story + gallery |
| `/voting` | `CandidatesPage` | Search + LGA filter + candidate grid |
| `/voting/:candidateId` | `CandidateDetailPage` | Full candidate profile |
| `/voting/:candidateId/vote` | `VotePurchasePage` | Pick/enter vote quantity, see cost, proceed to pay |
| `/voting/:candidateId/vote/confirmation` | `VoteConfirmationPage` | Post-payment result (dummy success state for now — see §6) |
| `/sponsors` | `SponsorsPage` | "Thank you to our sponsors" banner + grid |
| `*` | Not-found page | Same pattern as the design repo's `NotFoundPage` |

---

## 6. Dummy data, built to be swapped later

Every `api/` function in every feature should:

1. Have the exact async signature and return shape a real fetch call would
   have (e.g. `async function getCandidates(params?: { search?: string; lga?: string }): Promise<Candidate[]>`), even though internally it just filters/returns the local mock array (with an artificial small delay, e.g. `await new Promise(r => setTimeout(r, 300))`, so loading states are actually exercised and visibly correct, not just theoretical).
2. Be called through `@tanstack/react-query`'s `useQuery`/`useMutation` from
   components — **not** called directly in a `useEffect`. This is what
   makes swapping the dummy implementation for a real `fetch`/`axios` call
   later a one-file change (the `api/` function body) with zero changes to
   any component.
3. Live in that feature's own `data/` folder as a plain exported array/
   object — e.g. `data/mock-candidates.ts` exporting `MOCK_CANDIDATES:
   Candidate[]`. Keep the mock data realistic in shape and volume (at least
   10–15 candidates spread across several different LGAs, at least 6–8
   picture-news items, at least 6 sponsors) so the empty/sparse states
   don't dominate what's visually being built and reviewed.

**Vote purchase / payment, specifically** — since there's no real gateway
yet:

- `VotePurchasePage` calculates cost client-side from the selected/entered
  vote quantity × ₦100 (see §8) and, on "Proceed to Pay", calls a
  `submitVotePurchase({ candidateId, votes, amount })` function in
  `voting/api`.
- For now, that function should **simulate** what a real payment-gateway
  redirect would eventually do: show a brief "Redirecting to payment…"
  state, then simulate success (e.g. after ~1s) and route to
  `/voting/:candidateId/vote/confirmation` with the purchased vote count,
  which then (in the dummy data layer) increments that candidate's
  `voteCount` in the local mock store so the updated count is visible back
  on the candidates list and detail page for the rest of the session.
- Structure this as a single clearly-marked seam — a comment like
  `// TODO(payment-integration): replace this simulated flow with a real
  redirect to the payment gateway (Paystack/Flutterwave are the standard
  choice for NGN) and a server-confirmed vote credit once the backend
  exists` — so the real integration is an obvious, contained follow-up
  rather than something that has to be rediscovered by reading the whole
  flow again.
- *Assumption: no login is required to vote — a voter picks a quantity,
  "pays," and the vote is credited anonymously (this mirrors how most
  Nigerian pageant-voting sites like the elfrique.com reference work:
  pay-to-vote, no account needed). If voter accounts/auth should exist,
  flag it — it changes this flow meaningfully.*

---

## 7. Picture News

**List page** (`/picture-news`): a responsive grid of cards (reuse the
`Card` primitive). Each card:

- Cover image (fixed aspect ratio, `object-fit: cover`)
- Title
- Short description/summary (2–3 lines, clamped — same `-webkit-line-clamp`
  pattern already used elsewhere in the design repo, e.g.
  `NotificationBell.styles.ts`'s `RowText`)
- Published date, formatted via `date-fns`
- The whole card is clickable (or has a clear "Read more" affordance) and
  routes to `/picture-news/:id`
- Same hover-lift treatment as other interactive cards in this app (see §9)

**Detail page** (`/picture-news/:id`): full title, full body copy (can be
plain paragraphs — no rich-text editor needed for dummy data, just an
array of paragraph strings), a hero image, and — when the item has more
than one image — a simple gallery grid or lightweight lightbox below the
body. A back link to `/picture-news`. If the item doesn't exist in the
mock data, render the same not-found treatment as the rest of the app
rather than crashing.

---

## 8. Voting

This is the core of the app — give it the most care.

### 8.1 Candidates list (`/voting`)

- Page header: title ("Vote for Mbopo Akwa Ibom"), short explanatory
  subtitle.
- **Search bar**: free text, matches against candidate name *and* LGA
  (client-side filter over the loaded dummy set is fine — debounce input
  the same way the registration feature's searchable Combobox already
  does, ~150ms).
- **LGA filter**: a dropdown (reuse the `Combobox`/`Select` primitive)
  listing Akwa Ibom's 31 LGAs. Copy this exact list from the design repo
  (`src/features/mbopo-registration/constants.ts`'s `AKWA_IBOM_LGAS`) so
  it stays in sync rather than retyping it:

  ```
  Abak, Eastern Obolo, Eket, Esit Eket, Essien Udim, Etim Ekpo, Etinan,
  Ibeno, Ibesikpo Asutan, Ibiono Ibom, Ika, Ikono, Ikot Abasi, Ikot Ekpene,
  Ini, Itu, Mbo, Mkpat Enin, Nsit Atai, Nsit Ibom, Nsit Ubium, Obot Akara,
  Okobo, Onna, Oron, Oruk Anam, Udung Uko, Ukanafun, Uruan,
  Urue-Offong/Oruko, Uyo
  ```

  Include an "All LGAs" default option. Search and LGA filter combine
  (AND, not OR).
- Result count + a clear empty state when search/filter yields nothing.
- **Candidate card grid**. Each `CandidateCard` shows:
  - Candidate photo (portrait aspect ratio, `object-fit: cover`)
  - Name
  - LGA (small, secondary text)
  - A short one-line tagline/detail if present in the data
  - **Vote count**, formatted with thousands separators (`toLocaleString`),
    visually prominent (this is a core trust signal on a voting page)
  - **A clear, always-visible disclaimer** — not hidden behind a tooltip —
    stating public votes are worth **10% of the final score**. Suggested
    copy: *"Public votes count for 10% of the final score"*, styled as a
    small pill/badge (e.g. muted background, small icon from `lucide-react`
    like `Info`), not alarming, just clearly legible on every card.
  - A **"View Details"** button/link → `/voting/:candidateId`
  - A **"Vote Now"** button/link → `/voting/:candidateId/vote`
  - See §9 for the hover treatment.

### 8.2 Candidate detail page (`/voting/:candidateId`)

A well-structured, generous single-candidate profile:

- Large hero image (or a small photo carousel/gallery if the candidate has
  multiple images in the mock data)
- Name, LGA, and any other headline facts (age, occupation — whatever the
  mock `Candidate` type carries)
- **Story / bio / history** section — longer-form copy, several paragraphs
- A gallery of additional photos, if present
- Videos, if present — *Assumption: dummy data can reference YouTube/Vimeo
  embed URLs (simplest, no video hosting needed yet) rather than raw video
  files; embed with a standard responsive `iframe` wrapper.*
- **Vote count**, same prominent treatment as the card, plus the same
  "10% of final score" disclaimer restated here (not just on the card —
  someone arriving directly at this page via a shared link should still
  see it)
- A prominent **"Vote Now"** button → `/voting/:candidateId/vote`
- If the `:candidateId` doesn't match any mock candidate, show the app's
  not-found state, not a blank/broken page.

### 8.3 Vote purchase page (`/voting/:candidateId/vote`)

- Small candidate summary at the top for context (photo + name) so it's
  unambiguous who the votes are going to
- A set of **vote tier options**, flat ₦100/vote, shown as selectable
  cards/buttons:
  - 1 vote — ₦100
  - 5 votes — ₦500
  - 10 votes — ₦1,000
  - 20 votes — ₦2,000
  - 50 votes — ₦5,000
  - 100 votes — ₦10,000

  (Exact tier list is a reasonable starting set — flag if the real
  business wants different breakpoints; the formula is always
  `votes × ₦100`.)
- A **custom quantity input** as an alternative to the preset tiers (plain
  number input, react-hook-form + zod validated — positive integer, some
  sensible max e.g. 10,000, matching the design repo's convention of
  `digitsOnlyOnChange`-style input sanitization from `@/lib/validation`
  patterns) that live-calculates and displays the total cost as the user
  types/changes it.
- Selecting a tier and typing in the custom field should be mutually
  exclusive/kept in sync (picking a tier fills the custom field with that
  number; typing a custom number deselects any tier that doesn't match).
- A clear running total (e.g. "**10 votes — ₦1,000.00**") and a primary
  **"Proceed to Pay"** button that triggers the simulated payment flow from
  §6.
- Restate the 10%-of-score disclaimer once more here too, right by the
  price, so it's the last thing a voter sees before paying.

### 8.4 Confirmation page (`/voting/:candidateId/vote/confirmation`)

A clean success state: confirmation that the votes were recorded, how many
votes, for which candidate, updated vote total, and links back to the
candidate's page and to `/voting` generally. (This is also where a real
payment-gateway callback would eventually land — keep its structure simple
so it's easy to adapt into a true "verify payment reference, then show
this" page later.)

---

## 9. The hover effect (applies to candidate cards, and reasonably to news/sponsor cards too for consistency)

On hover, a `CandidateCard` should:

- Lift slightly: `transform: translateY(-6px)` (or similar — match the
  feel of existing lift-on-hover CTAs in the design repo, e.g.
  `Navbar.styles.ts`'s `CtaLink`/`RegisterLink` use `translateY(-2px)` for
  buttons; a card can move a bit more than a button)
- Gain a glowing **orange ring**: a `box-shadow` ring using
  `theme.colors.secondary.DEFAULT` (the brand orange) via `theme.alpha(...)`
  for the glow softness, layered with the existing `theme.shadows.xl` (or
  a new elevated shadow built the same way `theme.shadows.cta` already is —
  colored shadow via `withAlpha`) for depth. Something in the shape of:

  ```ts
  &:hover {
    transform: translateY(-6px);
    box-shadow:
      0 0 0 3px ${({ theme }) => theme.alpha(theme.colors.secondary.DEFAULT, 0.45)},
      ${({ theme }) => theme.shadows.xl};
  }
  ```

- Feel "radiant" — a soft glow, not just a hard outline. A low-opacity
  blurred orange glow behind the card (an absolutely-positioned pseudo-
  element or sibling `div` with a blurred radial gradient in
  `theme.colors.secondary.DEFAULT`, opacity fading in on hover) reads as
  "radiant" without inventing a new color.
- Reveal/emphasize the **"View Details"** button as part of this hover
  state (it can be present but visually quieter at rest, and become the
  clear focal action on hover) — mobile/touch has no hover, so make sure
  the button is always fully usable without hover too (hover is an
  enhancement, never a requirement to reach the action).
- Use `theme.transitions.base` for the transition so the motion speed
  matches everything else in the app.

---

## 10. Sponsors (`/sponsors`)

- A prominent banner/tag at the top — *"Thank You to Our Sponsors"* — reuse
  `PageHeroBanner` the same way the Legal pages in the design repo do
  (eyebrow + title), rather than inventing a new banner component.
- Below it, a grid of `SponsorCard`s: sponsor logo/image, name, short
  description (1–2 sentences). If a sponsor has a website in the mock
  data, the card (or a small "Visit" link on it) can open it in a new tab.
- Keep it simple and dignified — this page's job is to say thank you
  clearly, not to compete visually with the Voting page.

---

## 11. Data shapes (dummy, shaped for the real API later)

```ts
// features/voting/types
interface Candidate {
  id: string;
  name: string;
  lga: string; // one of AKWA_IBOM_LGAS
  tagline?: string;
  photo: string;
  gallery?: string[];
  videoUrls?: string[]; // embeddable URLs (YouTube/Vimeo)
  story: string[]; // paragraphs
  voteCount: number;
  publicVoteWeightPercent: 10; // literal — always 10, surfaced in the UI, not hidden config
}

interface VoteTier {
  votes: number;
  priceNaira: number; // always votes * 100, kept explicit for display
}

interface VotePurchase {
  candidateId: string;
  votes: number;
  amountNaira: number;
}

// features/picture-news/types
interface PictureNewsItem {
  id: string;
  title: string;
  summary: string;
  coverImage: string;
  images?: string[];
  body: string[]; // paragraphs
  publishedAt: string; // ISO date
}

// features/sponsors/types
interface Sponsor {
  id: string;
  name: string;
  logo: string;
  description: string;
  websiteUrl?: string;
}
```

---

## 12. Explicitly out of scope for this pass

- Real backend/API integration (see §6 — build against the dummy layer,
  shaped to make this swap cheap later)
- Real payment gateway integration (Paystack/Flutterwave) — simulate it
  per §6, leave the seam clearly marked
- Authentication/voter accounts (per the assumption in §6)
- Admin/moderation tooling for managing candidates, news, or sponsors —
  that's a separate concern for whatever manages the real data later
- Image/video upload — all media in this pass is static mock asset URLs

---

## 13. Done-ness checklist for this pass

- [ ] `npx tsc --noEmit` clean, `npm run lint` (`eslint .`) clean with zero
      warnings, `npm run build` succeeds
- [ ] Every color in the app traces back to `theme.colors.*`/
      `theme.gradients.*` — no hardcoded hex/rgb values introduced
- [ ] Navbar/Footer visually match the main app's chrome (fonts, logos,
      spacing, mobile drawer behavior) with only the content differences
      described in §2
- [ ] Nothing on any page renders underneath the fixed navbar on any
      screen size, phone through desktop (this is a bug the main app has
      specifically had before — verify it directly, don't assume)
- [ ] Picture News list + detail pages work against mock data, including
      the empty/not-found paths
- [ ] Voting: search, LGA filter, and their combination all work
      correctly against the mock candidate set
- [ ] Candidate card hover (desktop) shows the lift + orange glow ring +
      "View Details" emphasis described in §9; the card is fully usable by
      tap with no hover at all on mobile
- [ ] The 10%-score disclaimer appears on every candidate card, the
      candidate detail page, and the vote purchase page
- [ ] Vote purchase: tier buttons and custom quantity both work, stay in
      sync, calculate cost correctly (`votes × ₦100`), and the simulated
      pay → confirmation → updated vote count flow works end-to-end
- [ ] Sponsors page renders the "Thank You" banner + sponsor grid
- [ ] Full click-through of every route on a real small-screen viewport,
      not just desktop

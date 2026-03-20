# MAUE W3 Design Process Log

Living record of UX design activities for the Microsoft Agent Usage Estimator Wave 3 project.

---

## §1 Discovery & Research

| Activity | Status | Notes |
|----------|--------|-------|
| — | — | No entries yet |

## §2 Define & Synthesize

| Activity | Status | Notes |
|----------|--------|-------|
| — | — | No entries yet |

## §3 Ideate

| Activity | Status | Notes |
|----------|--------|-------|
| Version architecture exploration | ✅ Done | Established V1/V2/V3 version switcher in App.tsx to compare design directions side-by-side |

## §4 Design

| Activity | Status | Notes |
|----------|--------|-------|
| V3 inline agent card actions | ✅ Done | Created AppV3.tsx — replaced more-button dropdown with inline Edit / Delete / Duplicate bordered buttons within agent cards |
| Coming Soon category cards | ✅ Done | Added "Coming Soon" badge and disabled state (opacity 0.5, pointer-events none) to Dynamics 365 Service, Dynamics ERP, and Microsoft 365 category cards |
| Sales Qualification agent form | ✅ Done | Custom form for sales-qualification agent: description copy above Agent Name, Leads Research section with 4 fields (leads/month, % engaged, leads researched not engaged, leads researched and engaged). Generic M365 Licenses / Agent Traffic / Agent Knowledge / Agent Tools sections hidden for this agent |
| Visual consistency pass | ✅ Done | Unified all card/box border radius to 12px; increased chipContent gap to 8px; checkbox aligned with first line of title (marginTop −4px); description text extended full-width (marginRight −48px) |
| Estimation pane refinements | ✅ Done | Empty-state estimation pane: removed bottom border, full 12px border-radius. Focused-mode agent name styled to match input (18px, #464feb blue). Removed top divider above focused-mode agent name |
| Dropdown overflow fix | ✅ Done | More-button dropdown in V2 was clipped by `overflowY: auto` on scroll container. Switched to `position: fixed` with coordinates computed via `getBoundingClientRect` |

## §5 Validate

| Activity | Status | Notes |
|----------|--------|-------|
| — | — | No entries yet |

## §6 Spec & Handoff

| Activity | Status | Notes |
|----------|--------|-------|
| GitHub Pages deployment | ✅ Done | Updated deploy.yml to trigger on `v3-design-session-0217` branch; set Vite base path to `/MAUE-W3/`; deployed to https://gim-home.github.io/MAUE-W3/ |

## §7 Support & Iterate

| Activity | Status | Notes |
|----------|--------|-------|
| — | — | No entries yet |

---

## Decision Log

| # | Date | Decision | Who | Rationale |
|---|------|----------|-----|-----------|
| 1 | 2026-03-18 | Use version switcher architecture (V1/V2/V3) instead of branches | Sasha | Allows side-by-side comparison of design directions in the same running app without branch switching |
| 2 | 2026-03-18 | V3 replaces more-button dropdown with inline Edit/Delete/Duplicate buttons | Sasha | More discoverable actions, reduces click depth, avoids dropdown clipping issues |
| 3 | 2026-03-18 | Sales Qualification agent gets a custom form (Leads Research) instead of generic sections | Sasha | Sales Qualification has different inputs (lead volume & engagement) that don't map to the generic M365 Licenses / Agent Traffic / Agent Knowledge structure |
| 4 | 2026-03-18 | Gray out Coming Soon categories rather than hiding them | Sasha | Users can see the full product roadmap while understanding which categories aren't available yet |
| 5 | 2026-03-18 | Standardize all card/box border-radius to 12px | Sasha | Visual consistency — previous mix of 8px/12px/16px looked unintentional |
| 6 | 2026-03-18 | Use position: fixed for dropdown menus in scrollable containers | Sasha | position: absolute was clipped by overflowY: auto on parent; fixed positioning with getBoundingClientRect avoids this |

---

## Session Details

### 2026-03-18 — V3 Design Session

**Branch:** `v3-design-session-0217`
**Repo:** gim-home/MAUE-W3
**Commits:**
- `26733bd` — V3 design session: Coming Soon labels, Sales Qualification form, inline nav, UI fixes
- `cf68aa9` — Add v3-design-session-0217 to deploy workflow, fix base path for GitHub Pages

**Files changed:**
- `src/App.tsx` — Thin wrapper refactored to route between V1/V2/V3
- `src/versions/AppV1.tsx` — Original design preserved as V1
- `src/versions/AppV2.tsx` — Current design with all session fixes applied
- `src/versions/AppV3.tsx` — New variant with inline agent card actions

**Summary of all changes:**

1. **Version architecture** — Split monolithic App.tsx into AppV1/AppV2/AppV3 with a version switcher dropdown
2. **V3 inline nav** — Replaced more-button dropdown with bordered inline Edit / Delete / Duplicate buttons (border: 1px solid colorNeutralStroke2, borderRadius: 6px)
3. **Coming Soon labels** — Dynamics 365 Service, Dynamics ERP, Microsoft 365 grayed out with "Coming Soon" badge under the title
4. **Sales Qualification form** — Description text above Agent Name, Leads Research section (4 fields with Tooltip on "% of leads engaged"), hid generic sections (M365 Licenses, Agent Traffic, Agent Knowledge, Agent Tools)
5. **12px border-radius unification** — All white-fill + gray-border boxes standardized
6. **Checkbox alignment** — chipActions alignItems: flex-start, checkbox marginTop: −4px
7. **Description full-width** — chipDescription marginRight: −48px to extend past checkbox/button area
8. **chipContent spacing** — Gap increased from 4px to 8px
9. **Estimation pane empty state** — Removed borderBottom, full borderRadius: 12px when no products
10. **Focused mode styling** — Agent name: fontSize 18px, color #464feb; removed borderTop divider
11. **Dropdown clipping fix** — V2 more-button menu changed to position: fixed with menuPosition state via getBoundingClientRect
12. **GitHub Pages deployment** — deploy.yml updated for branch trigger, vite.config.ts base path set to /MAUE-W3/

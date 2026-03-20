import { useState, useEffect } from "react";
import {
  FluentProvider,
  createLightTheme,
  makeStyles,
  tokens,
  Button,
} from "@fluentui/react-components";
import type { BrandVariants } from "@fluentui/react-components";
import {
  ArrowLeftRegular,
  CopyRegular,
  CheckmarkRegular,
} from "@fluentui/react-icons";

/* ── Brand Tokens ─────────────────────────────────────────── */
const customBrand: BrandVariants = {
  10: "#050520",
  20: "#0a0b3d",
  30: "#12135c",
  40: "#1a1b7a",
  50: "#232498",
  60: "#2c2db5",
  70: "#3638d1",
  80: "#464feb",
  90: "#5b63f0",
  100: "#7178f3",
  110: "#878df5",
  120: "#9da2f7",
  130: "#b3b7f9",
  140: "#c9ccfb",
  150: "#dfe1fd",
  160: "#f0f0fe",
};
const customTheme = createLightTheme(customBrand);

/* ── Page Styles ──────────────────────────────────────────── */
const useStyles = makeStyles({
  root: {
    backgroundColor: tokens.colorNeutralBackground2,
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  container: {
    maxWidth: "1600px",
    width: "100%",
    padding: "0 clamp(24px, 5vw, 80px) 48px",
    boxSizing: "border-box" as const,
    display: "flex",
    flexDirection: "column",
    gap: "48px",
  },
  stickyNav: {
    position: "sticky" as const,
    top: 0,
    zIndex: 100,
    padding: "12px clamp(24px, 5vw, 80px) 24px",
    transition: "background-color 0.2s ease, box-shadow 0.2s ease",
    width: "100%",
    boxSizing: "border-box" as const,
  },
  header: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  pageTitle: {
    fontSize: "36px",
    lineHeight: "44px",
    fontWeight: 700,
    color: tokens.colorBrandForeground1,
    margin: 0,
  },
  pageDescription: {
    fontSize: "16px",
    lineHeight: "24px",
    color: tokens.colorNeutralForeground2,
    margin: 0,
    maxWidth: "720px",
  },
  dsSection: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
  },
  sectionTitle: {
    fontSize: "24px",
    lineHeight: "32px",
    fontWeight: 700,
    color: tokens.colorNeutralForeground1,
    margin: 0,
    borderBottom: `2px solid ${tokens.colorBrandBackground}`,
    paddingBottom: "8px",
  },
  subsection: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  twoColSubsection: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "24px",
    alignItems: "start",
  },
  twoColLeft: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  twoColRight: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
  },
  subsectionTitle: {
    fontSize: "16px",
    lineHeight: "22px",
    fontWeight: 600,
    color: tokens.colorNeutralForeground1,
    margin: 0,
    borderLeft: `3px solid ${tokens.colorBrandBackground}`,
    paddingLeft: "12px",
  },
  subsectionDescription: {
    fontSize: "14px",
    lineHeight: "20px",
    color: tokens.colorNeutralForeground3,
    margin: 0,
  },
  card: {
    padding: "24px",
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "12px",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  codeBlockWrapper: {
    position: "relative" as const,
  },
  codeBlock: {
    backgroundColor: "#1e1e1e",
    color: "#d4d4d4",
    padding: "16px 20px",
    borderRadius: "8px",
    fontSize: "13px",
    lineHeight: "20px",
    fontFamily: "'Cascadia Code', 'Fira Code', 'Consolas', monospace",
    overflowX: "auto" as const,
    whiteSpace: "pre" as const,
    margin: 0,
  },
  copyButton: {
    position: "absolute" as const,
    top: "8px",
    right: "8px",
  },
  swatchGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
    gap: "12px",
  },
  swatch: {
    display: "flex",
    flexDirection: "column",
    borderRadius: "8px",
    overflow: "hidden",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  swatchColor: {
    height: "48px",
    width: "100%",
  },
  swatchLabel: {
    fontSize: "11px",
    lineHeight: "16px",
    fontWeight: 600,
    padding: "6px 8px",
    color: tokens.colorNeutralForeground2,
    margin: 0,
  },
  swatchHex: {
    fontSize: "11px",
    lineHeight: "16px",
    padding: "0 8px 6px",
    color: tokens.colorNeutralForeground3,
    margin: 0,
    fontFamily: "monospace",
  },
  typographyRow: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    paddingBottom: "16px",
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    '&:last-child': {
      borderBottom: "none",
      paddingBottom: 0,
    },
  },
  typeMeta: {
    fontSize: "12px",
    lineHeight: "16px",
    color: tokens.colorNeutralForeground3,
    margin: 0,
    fontFamily: "monospace",
  },
  spacingRow: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
  },
  spacingBlock: {
    height: "24px",
    backgroundColor: tokens.colorBrandBackground2,
    borderRadius: "4px",
    flexShrink: 0,
  },
  spacingLabel: {
    fontSize: "13px",
    lineHeight: "20px",
    color: tokens.colorNeutralForeground2,
    margin: 0,
    fontFamily: "monospace",
    whiteSpace: "nowrap" as const,
  },
  tokenTable: {
    width: "100%",
    borderCollapse: "collapse" as const,
    fontSize: "13px",
    lineHeight: "20px",
  },
  previewRow: {
    display: "flex",
    gap: "16px",
    alignItems: "flex-start",
    flexWrap: "wrap" as const,
  },
  previewBox: {
    flex: "1 1 320px",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  previewLabel: {
    fontSize: "12px",
    lineHeight: "16px",
    fontWeight: 600,
    color: tokens.colorNeutralForeground3,
    margin: 0,
    textTransform: "uppercase" as const,
    letterSpacing: "0.5px",
  },
});

/* ── CSS Snippets ─────────────────────────────────────────── */
const CSS_SNIPPETS: Record<string, string> = {
  brandVariants: `/* Brand Variants (BrandVariants) */
const customBrand: BrandVariants = {
  10: "#050520",   /* Darkest */
  20: "#0a0b3d",
  30: "#12135c",
  40: "#1a1b7a",
  50: "#232498",
  60: "#2c2db5",
  70: "#3638d1",
  80: "#464feb",   /* Primary — used for Brand Background */
  90: "#5b63f0",
  100: "#7178f3",
  110: "#878df5",
  120: "#9da2f7",
  130: "#b3b7f9",
  140: "#c9ccfb",
  150: "#dfe1fd",
  160: "#f0f0fe",  /* Lightest */
};

const customTheme = createLightTheme(customBrand);`,

  semanticColors: `/* Semantic Color Tokens (from Fluent UI tokens) */
tokens.colorNeutralBackground1    /* #ffffff — card/panel backgrounds  */
tokens.colorNeutralBackground2    /* #f5f5f5 — page background         */
tokens.colorNeutralBackground3    /* #f0f0f0 — hover / active items    */
tokens.colorNeutralBackground4    /* #e8e8e8 — category pills          */
tokens.colorBrandBackground       /* #464feb — primary accent           */
tokens.colorBrandBackground2      /* #f0f0fe — light Brand tint (icons) */
tokens.colorBrandForeground1      /* #464feb — headline / accent text   */
tokens.colorNeutralForeground1    /* #242424 — primary text             */
tokens.colorNeutralForeground2    /* #616161 — secondary text           */
tokens.colorNeutralForeground3    /* #9e9e9e — tertiary / muted text    */
tokens.colorNeutralStroke2        /* #e0e0e0 — borders & separators     */
"#107c41"                         /* Green — negation / savings values  */`,

  appContainer: `/* App Container — full-page wrapper */
.appContainer {
  background-color: var(--colorNeutralBackground2);  /* #f5f5f5 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  width: 100%;
  min-height: 100vh;
}`,

  bodyContainer: `/* Body Container — centered content area */
.bodyContainer {
  display: flex;
  flex-direction: column;
  gap: 0;
  max-width: 1600px;
  width: 100%;
  margin: 0 auto;
  padding-top: 24px;
  padding-bottom: 48px;
  padding-left: clamp(24px, 5vw, 80px);
  padding-right: clamp(24px, 5vw, 80px);
  box-sizing: border-box;
}`,

  twoColumnLayout: `/* Two-Column Layout — form + sticky calc panel */
.twoColumnLayout {
  display: flex;
  flex-direction: row;
  gap: 24px;
  width: 100%;
  align-items: flex-start;
}

.estimationColumn {
  display: flex;
  flex-direction: column;
  gap: 24px;
  flex: 1 1 0;
  min-width: 0;
}`,

  headline: `/* Headline — page title (36px) */
.headline {
  font-size: 36px;
  line-height: 44px;
  font-weight: 700;
  color: var(--colorBrandForeground1);  /* #464feb */
  text-align: center;
  margin: 0;
}`,

  productTitle: `/* Product Title — card headers (20px) */
.productTitle {
  font-size: 20px;
  line-height: 28px;
  font-weight: 600;
  color: var(--colorNeutralForeground1);
  margin: 0;
}`,

  agentNameInput: `/* Agent Name Input — editable name field (18px) */
.agentNameInput input {
  color: #464feb !important;
  font-size: 18px;
  font-weight: 600;
}`,

  h4Title: `/* Section Title (h4) — with brand accent border (16px) */
.h4Title {
  font-size: 16px;
  line-height: 22px;
  font-weight: 600;
  color: var(--colorNeutralForeground1);
  margin: 0;
  border-left: 3px solid var(--colorBrandBackground);  /* #464feb */
  padding-left: 12px;
}`,

  h6Title: `/* Subsection Title (h6) — (14px semibold) */
.h6Title {
  font-size: 14px;
  line-height: 20px;
  font-weight: 600;
  color: var(--colorNeutralForeground1);
  margin: 0;
}`,

  chipTitle: `/* Chip Title — selection card names (16px) */
.chipTitle {
  font-size: 16px;
  line-height: 22px;
  font-weight: 600;
  color: var(--colorNeutralForeground1);
  margin: 0;
  text-wrap: pretty;
}`,

  bodyText: `/* Body Text — descriptions & labels (14px) */
.sectionDescription {
  font-size: 14px;
  line-height: 20px;
  color: var(--colorNeutralForeground3);
  width: 100%;
  margin: 0;
}

.chipDescription {
  font-size: 14px;
  line-height: 20px;
  color: var(--colorNeutralForeground3);
  margin: 0;
}`,

  productCard: `/* Product Card — main content card */
.productCard {
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 32px 48px;
  background-color: var(--colorNeutralBackground1);  /* #ffffff */
  border-radius: 12px;
  border: 1px solid var(--colorNeutralStroke2);       /* #e0e0e0 */
}`,

  productCategorySection: `/* Category Section — catalog cards */
.productCategorySection {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 32px 48px;
  background-color: var(--colorNeutralBackground1);
  border-radius: 12px;
  border: 1px solid var(--colorNeutralStroke2);
}`,

  productChip: `/* Product Chip — selectable agent card */
.productChip {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  background-color: var(--colorNeutralBackground1);
  border: 1px solid var(--colorNeutralStroke2);
  border-radius: 12px;
  position: relative;
  cursor: pointer;
  transition: background-color 0.15s ease,
              box-shadow 0.15s ease,
              border-color 0.15s ease;
}

/* Selected state */
.productChipSelected {
  border-color: var(--colorBrandBackground);  /* #464feb */
}`,

  chipIcon: `/* Chip Icon — agent icon container */
.chipIcon {
  width: 48px;
  height: 48px;
  background-color: var(--colorBrandBackground2);  /* #f0f0fe */
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-size: 28px;
}`,

  categoryPill: `/* Category Pill — tag/badge */
.categoryPill {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 8px;
  border-radius: 9999px;
  font-size: 12px;
  line-height: 16px;
  font-weight: 500;
  color: var(--colorNeutralForeground3);
  background-color: var(--colorNeutralBackground4);
  white-space: nowrap;
  width: fit-content;
}`,

  creditCard: `/* Credit Card — centered summary card */
.creditCard {
  display: flex;
  align-items: center;
  width: fit-content;
  margin: 0 auto;
  padding: 24px 32px;
  background-color: var(--colorNeutralBackground1);
  border-radius: 12px;
  border: 1px solid var(--colorNeutralStroke2);
  box-sizing: border-box;
}`,

  section: `/* Section — form section wrapper */
.section {
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
}

/* With bottom border */
.sectionBorder {
  border-bottom: 1px solid var(--colorNeutralStroke2);
  padding-bottom: 32px;
}`,

  inputsRow: `/* Inputs Row — responsive field row */
.inputsRow {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-items: flex-end;
  width: 100%;
}

/* Individual Input Column */
.inputColumn {
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1 0 0;
  min-width: 196px;
}`,

  calculationPanel: `/* Calculation Panel — sticky sidebar */
.calculationPanel {
  background-color: var(--colorNeutralBackground1);
  border: 1px solid var(--colorNeutralStroke2);
  display: flex;
  flex-direction: column;
  gap: 0;
  flex: 1 1 0;
  min-width: 0;
  min-height: 0;
  max-height: calc(100vh - 76px);
  position: sticky;
  top: 76px;
  align-self: flex-start;
  border-radius: 12px;
}`,

  calcStickyHeader: `/* Calc Sticky Header — fixed top of calc panel */
.calcStickyHeader {
  flex-shrink: 0;
  background-color: var(--colorNeutralBackground1);
  padding: 32px 32px 20px 32px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  border-bottom: 1px solid var(--colorNeutralStroke2);
  border-radius: 12px 12px 0 0;
}`,

  calcScrollArea: `/* Calc Scroll Area — scrollable breakdown */
.calcScrollArea {
  overflow-y: auto;
  flex: 1 1 0%;
  min-height: 0;
  padding: 20px 32px 32px 32px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}`,

  calcSectionContainer: `/* Calc Section Container — grouped line items */
.calcSectionContainer {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--colorNeutralStroke2);
}

/* Last child has no border */
.calcSectionContainer:last-child {
  border-bottom: none;
  padding-bottom: 0;
}`,

  calcItemRow: `/* Calc Item Row — individual line item */
.calcItemRow {
  display: flex;
  align-items: baseline;
  gap: 8px;
  width: 100%;
  box-sizing: border-box;
  padding: 4px 0 4px 15px;
}

.calcItemLabel {
  font-size: 14px;
  line-height: 20px;
  color: var(--colorNeutralForeground2);
  margin: 0;
}

/* Dotted leader line */
.calcLeader {
  flex: 1 1 0;
  border-bottom: 1px dashed var(--colorNeutralStroke2);
  min-width: 16px;
  align-self: baseline;
  margin-bottom: 4px;
}

.calcItemValue {
  font-size: 14px;
  line-height: 20px;
  font-weight: 600;
  color: var(--colorNeutralForeground1);
  margin: 0;
  flex-shrink: 0;
  white-space: nowrap;
}`,

  calcNegationRow: `/* Negation Row — green savings values */
.calcNegationRow {
  display: flex;
  align-items: baseline;
  gap: 8px;
  width: 100%;
  box-sizing: border-box;
  padding: 4px 0 4px 15px;
}

.calcNegationLabel {
  font-size: 14px;
  line-height: 20px;
  color: var(--colorNeutralForeground2);
  margin: 0;
}

.calcNegationValue {
  font-size: 14px;
  line-height: 20px;
  font-weight: 600;
  color: #107c41;  /* Green */
  margin: 0;
  flex-shrink: 0;
  white-space: nowrap;
}`,

  totalHeading: `/* Total Heading — summary total row */
.totalHeading {
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
}

.totalText {
  font-size: 20px;
  line-height: 28px;
  font-weight: 700;
  color: var(--colorNeutralForeground1);
  margin: 0;
}

.totalValue {
  font-size: 20px;
  line-height: 28px;
  font-weight: 700;
  color: var(--colorNeutralForeground1);
  margin: 0;
}`,

  outputValue: `/* Output Value — large metric display */
.outputValue {
  font-size: 32px;
  line-height: 40px;
  font-weight: 600;
  color: var(--colorBrandBackground);  /* #464feb */
  margin: 0;
}

.outputLabel {
  font-size: 14px;
  line-height: 20px;
  color: black;
  margin: 0;
}`,

  headerCard: `/* Header Card — top page section */
.headerCard {
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 24px 48px 24px;
  box-sizing: border-box;
}`,

  stickyNav: `/* Sticky Nav — category tab bar */
.stickyNav {
  position: sticky;
  top: 0;
  z-index: 100;
  padding: 12px 24px 24px 24px;
  transition: background-color 0.2s ease,
              box-shadow 0.2s ease;
  margin-left: -24px;
  margin-right: -24px;
  width: calc(100% + 48px);
}`,

  toolsTable: `/* Tools Table — data table component */
.toolsTable {
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  overflow: hidden;
  border: 1px solid var(--colorNeutralStroke2);
}

.toolsTableHeader {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
  padding: 12px 16px;
  background-color: var(--colorBrandBackground2);  /* #f0f0fe */
}

.toolsTableHeaderCell {
  font-size: 14px;
  line-height: 20px;
  font-weight: 600;
  color: var(--colorNeutralForeground1);
  margin: 0;
}

.toolsTableRow {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
  padding: 12px 16px;
  align-items: center;
  border-top: 1px solid var(--colorNeutralStroke2);
}

.toolsTableCell {
  font-size: 14px;
  line-height: 20px;
  color: var(--colorNeutralForeground1);
  margin: 0;
}`,

  versionPill: `/* Version Pill — floating action pill */
.versionPill {
  position: fixed;
  bottom: 32px;
  left: 32px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
  background-color: #464feb;
  border-radius: 9999px;
  padding: 8px;
  box-shadow: 0 4px 16px rgba(70, 79, 235, 0.3),
              0 8px 32px rgba(0, 0, 0, 0.12);
}

/* Pill button */
.versionPill button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  border: none;
  background-color: transparent;
  color: #ffffff;
  cursor: pointer;
  outline: none;
  transition: background-color 0.15s ease;
}

/* Pill divider */
.versionPill .divider {
  width: 20px;
  height: 1px;
  background-color: rgba(255, 255, 255, 0.3);
  align-self: center;
}`,

  legalText: `/* Legal Text — footer disclaimer */
.legalText {
  max-width: 80%;
  font-size: 14px;
  line-height: 20px;
  color: var(--colorNeutralForeground2);
  text-align: center;
  margin: 0;
}`,

  grids: `/* Grid Layouts */

/* Category Catalog Grid — 2-column selection */
.categoryCatalogGrid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

/* Category Grid — 2-column label/value */
.categoryGrid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px 24px;
}

/* Product Chips Grid — 2-column agent cards */
.productChipsGrid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  align-items: start;
}`,
};

/* ── Copy Button Component ────────────────────────────────── */
function CopyButton({ text }: { text: string }) {
  const styles = useStyles();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* fallback for older browsers */
      const el = document.createElement("textarea");
      el.value = text;
      el.style.position = "fixed";
      el.style.opacity = "0";
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <Button
      className={styles.copyButton}
      appearance="subtle"
      size="small"
      icon={copied ? <CheckmarkRegular /> : <CopyRegular />}
      onClick={handleCopy}
      style={{ color: copied ? "#107c41" : "#d4d4d4" }}
    >
      {copied ? "Copied" : "Copy"}
    </Button>
  );
}

/* ── Code Block Component ─────────────────────────────────── */
function CodeBlock({ code, label }: { code: string; label?: string }) {
  const styles = useStyles();
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      {label && <p style={{ fontSize: "13px", fontWeight: 600, color: tokens.colorNeutralForeground2, margin: 0 }}>{label}</p>}
      <div className={styles.codeBlockWrapper}>
        <pre className={styles.codeBlock}>{code}</pre>
        <CopyButton text={code} />
      </div>
    </div>
  );
}

/* ── Color Swatch ─────────────────────────────────────────── */
function Swatch({ shade, hex, name }: { shade: string; hex: string; name?: string }) {
  const styles = useStyles();
  return (
    <div className={styles.swatch}>
      <div className={styles.swatchColor} style={{ backgroundColor: hex }} />
      <p className={styles.swatchLabel}>{name || `Brand ${shade}`}</p>
      <p className={styles.swatchHex}>{hex}</p>
    </div>
  );
}

/* ── Main Component ───────────────────────────────────────── */
interface DesignSystemProps {
  onClose: () => void;
}

export default function DesignSystem({ onClose }: DesignSystemProps) {
  const styles = useStyles();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const brandShades: { shade: string; hex: string }[] = [
    { shade: "10", hex: "#050520" },
    { shade: "20", hex: "#0a0b3d" },
    { shade: "30", hex: "#12135c" },
    { shade: "40", hex: "#1a1b7a" },
    { shade: "50", hex: "#232498" },
    { shade: "60", hex: "#2c2db5" },
    { shade: "70", hex: "#3638d1" },
    { shade: "80", hex: "#464feb" },
    { shade: "90", hex: "#5b63f0" },
    { shade: "100", hex: "#7178f3" },
    { shade: "110", hex: "#878df5" },
    { shade: "120", hex: "#9da2f7" },
    { shade: "130", hex: "#b3b7f9" },
    { shade: "140", hex: "#c9ccfb" },
    { shade: "150", hex: "#dfe1fd" },
    { shade: "160", hex: "#f0f0fe" },
  ];

  return (
    <FluentProvider theme={customTheme}>
      <div className={styles.root}>
        {/* Sticky Nav */}
        <div
          className={styles.stickyNav}
          style={{
            backgroundColor: isScrolled ? tokens.colorNeutralBackground1 : "transparent",
            boxShadow: isScrolled ? "0 2px 8px rgba(0,0,0,0.1)" : "none",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "12px", maxWidth: "1600px", margin: "0 auto", width: "100%" }}>
            <Button
              appearance="outline"
              size="large"
              icon={<ArrowLeftRegular />}
              onClick={onClose}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = tokens.colorNeutralBackground3; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = ""; }}
              style={{ fontWeight: 600 }}
            >Back to estimator</Button>
          </div>
        </div>

        <div className={styles.container}>
          {/* Header */}
          <div className={styles.header}>
            <h1 className={styles.pageTitle}>Design System</h1>
            <p className={styles.pageDescription}>
              Complete design system reference for the Copilot Studio Estimator prototype. Each section includes live 
              previews and copy-ready CSS for engineering implementation. Built on Fluent UI React v9 with a custom brand theme.
            </p>
          </div>

          {/* ═══════════════════════════════════════════════════════ */}
          {/* 1. BRAND COLORS */}
          {/* ═══════════════════════════════════════════════════════ */}
          <div className={styles.dsSection}>
            <h2 className={styles.sectionTitle}>1. Brand Colors</h2>

            <div className={styles.subsection}>
              <h3 className={styles.subsectionTitle}>Brand Variant Scale</h3>
              <p className={styles.subsectionDescription}>
                16-shade scale generated from the primary brand color <strong>#464feb</strong> (shade 80). 
                Used by Fluent UI's <code>createLightTheme()</code> to produce all semantic color tokens.
              </p>
              <div className={styles.twoColSubsection}>
                <div className={styles.twoColLeft}>
                  <div className={styles.card}>
                    <div className={styles.swatchGrid}>
                      {brandShades.map(s => (
                        <Swatch key={s.shade} shade={s.shade} hex={s.hex} name={s.shade === "80" ? "Brand 80 (Primary)" : undefined} />
                      ))}
                    </div>
                  </div>
                </div>
                <div className={styles.twoColRight}>
                  <CodeBlock code={CSS_SNIPPETS.brandVariants} label="Brand Variants Definition" />
                </div>
              </div>
            </div>

            <div className={styles.subsection}>
              <h3 className={styles.subsectionTitle}>Semantic Color Tokens</h3>
              <p className={styles.subsectionDescription}>
                Mapped from the brand scale by Fluent UI. Use these tokens instead of raw hex values in components.
              </p>
              <div className={styles.twoColSubsection}>
                <div className={styles.twoColLeft}>
                  <div className={styles.card}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px" }}>
                      {[
                        { token: "colorNeutralBackground1", desc: "Card backgrounds", color: "#ffffff" },
                        { token: "colorNeutralBackground2", desc: "Page background", color: "#f5f5f5" },
                        { token: "colorNeutralBackground3", desc: "Active items", color: "#f0f0f0" },
                        { token: "colorNeutralBackground4", desc: "Category pills", color: "#e8e8e8" },
                        { token: "colorBrandBackground", desc: "Primary accent", color: "#464feb" },
                        { token: "colorBrandBackground2", desc: "Light brand tint", color: "#f0f0fe" },
                        { token: "colorBrandForeground1", desc: "Headline text", color: "#464feb" },
                        { token: "colorNeutralForeground1", desc: "Primary text", color: "#242424" },
                        { token: "colorNeutralForeground2", desc: "Secondary text", color: "#616161" },
                        { token: "colorNeutralForeground3", desc: "Muted text", color: "#9e9e9e" },
                        { token: "colorNeutralStroke2", desc: "Borders", color: "#e0e0e0" },
                        { token: "Green (savings)", desc: "Negation values", color: "#107c41" },
                      ].map(t => (
                        <div key={t.token} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "8px 12px", borderRadius: "8px", border: `1px solid ${tokens.colorNeutralStroke2}` }}>
                          <div style={{ width: "32px", height: "32px", borderRadius: "6px", backgroundColor: t.color, border: `1px solid ${tokens.colorNeutralStroke2}`, flexShrink: 0 }} />
                          <div style={{ display: "flex", flexDirection: "column" }}>
                            <span style={{ fontSize: "12px", fontFamily: "monospace", fontWeight: 600, color: tokens.colorNeutralForeground1 }}>{t.token}</span>
                            <span style={{ fontSize: "11px", color: tokens.colorNeutralForeground3 }}>{t.desc} · {t.color}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                <div className={styles.twoColRight}>
                  <CodeBlock code={CSS_SNIPPETS.semanticColors} label="Semantic Color Tokens" />
                </div>
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════ */}
          {/* 2. TYPOGRAPHY */}
          {/* ═══════════════════════════════════════════════════════ */}
          <div className={styles.dsSection}>
            <h2 className={styles.sectionTitle}>2. Typography</h2>
            <p className={styles.subsectionDescription}>
              Type hierarchy uses Segoe UI (system default via Fluent). All weights are either 600 (semibold) or 700 (bold).
            </p>

            <div className={styles.twoColSubsection}>
              <div className={styles.twoColLeft}>
                <div className={styles.card}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                    {[
                      { name: "Headline", size: "36px", lh: "44px", weight: "700", color: "#464feb", sample: "Copilot Studio Estimator", className: "headline" },
                      { name: "Output Value", size: "32px", lh: "40px", weight: "600", color: "#464feb", sample: "12,500", className: "outputValue" },
                      { name: "Product Title / Total", size: "20px", lh: "28px", weight: "600–700", color: "#242424", sample: "Dynamics 365 Sales", className: "productTitle / totalText" },
                      { name: "Credit Title", size: "18px", lh: "24px", weight: "600", color: "#242424", sample: "Total estimated credits", className: "creditTitle" },
                      { name: "Agent Name (Input)", size: "18px", lh: "24px", weight: "600", color: "#464feb", sample: "Sales qualification agent", className: "agentNameInput" },
                      { name: "Section Title (h4)", size: "16px", lh: "22px", weight: "600", color: "#242424", sample: "Case configuration", className: "h4Title" },
                      { name: "Chip Title", size: "16px", lh: "22px", weight: "600", color: "#242424", sample: "Case management agent", className: "chipTitle" },
                      { name: "Calc Section Head", size: "16px", lh: "22px", weight: "600", color: "#242424", sample: "Generative answers", className: "calcH4Text" },
                      { name: "Subsection Title (h6)", size: "14px", lh: "20px", weight: "600", color: "#242424", sample: "Required fields", className: "h6Title" },
                      { name: "Body / Label", size: "14px", lh: "20px", weight: "400", color: "#616161–#9e9e9e", sample: "Number of new emails or messages created per month", className: "sectionDescription / chipDescription" },
                      { name: "Category Pill", size: "12px", lh: "16px", weight: "500", color: "#9e9e9e", sample: "Dynamics 365 Sales", className: "categoryPill" },
                    ].map((t, i) => (
                      <div key={i} className={styles.typographyRow}>
                        <span style={{ fontSize: t.size, lineHeight: t.lh, fontWeight: parseInt(t.weight) || 600, color: t.color }}>{t.sample}</span>
                        <p className={styles.typeMeta}>{t.name} · {t.size}/{t.lh} · weight {t.weight} · .{t.className}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className={styles.twoColRight}>
                <CodeBlock code={CSS_SNIPPETS.headline} label="Headline" />
                <CodeBlock code={CSS_SNIPPETS.productTitle} label="Product Title" />
                <CodeBlock code={CSS_SNIPPETS.agentNameInput} label="Agent Name Input" />
                <CodeBlock code={CSS_SNIPPETS.h4Title} label="Section Title (h4)" />
                <CodeBlock code={CSS_SNIPPETS.h6Title} label="Subsection Title (h6)" />
                <CodeBlock code={CSS_SNIPPETS.chipTitle} label="Chip Title" />
                <CodeBlock code={CSS_SNIPPETS.bodyText} label="Body Text" />
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════ */}
          {/* 3. SPACING & LAYOUT */}
          {/* ═══════════════════════════════════════════════════════ */}
          <div className={styles.dsSection}>
            <h2 className={styles.sectionTitle}>3. Spacing &amp; Layout</h2>

            <div className={styles.subsection}>
              <h3 className={styles.subsectionTitle}>Spacing Scale</h3>
              <div className={styles.card}>
                <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                  {[
                    { px: 4, usage: "calcItemRow padding, brand border width" },
                    { px: 8, usage: "Input gaps, grid gaps, pill padding, chip content gap" },
                    { px: 12, usage: "Chip/catalog inner gap, h4Title padding-left, table padding" },
                    { px: 16, usage: "Section gaps, input row gaps, chip padding, grid gaps" },
                    { px: 20, usage: "Calc scroll/header gap, calc section padding" },
                    { px: 24, usage: "Column gap (two-column layout), body top padding, card padding" },
                    { px: 32, usage: "Section inner gap, card padding Y, calc panel padding" },
                    { px: 48, usage: "Card padding X, body bottom padding, chip icon size" },
                  ].map(s => (
                    <div key={s.px} className={styles.spacingRow}>
                      <div className={styles.spacingBlock} style={{ width: `${s.px * 2}px` }} />
                      <p className={styles.spacingLabel}><strong>{s.px}px</strong> — {s.usage}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.subsection}>
              <h3 className={styles.subsectionTitle}>Layout System</h3>
              <p className={styles.subsectionDescription}>
                Two-column flex layout: left column holds the form/product cards, right column is a sticky calculation panel. 
                Max content width 1600px, centered with auto margins. Responsive padding via <code>clamp(24px, 5vw, 80px)</code>.
              </p>
              <CodeBlock code={CSS_SNIPPETS.appContainer} label="App Container" />
              <CodeBlock code={CSS_SNIPPETS.bodyContainer} label="Body Container" />
              <CodeBlock code={CSS_SNIPPETS.twoColumnLayout} label="Two-Column Layout" />
            </div>

            <div className={styles.subsection}>
              <h3 className={styles.subsectionTitle}>Grid Systems</h3>
              <p className={styles.subsectionDescription}>
                Multiple 2-column CSS grids used for category/product selection and data display.
              </p>
              <CodeBlock code={CSS_SNIPPETS.grids} label="Grid Layouts" />
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════ */}
          {/* 4. COMPONENTS */}
          {/* ═══════════════════════════════════════════════════════ */}
          <div className={styles.dsSection}>
            <h2 className={styles.sectionTitle}>4. Components</h2>

            {/* Product Card */}
            <div className={styles.subsection}>
              <h3 className={styles.subsectionTitle}>Product Card</h3>
              <p className={styles.subsectionDescription}>
                Primary content container for agent configuration. 12px radius, 1px neutral border, 32px×48px padding.
              </p>
              <div className={styles.twoColSubsection}>
                <div className={styles.twoColLeft}>
                  <div className={styles.card}>
                    <div style={{ padding: "32px 48px", backgroundColor: tokens.colorNeutralBackground1, borderRadius: "12px", border: `1px solid ${tokens.colorNeutralStroke2}` }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: "16px", borderBottom: `1px solid ${tokens.colorNeutralStroke2}` }}>
                        <p style={{ fontSize: "20px", fontWeight: 600, margin: 0 }}>Product Title</p>
                        <span style={{ fontSize: "14px", color: tokens.colorNeutralForeground3 }}>Actions →</span>
                      </div>
                      <div style={{ paddingTop: "32px" }}>
                        <p style={{ fontSize: "16px", fontWeight: 600, margin: 0, borderLeft: `3px solid ${tokens.colorBrandBackground}`, paddingLeft: "12px" }}>Section Title</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.twoColRight}>
                  <CodeBlock code={CSS_SNIPPETS.productCard} />
                </div>
              </div>
            </div>

            {/* Product Chip */}
            <div className={styles.subsection}>
              <h3 className={styles.subsectionTitle}>Selection Chip</h3>
              <p className={styles.subsectionDescription}>
                Selectable card for agent/category picking. Border turns brand color when selected.
              </p>
              <div className={styles.twoColSubsection}>
                <div className={styles.twoColLeft}>
                  <div className={styles.card}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                      {/* Unselected */}
                      <div style={{ display: "flex", flexDirection: "column", gap: "12px", padding: "16px", backgroundColor: tokens.colorNeutralBackground1, border: `1px solid ${tokens.colorNeutralStroke2}`, borderRadius: "12px" }}>
                        <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                          <div style={{ width: "48px", height: "48px", backgroundColor: tokens.colorBrandBackground2, borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px" }}>📊</div>
                          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                            <p style={{ fontSize: "16px", fontWeight: 600, margin: 0 }}>Agent Name</p>
                            <p style={{ fontSize: "14px", color: tokens.colorNeutralForeground3, margin: 0 }}>Description text</p>
                          </div>
                        </div>
                      </div>
                      {/* Selected */}
                      <div style={{ display: "flex", flexDirection: "column", gap: "12px", padding: "16px", backgroundColor: tokens.colorNeutralBackground1, border: `2px solid #464feb`, borderRadius: "12px" }}>
                        <div style={{ display: "flex", gap: "16px", alignItems: "flex-start" }}>
                          <div style={{ width: "48px", height: "48px", backgroundColor: tokens.colorBrandBackground2, borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "28px" }}>📊</div>
                          <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                            <p style={{ fontSize: "16px", fontWeight: 600, margin: 0 }}>Agent Name (Selected)</p>
                            <p style={{ fontSize: "14px", color: tokens.colorNeutralForeground3, margin: 0 }}>Description text</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.twoColRight}>
                  <CodeBlock code={CSS_SNIPPETS.productChip} />
                  <CodeBlock code={CSS_SNIPPETS.chipIcon} label="Chip Icon" />
                </div>
              </div>
            </div>

            {/* Category Pill */}
            <div className={styles.subsection}>
              <h3 className={styles.subsectionTitle}>Category Pill</h3>
              <p className={styles.subsectionDescription}>
                Small rounded badge for categorization. 9999px radius for full pill shape.
              </p>
              <div className={styles.twoColSubsection}>
                <div className={styles.twoColLeft}>
                  <div className={styles.card}>
                    <div style={{ display: "flex", gap: "8px" }}>
                      <span style={{ display: "inline-flex", padding: "2px 8px", borderRadius: "9999px", fontSize: "12px", fontWeight: 500, color: tokens.colorNeutralForeground3, backgroundColor: tokens.colorNeutralBackground4 }}>Dynamics 365 Sales</span>
                      <span style={{ display: "inline-flex", padding: "2px 8px", borderRadius: "9999px", fontSize: "12px", fontWeight: 500, color: tokens.colorNeutralForeground3, backgroundColor: tokens.colorNeutralBackground4 }}>Copilot Studio Custom</span>
                      <span style={{ display: "inline-flex", padding: "2px 8px", borderRadius: "9999px", fontSize: "12px", fontWeight: 500, color: tokens.colorNeutralForeground3, backgroundColor: tokens.colorNeutralBackground4 }}>Microsoft 365</span>
                    </div>
                  </div>
                </div>
                <div className={styles.twoColRight}>
                  <CodeBlock code={CSS_SNIPPETS.categoryPill} />
                </div>
              </div>
            </div>

            {/* Section */}
            <div className={styles.subsection}>
              <h3 className={styles.subsectionTitle}>Form Section</h3>
              <p className={styles.subsectionDescription}>
                Sections wrap related form fields. Optional bottom border for visual separation. 16px internal gap.
              </p>
              <CodeBlock code={CSS_SNIPPETS.section} />
              <CodeBlock code={CSS_SNIPPETS.inputsRow} label="Inputs Row + Input Column" />
            </div>

            {/* Credit Card */}
            <div className={styles.subsection}>
              <h3 className={styles.subsectionTitle}>Credit Card</h3>
              <p className={styles.subsectionDescription}>
                Centered summary card displayed in the header area. Auto-width with 24px×32px padding.
              </p>
              <CodeBlock code={CSS_SNIPPETS.creditCard} />
            </div>

            {/* Header */}
            <div className={styles.subsection}>
              <h3 className={styles.subsectionTitle}>Header Card</h3>
              <p className={styles.subsectionDescription}>
                Top-level page header container. Center-aligned, holds the headline, description, and credit summary.
              </p>
              <CodeBlock code={CSS_SNIPPETS.headerCard} />
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════ */}
          {/* 5. CALCULATION PANEL */}
          {/* ═══════════════════════════════════════════════════════ */}
          <div className={styles.dsSection}>
            <h2 className={styles.sectionTitle}>5. Calculation Panel</h2>
            <p className={styles.subsectionDescription}>
              Sticky right-column panel that displays the credit estimation breakdown. 
              Fixed at <code>top: 76px</code> with <code>max-height: calc(100vh - 76px)</code> for scrolling.
            </p>

            <div className={styles.subsection}>
              <h3 className={styles.subsectionTitle}>Panel Container</h3>
              <CodeBlock code={CSS_SNIPPETS.calculationPanel} />
            </div>

            <div className={styles.subsection}>
              <h3 className={styles.subsectionTitle}>Sticky Header</h3>
              <p className={styles.subsectionDescription}>
                Non-scrollable top area with totals and actions. Stays fixed while breakdown scrolls.
              </p>
              <CodeBlock code={CSS_SNIPPETS.calcStickyHeader} />
            </div>

            <div className={styles.subsection}>
              <h3 className={styles.subsectionTitle}>Scroll Area</h3>
              <CodeBlock code={CSS_SNIPPETS.calcScrollArea} />
            </div>

            <div className={styles.subsection}>
              <h3 className={styles.subsectionTitle}>Section Container</h3>
              <p className={styles.subsectionDescription}>
                Groups related line items with bottom border. Last child has no border.
              </p>
              <CodeBlock code={CSS_SNIPPETS.calcSectionContainer} />
            </div>

            <div className={styles.subsection}>
              <h3 className={styles.subsectionTitle}>Line Items</h3>
              <p className={styles.subsectionDescription}>
                Individual credit line items with dotted leader lines connecting label to value. 
                15px left indent, baseline alignment.
              </p>
              <div className={styles.twoColSubsection}>
                <div className={styles.twoColLeft}>
                  <div className={styles.card}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                      <div style={{ display: "flex", alignItems: "baseline", gap: "8px", padding: "4px 0 4px 15px" }}>
                        <p style={{ fontSize: "14px", color: tokens.colorNeutralForeground2, margin: 0 }}>Knowledge retrieval</p>
                        <div style={{ flex: "1 1 0", borderBottom: `1px dashed ${tokens.colorNeutralStroke2}`, minWidth: "16px", alignSelf: "baseline", marginBottom: "4px" }} />
                        <p style={{ fontSize: "14px", fontWeight: 600, color: tokens.colorNeutralForeground1, margin: 0 }}>2,500</p>
                      </div>
                      <div style={{ display: "flex", alignItems: "baseline", gap: "8px", padding: "4px 0 4px 15px" }}>
                        <p style={{ fontSize: "14px", color: tokens.colorNeutralForeground2, margin: 0 }}>Microsoft 365 Copilot negation</p>
                        <div style={{ flex: "1 1 0", borderBottom: `1px dashed ${tokens.colorNeutralStroke2}`, minWidth: "16px", alignSelf: "baseline", marginBottom: "4px" }} />
                        <p style={{ fontSize: "14px", fontWeight: 600, color: "#107c41", margin: 0 }}>−1,200</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className={styles.twoColRight}>
                  <CodeBlock code={CSS_SNIPPETS.calcItemRow} label="Item Row + Leader + Value" />
                  <CodeBlock code={CSS_SNIPPETS.calcNegationRow} label="Negation Row (Green)" />
                </div>
              </div>
            </div>

            <div className={styles.subsection}>
              <h3 className={styles.subsectionTitle}>Total Heading</h3>
              <CodeBlock code={CSS_SNIPPETS.totalHeading} />
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════ */}
          {/* 6. DATA TABLE */}
          {/* ═══════════════════════════════════════════════════════ */}
          <div className={styles.dsSection}>
            <h2 className={styles.sectionTitle}>6. Data Table</h2>
            <p className={styles.subsectionDescription}>
              3-column grid table with branded header row. 12px radius with clipped overflow.
            </p>
            <div className={styles.twoColSubsection}>
              <div className={styles.twoColLeft}>
                <div className={styles.card}>
                  <div style={{ display: "flex", flexDirection: "column", borderRadius: "12px", overflow: "hidden", border: `1px solid ${tokens.colorNeutralStroke2}` }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", padding: "12px 16px", backgroundColor: tokens.colorBrandBackground2 }}>
                      <p style={{ fontSize: "14px", fontWeight: 600, margin: 0 }}>Name</p>
                      <p style={{ fontSize: "14px", fontWeight: 600, margin: 0 }}>Type</p>
                      <p style={{ fontSize: "14px", fontWeight: 600, margin: 0 }}>Credits</p>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", padding: "12px 16px", borderTop: `1px solid ${tokens.colorNeutralStroke2}` }}>
                      <p style={{ fontSize: "14px", margin: 0 }}>Email classification</p>
                      <p style={{ fontSize: "14px", margin: 0 }}>Prompt</p>
                      <p style={{ fontSize: "14px", margin: 0 }}>3</p>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "16px", padding: "12px 16px", borderTop: `1px solid ${tokens.colorNeutralStroke2}` }}>
                      <p style={{ fontSize: "14px", margin: 0 }}>Case creation</p>
                      <p style={{ fontSize: "14px", margin: 0 }}>Agent flow</p>
                      <p style={{ fontSize: "14px", margin: 0 }}>25</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.twoColRight}>
                <CodeBlock code={CSS_SNIPPETS.toolsTable} />
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════ */}
          {/* 7. NAVIGATION & OVERLAYS */}
          {/* ═══════════════════════════════════════════════════════ */}
          <div className={styles.dsSection}>
            <h2 className={styles.sectionTitle}>7. Navigation &amp; Overlays</h2>

            <div className={styles.subsection}>
              <h3 className={styles.subsectionTitle}>Sticky Nav Bar</h3>
              <p className={styles.subsectionDescription}>
                Category navigation tabs that stick to the top of the viewport when scrolled. 
                Gains background color and shadow on scroll via <code>isScrolled</code> state.
              </p>
              <CodeBlock code={CSS_SNIPPETS.stickyNav} />
            </div>

            <div className={styles.subsection}>
              <h3 className={styles.subsectionTitle}>Version Pill</h3>
              <p className={styles.subsectionDescription}>
                Fixed-position floating action button cluster (bottom-left). Brand background with white icons. 
                Contains Info and Design System buttons separated by a translucent divider.
              </p>
              <div className={styles.twoColSubsection}>
                <div className={styles.twoColLeft}>
                  <div className={styles.card}>
                    <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
                      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0, backgroundColor: "#464feb", borderRadius: "9999px", padding: "8px", boxShadow: "0 4px 16px rgba(70,79,235,0.3)" }}>
                        <div style={{ width: "36px", height: "36px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>ℹ</div>
                        <div style={{ width: "20px", height: "1px", backgroundColor: "rgba(255,255,255,0.3)" }} />
                        <div style={{ width: "36px", height: "36px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff" }}>🎨</div>
                      </div>
                      <p style={{ fontSize: "14px", color: tokens.colorNeutralForeground3, margin: 0 }}>← Live preview of the version pill</p>
                    </div>
                  </div>
                </div>
                <div className={styles.twoColRight}>
                  <CodeBlock code={CSS_SNIPPETS.versionPill} />
                </div>
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════ */}
          {/* 8. UTILITIES */}
          {/* ═══════════════════════════════════════════════════════ */}
          <div className={styles.dsSection}>
            <h2 className={styles.sectionTitle}>8. Utilities</h2>

            <div className={styles.subsection}>
              <h3 className={styles.subsectionTitle}>Large Output Display</h3>
              <p className={styles.subsectionDescription}>
                Used for large numeric metrics, such as estimated credit totals. 32px brand-colored text.
              </p>
              <div className={styles.twoColSubsection}>
                <div className={styles.twoColLeft}>
                  <div className={styles.card}>
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                      <p style={{ fontSize: "14px", margin: 0 }}>Total estimated credits</p>
                      <p style={{ fontSize: "32px", fontWeight: 600, color: "#464feb", margin: 0 }}>12,500</p>
                    </div>
                  </div>
                </div>
                <div className={styles.twoColRight}>
                  <CodeBlock code={CSS_SNIPPETS.outputValue} />
                </div>
              </div>
            </div>

            <div className={styles.subsection}>
              <h3 className={styles.subsectionTitle}>Legal Text</h3>
              <CodeBlock code={CSS_SNIPPETS.legalText} />
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════ */}
          {/* 9. DESIGN TOKENS REFERENCE */}
          {/* ═══════════════════════════════════════════════════════ */}
          <div className={styles.dsSection}>
            <h2 className={styles.sectionTitle}>9. Design Tokens Quick Reference</h2>
            <div className={styles.card}>
              <div style={{ overflowX: "auto" }}>
                <table className={styles.tokenTable}>
                  <thead>
                    <tr style={{ borderBottom: `2px solid ${tokens.colorNeutralStroke2}` }}>
                      <th style={{ textAlign: "left", padding: "8px 12px", fontWeight: 600, fontSize: "13px" }}>Token</th>
                      <th style={{ textAlign: "left", padding: "8px 12px", fontWeight: 600, fontSize: "13px" }}>Value</th>
                      <th style={{ textAlign: "left", padding: "8px 12px", fontWeight: 600, fontSize: "13px" }}>Usage</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { token: "Border Radius", value: "12px", usage: "Cards, panels, tables, selection chips" },
                      { token: "Border Radius (sm)", value: "8px", usage: "Icon containers, code blocks, flyout buttons" },
                      { token: "Border Radius (pill)", value: "9999px", usage: "Category pills, version pill" },
                      { token: "Border Width", value: "1px", usage: "All component borders" },
                      { token: "Border Style", value: "solid / dashed", usage: "Solid for containers, dashed for leader lines" },
                      { token: "Brand Border Left", value: "3px solid", usage: "Section title (h4) accent stripe" },
                      { token: "Shadow (elevation 1)", value: "0 2px 4px rgba(0,0,0,0.06)", usage: "Sticky nav on scroll" },
                      { token: "Shadow (elevation 3)", value: "0 4px 16px rgba(0,0,0,0.12), 0 12px 32px rgba(0,0,0,0.08)", usage: "Flyout menus" },
                      { token: "Shadow (brand)", value: "0 4px 16px rgba(70,79,235,0.3), 0 8px 32px rgba(0,0,0,0.12)", usage: "Version pill" },
                      { token: "Transition", value: "0.15s ease", usage: "Hover backgrounds, border-color changes" },
                      { token: "Max Content Width", value: "1600px", usage: "Body container max-width" },
                      { token: "Sticky Top", value: "76px", usage: "Calculation panel sticky offset" },
                      { token: "Sticky Nav Z-Index", value: "100", usage: "Nav bar stacking" },
                      { token: "Flyout Z-Index", value: "2001", usage: "Version menu, overlays" },
                    ].map((row, i) => (
                      <tr key={i} style={{ borderBottom: `1px solid ${tokens.colorNeutralStroke2}` }}>
                        <td style={{ padding: "8px 12px", fontWeight: 600, fontSize: "13px" }}>{row.token}</td>
                        <td style={{ padding: "8px 12px", fontFamily: "monospace", fontSize: "13px", color: tokens.colorNeutralForeground2 }}>{row.value}</td>
                        <td style={{ padding: "8px 12px", fontSize: "13px", color: tokens.colorNeutralForeground3 }}>{row.usage}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div style={{ paddingTop: "24px", paddingBottom: "48px", textAlign: "center" }}>
            <p style={{ fontSize: "14px", color: tokens.colorNeutralForeground3, margin: 0 }}>
              Copilot Studio Estimator Design System · Built with Fluent UI React v9 · <code>@fluentui/react-components</code>
            </p>
          </div>
        </div>
      </div>
    </FluentProvider>
  );
}

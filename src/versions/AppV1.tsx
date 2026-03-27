import { useState, useEffect, useRef } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  FluentProvider,
  createLightTheme,
  makeStyles,
  tokens,
  Button,
  Input,
  Label,
  Link,
  Checkbox,
  Badge,
} from "@fluentui/react-components";
import type { BrandVariants } from "@fluentui/react-components";
import { 
  AddRegular,
  DeleteRegular,
  ArrowSyncRegular,
  ArrowDownloadRegular,
  ChevronDownRegular,
  ChevronUpRegular,
  PeopleRegular,
  InfoRegular,
  CheckmarkRegular,
} from "@fluentui/react-icons";

interface VersionProps {
  currentVersion: string;
  onVersionChange: (version: string) => void;
  versions: { id: string; label: string; description: string }[];
}

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

const useStyles = makeStyles({
  appContainer: {
    backgroundColor: tokens.colorNeutralBackground2,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    minHeight: "100vh",
  },
  bodyContainer: {
    display: "flex",
    flexDirection: "column" as const,
    gap: "0px",
    maxWidth: "1600px",
    width: "100%",
    margin: "0 auto",
    paddingTop: "24px",
    paddingBottom: "48px",
    paddingLeft: "clamp(24px, 5vw, 80px)",
    paddingRight: "clamp(24px, 5vw, 80px)",
    boxSizing: "border-box" as const,
  },
  twoColumnLayout: {
    display: "flex",
    flexDirection: "row" as const,
    gap: "24px",
    width: "100%",
    alignItems: "flex-start",
  },
  estimationColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    flex: "1 1 0",
    minWidth: 0,
  },
  productCategorySection: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    padding: "32px 48px",
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "8px",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  categoryCatalogGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "16px",
  },
  categoryCatalogItem: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    padding: "16px",
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: "8px",
    position: "relative" as const,
    cursor: "pointer",
    transition: "background-color 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease",
  },
  categoryCatalogItemSelected: {
    borderTopColor: tokens.colorBrandBackground,
    borderRightColor: tokens.colorBrandBackground,
    borderBottomColor: tokens.colorBrandBackground,
    borderLeftColor: tokens.colorBrandBackground,
  },
  categoryGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "8px 24px",
  },
  productCard: {
    display: "flex",
    flexDirection: "column",
    gap: "32px",
    padding: "32px 48px",
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "12px",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  productSelectionSection: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    padding: "32px 48px",
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "8px",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  productChipsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
    gap: "16px",
    alignItems: "start",
  },
  productChip: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    padding: "16px",
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: "8px",
    position: "relative" as const,
    cursor: "pointer",
    transition: "background-color 0.15s ease, box-shadow 0.15s ease, border-color 0.15s ease",
  },
  productChipSelected: {
    borderTopColor: tokens.colorBrandBackground,
    borderRightColor: tokens.colorBrandBackground,
    borderBottomColor: tokens.colorBrandBackground,
    borderLeftColor: tokens.colorBrandBackground,
  },
  chipTopRow: {
    display: "flex",
    alignItems: "flex-start",
    gap: "16px",
  },
  chipIcon: {
    width: "48px",
    height: "48px",
    backgroundColor: tokens.colorBrandBackground2,
    borderRadius: "8px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    fontSize: "28px",
  },
  chipContent: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    flex: 1,
  },
  chipTitle: {
    fontSize: "16px",
    lineHeight: "22px",
    fontWeight: 600,
    color: tokens.colorNeutralForeground1,
    margin: 0,
    textWrap: "pretty" as const,
  },
  chipDescription: {
    fontSize: "14px",
    lineHeight: "20px",
    color: tokens.colorNeutralForeground3,
    margin: 0,
  },
  categoryPill: {
    display: "inline-flex",
    alignItems: "center",
    gap: "4px",
    padding: "2px 8px",
    borderRadius: "9999px",
    fontSize: "12px",
    lineHeight: "16px",
    fontWeight: 500,
    color: tokens.colorNeutralForeground3,
    backgroundColor: tokens.colorNeutralBackground4,
    whiteSpace: "nowrap" as const,
    width: "fit-content",
  },
  chipActions: {
    display: "flex",
    gap: "8px",
    alignItems: "center",
    position: "relative" as const,
  },
  badgeWrapper: {
    position: "relative" as const,
    display: "inline-flex",
  },
  countBadge: {
    position: "absolute" as const,
    top: "-8px",
    right: "-8px",
    minWidth: "14px",
    height: "14px",
    borderRadius: "50%",
    fontSize: "9px",
    fontWeight: 600,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 3px",
  },
  productCardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: "16px",
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  productTitle: {
    fontSize: "20px",
    lineHeight: "28px",
    fontWeight: 600,
    color: tokens.colorNeutralForeground1,
    margin: 0,
  },
  addProductButton: {
    marginTop: "16px",
  },
  headerSection: {
    display: "flex",
    flexDirection: "column",
    gap: "0px",
    width: "100%",
  },
  headerCard: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    padding: "24px 48px 24px",
    boxSizing: "border-box" as const,
  },
  headline: {
    fontSize: "36px",
    lineHeight: "44px",
    fontWeight: 700,
    color: tokens.colorBrandForeground1,
    textAlign: "center" as const,
    margin: 0,
  },
  headerDescription: {
    fontSize: "14px",
    lineHeight: "22px",
    color: tokens.colorNeutralForeground2,
    textAlign: "center" as const,
    maxWidth: "960px",
    margin: 0,
  },
  creditCard: {
    display: "flex",
    alignItems: "center",
    width: "fit-content",
    margin: "0 auto",
    padding: "24px 32px",
    backgroundColor: tokens.colorNeutralBackground1,
    borderRadius: "12px",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    boxSizing: "border-box" as const,
  },
  creditContent: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flex: "1 0 0",
    gap: "4px",
  },
  creditTitle: {
    fontSize: "18px",
    lineHeight: "24px",
    fontWeight: 600,
    color: "#242424",
    margin: 0,
  },
  creditLink: {
    fontSize: "14px",
    lineHeight: "20px",
    color: tokens.colorNeutralForeground3,
    margin: 0,
  },
  navContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    gap: "12px",
    flexWrap: "wrap" as const,
  },
  stickyNav: {
    position: "sticky" as const,
    top: 0,
    zIndex: 100,
    padding: "12px 24px 24px 24px",
    transition: "background-color 0.2s ease, box-shadow 0.2s ease",
    marginLeft: "-24px",
    marginRight: "-24px",
    width: "calc(100% + 48px)",
  },
  section: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    width: "100%",
  },
  sectionBorder: {
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    paddingBottom: "32px",
  },
  h4Container: {
    display: "flex",
    gap: "0px",
    alignItems: "center",
    width: "100%",
  },
  h4Content: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
    flex: "1 0 0",
  },
  h4Title: {
    fontSize: "16px",
    lineHeight: "22px",
    fontWeight: 600,
    color: tokens.colorNeutralForeground1,
    margin: 0,
    borderLeft: `3px solid ${tokens.colorBrandBackground}`,
    paddingLeft: "12px",
  },
  h6Title: {
    fontSize: "14px",
    lineHeight: "20px",
    fontWeight: 600,
    color: tokens.colorNeutralForeground1,
    margin: 0,
  },
  sectionDescription: {
    fontSize: "14px",
    lineHeight: "20px",
    color: tokens.colorNeutralForeground3,
    width: "100%",
    margin: 0,
  },
  radioContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "0px",
    alignItems: "flex-start",
    justifyContent: "center",
    width: "100%",
  },
  radioChoices: {
    display: "flex",
    gap: "8px",
    alignItems: "center",
    minWidth: "400px",
    width: "100%",
  },
  inputsRow: {
    display: "flex",
    flexWrap: "wrap" as const,
    gap: "16px",
    alignItems: "flex-end",
    width: "100%",
  },
  inputColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    flex: "1 0 0",
    minWidth: "196px",
  },
  outputColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    flex: "1 0 0",
  },
  outputLabel: {
    fontSize: "14px",
    lineHeight: "20px",
    color: "black",
    margin: 0,
  },
  outputValue: {
    fontSize: "32px",
    lineHeight: "40px",
    fontWeight: 600,
    color: tokens.colorBrandBackground,
    margin: 0,
  },
  calculationPanel: {
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke2}`,
    display: "flex",
    flexDirection: "column",
    gap: "0px",
    flex: "1 1 0",
    minWidth: 0,
    maxHeight: "calc(100vh - 76px)",
    position: "sticky" as const,
    top: "76px",
    alignSelf: "flex-start",
    borderRadius: "16px",
  },
  calcStickyHeader: {
    flexShrink: 0,
    backgroundColor: tokens.colorNeutralBackground1,
    padding: "32px 32px 20px 32px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    alignItems: "center",
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    borderRadius: "16px 16px 0 0",
  },
  calcScrollArea: {
    overflowY: "auto" as const,
    flex: "1 1 0%",
    minHeight: "0px",
    padding: "20px 32px 32px 32px",
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  totalHeading: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    width: "100%",
  },
  totalText: {
    fontSize: "20px",
    lineHeight: "28px",
    fontWeight: 700,
    color: tokens.colorNeutralForeground1,
    margin: 0,
  },
  totalValue: {
    fontSize: "20px",
    lineHeight: "28px",
    fontWeight: 700,
    color: tokens.colorNeutralForeground1,
    margin: 0,
  },
  expandedSection: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    overflow: "auto",
    width: "100%",
  },
  calcSectionContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    width: "100%",
    paddingBottom: "20px",
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    '&:last-child': {
      borderBottom: "none",
      paddingBottom: 0,
    },
  },
  calcH4Container: {
    display: "flex",
    flexDirection: "column",
    gap: "4px",
    width: "100%",
  },
  calcH4Heading: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  calcH4Text: {
    flex: "1 0 0",
    fontSize: "16px",
    lineHeight: "22px",
    fontWeight: 600,
    color: tokens.colorNeutralForeground1,
    paddingRight: "24px",
    maxWidth: "360px",
    margin: 0,
  },
  calcH4Value: {
    fontSize: "16px",
    lineHeight: "22px",
    fontWeight: 600,
    color: tokens.colorNeutralForeground1,
    margin: 0,
  },
  calcH5Text: {
    flex: "1 0 0",
    fontSize: "14px",
    lineHeight: "20px",
    fontWeight: 600,
    color: tokens.colorNeutralForeground1,
    paddingRight: "24px",
    maxWidth: "460px",
    margin: 0,
  },
  calcH5Value: {
    fontSize: "14px",
    lineHeight: "20px",
    fontWeight: 600,
    color: tokens.colorNeutralForeground1,
    margin: 0,
  },
  calcH6Container: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
    width: "100%",
  },
  calcItemRow: {
    display: "flex",
    alignItems: "baseline",
    gap: "8px",
    width: "100%",
    boxSizing: "border-box" as const,
    paddingTop: "4px",
    paddingBottom: "4px",
    paddingLeft: "15px",
  },
  calcNegationRow: {
    display: "flex",
    alignItems: "baseline",
    gap: "8px",
    width: "100%",
    boxSizing: "border-box" as const,
    paddingTop: "4px",
    paddingBottom: "4px",
    paddingLeft: "15px",
  },
  calcNegationLabel: {
    fontSize: "14px",
    lineHeight: "20px",
    color: tokens.colorNeutralForeground2,
    margin: 0,
  },
  calcLeader: {
    flex: "1 1 0",
    borderBottom: `1px dashed ${tokens.colorNeutralStroke2}`,
    minWidth: "16px",
    alignSelf: "baseline" as const,
    marginBottom: "4px",
  },
  calcNegationValue: {
    fontSize: "14px",
    lineHeight: "20px",
    fontWeight: 600,
    color: "#107c41",
    margin: 0,
    flexShrink: 0,
    whiteSpace: "nowrap" as const,
  },
  calcItemContent: {
    display: "flex",
    flex: "1 0 0",
    alignItems: "center",
    justifyContent: "space-between",
  },
  calcItemText: {
    display: "flex",
    flex: "1 0 0",
    gap: "6px",
    paddingRight: "24px",
  },
  bulletContainer: {
    display: "flex",
    height: "20px",
    alignItems: "center",
    maxHeight: "20px",
  },
  bullet: {
    width: "4px",
    height: "4px",
    maxWidth: "4px",
    maxHeight: "4px",
    backgroundColor: tokens.colorNeutralForeground1,
    borderRadius: "9999px",
  },
  calcItemLabel: {
    fontSize: "14px",
    lineHeight: "20px",
    color: tokens.colorNeutralForeground2,
    margin: 0,
  },
  calcItemValue: {
    fontSize: "14px",
    lineHeight: "20px",
    fontWeight: 600,
    color: tokens.colorNeutralForeground1,
    margin: 0,
    flexShrink: 0,
    whiteSpace: "nowrap" as const,
  },
  calcDescription: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
    paddingLeft: "10px",
    maxWidth: "460px",
    width: "100%",
  },
  calcDescriptionText: {
    fontSize: "14px",
    lineHeight: "20px",
    color: tokens.colorNeutralForeground3,
    maxWidth: "360px",
    width: "100%",
    margin: 0,
  },
  legalContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: "1200px",
    width: "100%",
    paddingBottom: "96px",
    paddingLeft: "56px",
    paddingRight: "56px",
    margin: "0 auto",
  },
  legalText: {
    flex: "1 0 0",
    fontSize: "14px",
    lineHeight: "20px",
    color: tokens.colorNeutralForeground2,
    textAlign: "center" as const,
    margin: 0,
  },
  tableRow: {
    display: "flex",
    flexWrap: "wrap" as const,
    gap: "8px",
    alignItems: "center",
    width: "100%",
  },
  tableLabel: {
    fontSize: "16px",
    lineHeight: "22px",
    color: "black",
    margin: 0,
    width: "155px",
    maxWidth: "155px",
  },
  tableInput: {
    flex: "1 0 0",
  },
  sectionHeader: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  toolsTable: {
    display: "flex",
    flexDirection: "column",
    borderRadius: "8px",
    overflow: "hidden",
    border: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  toolsTableHeader: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "16px",
    padding: "12px 16px",
    backgroundColor: tokens.colorBrandBackground2,
  },
  toolsTableHeaderCell: {
    fontSize: "14px",
    lineHeight: "20px",
    fontWeight: 600,
    color: tokens.colorNeutralForeground1,
    margin: 0,
  },
  toolsTableRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr 1fr",
    gap: "16px",
    padding: "12px 16px",
    alignItems: "center",
    borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
  },
  toolsTableCell: {
    fontSize: "14px",
    lineHeight: "20px",
    color: tokens.colorNeutralForeground1,
    margin: 0,
  },
});

type ProductCategory = "Copilot Studio Custom" | "Dynamics 365 Sales" | "Dynamics 365 Service" | "Dynamics ERP" | "Microsoft 365" | "";

interface Product {
  id: number;
  productId: string;
  category: ProductCategory;
  name: string;
  agentType: "customer-facing" | "employee-facing" | "";
  m365LicenseCount: string;
  customerOrPartner: "customer" | "partner" | "";
  users: string;
  interactionsPerMonth: string;
  turnsPerInteraction: string;
  knowledgePercent: string;
  tenantGraphPercent: string;
  usePrompt: boolean;
  useAgentFlow: boolean;
  useComputerUse: boolean;
  useCustomConnector: boolean;
  useMCP: boolean;
  useRESTAPI: boolean;
  promptCount: string;
  promptFreq: string;
  agentFlowCount: string;
  agentFlowFreq: string;
  computerUseCount: string;
  computerUseFreq: string;
  customConnectorCount: string;
  customConnectorFreq: string;
  mcpCount: string;
  mcpFreq: string;
  restApiCount: string;
  restApiFreq: string;
  promptBasicCount: string;
  promptBasicFreq: string;
  promptStandardCount: string;
  promptStandardFreq: string;
  promptPremiumCount: string;
  promptPremiumFreq: string;
  agentFlowConfiguredCount: string;
  agentFlowActionsCount: string;
}

interface ProductDefinition {
  id: string;
  name: string;
  description: string;
  category: ProductCategory;
}

const AllProducts: ProductDefinition[] = [
  // Dynamics 365 Service
  { id: "customer-intent", name: "Customer intent agent", description: "Present your services, products and yourself in professional way.", category: "Dynamics 365 Service" },
  { id: "customer-knowledge", name: "Customer knowledge management agent", description: "Manage and organize customer knowledge effectively.", category: "Dynamics 365 Service" },
  { id: "case-management", name: "Case management agent", description: "Streamline case management workflows.", category: "Dynamics 365 Service" },
  { id: "quality-eval", name: "Quality evaluation agent", description: "Evaluate and improve service quality.", category: "Dynamics 365 Service" },
  // Dynamics 365 Sales
  { id: "sales-qualification", name: "Sales qualification agent", description: "Qualify leads and prioritize sales opportunities.", category: "Dynamics 365 Sales" },
  // Copilot Studio Custom
  { id: "custom-employee-facing", name: "Custom employee facing agent", description: "Custom agents for internal employee-facing scenarios.", category: "Copilot Studio Custom" },
  { id: "custom-customer-facing", name: "Custom customer facing agent", description: "Custom agents for external customer-facing scenarios.", category: "Copilot Studio Custom" },
  // Dynamics ERP
  { id: "business-central", name: "Business Central", description: "Pre-built agent for Business Central workflows.", category: "Dynamics ERP" },
  // Microsoft 365
  { id: "copilot-chat", name: "Copilot Chat", description: "AI-powered chat assistant for Microsoft 365 users.", category: "Microsoft 365" },
  { id: "employee-self-service", name: "Employee Self Service", description: "Self-service agent for common employee requests and tasks.", category: "Microsoft 365" },
];

function AppV1({ currentVersion, onVersionChange, versions }: VersionProps) {
  const styles = useStyles();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<ProductCategory[]>([]);
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [timePeriod, setTimePeriod] = useState<"month" | "year">("month");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCategoryCollapsed, setIsCategoryCollapsed] = useState(false);
  const [isAgentCollapsed, setIsAgentCollapsed] = useState(false);
  const [versionMenuOpen, setVersionMenuOpen] = useState(false);
  const [collapsedForms, setCollapsedForms] = useState<Set<number>>(new Set());
  const [collapsedEstimations, setCollapsedEstimations] = useState<Set<number>>(new Set());
  const navRef = useRef<HTMLDivElement>(null);
  const navSentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (navSentinelRef.current) {
        setIsScrolled(navSentinelRef.current.getBoundingClientRect().bottom <= 0);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleReset = () => {
    setProducts([]);
    setSelectedCategories([]);
    setSelectedProductIds([]);
    setTimePeriod("month");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleCategory = (category: ProductCategory) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const visibleProducts = AllProducts.filter(p => selectedCategories.includes(p.category));

  const addProduct = (productId: string, productName: string, category: ProductCategory) => {
    // Count how many of this product type already exist
    const existingCount = products.filter(p => p.productId === productId).length;
    const numberedName = `${productName} ${existingCount + 1}`;
    
    const newProduct: Product = {
      id: Date.now(),
      productId: productId,
      category: category,
      name: numberedName,
      agentType: "",
      m365LicenseCount: "",
      customerOrPartner: "",
      users: "",
      interactionsPerMonth: "",
      turnsPerInteraction: "",
      knowledgePercent: "",
      tenantGraphPercent: "",
      usePrompt: false,
      useAgentFlow: false,
      useComputerUse: false,
      useCustomConnector: false,
      useMCP: false,
      useRESTAPI: false,
      promptCount: "",
      promptFreq: "",
      agentFlowCount: "",
      agentFlowFreq: "",
      computerUseCount: "",
      computerUseFreq: "",
      customConnectorCount: "",
      customConnectorFreq: "",
      mcpCount: "",
      mcpFreq: "",
      restApiCount: "",
      restApiFreq: "",
      promptBasicCount: "",
      promptBasicFreq: "",
      promptStandardCount: "",
      promptStandardFreq: "",
      promptPremiumCount: "",
      promptPremiumFreq: "",
      agentFlowConfiguredCount: "",
      agentFlowActionsCount: "",
    };
    
    setProducts([...products, newProduct]);
    setSelectedProductIds([...selectedProductIds, productId]);
  };

  const removeProduct = (id: number, productId: string) => {
    setProducts(products.filter(p => p.id !== id));
    setSelectedProductIds(selectedProductIds.filter(pid => pid !== productId));
  };

  const updateProduct = (id: number, updates: Partial<Product>) => {
    setProducts(products.map(p => p.id === id ? { ...p, ...updates } : p));
  };

  const calculateProductCredits = (product: Product): number => {
    const users = parseInt(product.users) || 0;
    const m365Count = parseInt(product.m365LicenseCount) || 0;
    const interactions = parseInt(product.interactionsPerMonth) || 0;
    const knowledgePct = (parseInt(product.knowledgePercent) || 0) / 100;
    const tenantGraphPct = (parseInt(product.tenantGraphPercent) || 0) / 100;
    const otherKnowledgePct = 1 - tenantGraphPct;

    // Billable users (zero-rated for Microsoft 365 Copilot license holders)
    const billableUsers = Math.max(users - m365Count, 0);
    const agentTraffic = billableUsers * interactions;

    // Knowledge messages
    const trafficRequiringKnowledge = agentTraffic * knowledgePct;
    const ttgMessages = trafficRequiringKnowledge * tenantGraphPct * 12;
    const otherKnowledgeMessages = trafficRequiringKnowledge * otherKnowledgePct * 2;
    // knowledgeMessages = ttgMessages + otherKnowledgeMessages (used individually below)

    // Agent tools/actions messages (generative): billableUsers * interactions * toolInvocations * 5 messages per tool
    const promptToolCount = parseInt(product.promptCount) || 0;
    const computerUseCount = parseInt(product.computerUseCount) || 0;
    const customConnectorCount = parseInt(product.customConnectorCount) || 0;
    const mcpCount = parseInt(product.mcpCount) || 0;
    const restApiCount = parseInt(product.restApiCount) || 0;
    const totalToolInvocations = promptToolCount + computerUseCount + customConnectorCount + mcpCount + restApiCount;
    const actionsMessages = agentTraffic * totalToolInvocations * 5;

    // Agent flows: # of flows x # runs per month x 1.69
    const flowsConfigured = parseInt(product.agentFlowConfiguredCount) || 0;
    const flowActionsCount = parseInt(product.agentFlowActionsCount) || 0;
    // Using 0.13 per action (13 messages per 100 actions)
    const flowsMessages = flowsConfigured * flowActionsCount * 0.13 * interactions;

    // Optional modifiers (prompts) with Copilot license zero-rating
    const copilotRatio = users > 0 ? (users - m365Count) / users : 1;
    const basicCount = parseInt(product.promptBasicCount) || 0;
    const basicFreq = parseFloat(product.promptBasicFreq) || 0;
    const standardCount = parseInt(product.promptStandardCount) || 0;
    const standardFreq = parseFloat(product.promptStandardFreq) || 0;
    const premiumCount = parseInt(product.promptPremiumCount) || 0;
    const premiumFreq = parseFloat(product.promptPremiumFreq) || 0;

    // Basic: # prompts x 0.1 message x 3.073 x copilotRatio
    const basicMessages = basicCount * basicFreq * 0.1 * 3.073 * copilotRatio;
    // Standard: # prompts x 1.5 messages x 4.945 x copilotRatio
    const standardMessages = standardCount * standardFreq * 1.5 * 4.945 * copilotRatio;
    // Premium: # prompts x 10 messages x 7.091 x copilotRatio
    const premiumMessages = premiumCount * premiumFreq * 10 * 7.091 * copilotRatio;
    const modifierMessages = basicMessages + standardMessages + premiumMessages;

    // Determine agent type from category
    const isB2C = product.productId === "custom-customer-facing";
    // B2C excludes TTG messages
    const totalMessages = isB2C
      ? otherKnowledgeMessages + actionsMessages + flowsMessages + modifierMessages
      : ttgMessages + otherKnowledgeMessages + actionsMessages + flowsMessages + modifierMessages;

    return Math.round(totalMessages);
  };

  const totalCredits = products.reduce((sum, product) => sum + calculateProductCredits(product), 0);

  const calculateProductNegation = (product: Product): number => {
    const users = parseInt(product.users) || 0;
    const m365Count = parseInt(product.m365LicenseCount) || 0;
    if (users === 0 || m365Count === 0) return 0;
    const interactions = parseInt(product.interactionsPerMonth) || 0;
    const knowledgePct = (parseInt(product.knowledgePercent) || 0) / 100;
    const tenantGraphPct = (parseInt(product.tenantGraphPercent) || 0) / 100;
    const otherKnowledgePct = 1 - tenantGraphPct;

    // Gross credits (all users, no zero-rating)
    const grossTraffic = users * interactions;
    const grossKnowledge = grossTraffic * knowledgePct;
    const grossTtg = grossKnowledge * tenantGraphPct * 12;
    const grossOther = grossKnowledge * otherKnowledgePct * 2;
    const grossKnowledgeCredits = Math.round(grossTtg) + Math.round(grossOther);

    const promptToolCount = parseInt(product.promptCount) || 0;
    const computerUseCount = parseInt(product.computerUseCount) || 0;
    const customConnectorCount = parseInt(product.customConnectorCount) || 0;
    const mcpCount = parseInt(product.mcpCount) || 0;
    const restApiCount = parseInt(product.restApiCount) || 0;
    const totalToolInvocations = promptToolCount + computerUseCount + customConnectorCount + mcpCount + restApiCount;
    const grossToolsCredits = Math.round(grossTraffic * totalToolInvocations * 5);

    const flowsConfigured = parseInt(product.agentFlowConfiguredCount) || 0;
    const flowActionsCount = parseInt(product.agentFlowActionsCount) || 0;
    const grossFlowsCredits = Math.round(flowsConfigured * flowActionsCount * 0.13 * interactions);

    const basicCount = parseInt(product.promptBasicCount) || 0;
    const basicFreq = parseFloat(product.promptBasicFreq) || 0;
    const standardCount = parseInt(product.promptStandardCount) || 0;
    const standardFreq = parseFloat(product.promptStandardFreq) || 0;
    const premiumCount = parseInt(product.promptPremiumCount) || 0;
    const premiumFreq = parseFloat(product.promptPremiumFreq) || 0;
    // Gross modifiers (copilotRatio = 1, no zero-rating)
    const grossModifiers = Math.round(basicCount * basicFreq * 0.1 * 3.073) + Math.round(standardCount * standardFreq * 1.5 * 4.945) + Math.round(premiumCount * premiumFreq * 10 * 7.091);

    const isB2C = product.productId === "custom-customer-facing";
    const grossTotal = isB2C
      ? Math.round(grossOther) + grossToolsCredits + grossFlowsCredits + grossModifiers
      : grossKnowledgeCredits + grossToolsCredits + grossFlowsCredits + grossModifiers;

    // Net credits are already calculated by calculateProductCredits
    const netTotal = calculateProductCredits(product);
    return grossTotal - netTotal;
  };

  const totalNegated = products.reduce((sum, product) => sum + calculateProductNegation(product), 0);

  const timeMultiplier = timePeriod === "year" ? 12 : 1;
  const displayCredits = totalCredits * timeMultiplier;
  // @ts-expect-error TS6133 - computed for future use
  const displayNegated = totalNegated * timeMultiplier;

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const purple = [70, 79, 235] as const;

    // Title
    doc.setFontSize(18);
    doc.setTextColor(purple[0], purple[1], purple[2]);
    doc.text("Microsoft Agent Usage Estimator", 14, 20);

    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(`Generated: ${new Date().toLocaleDateString()} | Period: Per ${timePeriod}`, 14, 28);

    // Summary
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text("Summary", 14, 40);

    autoTable(doc, {
      startY: 44,
      head: [["Metric", "Value"]],
      body: [
        ["Total Estimated Copilot Credits", displayCredits.toLocaleString()],
        ["Time Period", `Per ${timePeriod}`],
      ],
      theme: "grid",
      headStyles: { fillColor: [purple[0], purple[1], purple[2]] },
    });

    // Per-product details
    if (products.length > 0) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let currentY = (doc as any).lastAutoTable?.finalY ?? 70;

      products.forEach((product) => {
        const users = parseInt(product.users) || 0;
        const m365Count = parseInt(product.m365LicenseCount) || 0;
        const interactions = parseInt(product.interactionsPerMonth) || 0;
        const productCredits = calculateProductCredits(product);
        // @ts-expect-error TS6133 - computed for future use
        const productNegation = calculateProductNegation(product);

        currentY += 10;
        if (currentY > 260) {
          doc.addPage();
          currentY = 20;
        }

        doc.setFontSize(12);
        doc.setTextColor(purple[0], purple[1], purple[2]);
        doc.text(product.name, 14, currentY);
        currentY += 2;

        const formData: (string | number)[][] = [
          ["Category", product.category],
          ["Agent Type", product.agentType || "\u2014"],
          ["Users", users],
          ["Microsoft 365 Copilot Licenses", m365Count],
          ["Interactions / Month", interactions],
          ["Knowledge %", product.knowledgePercent || "0"],
          ["Tenant Graph %", product.tenantGraphPercent || "0"],
          ["Net Credits (" + timePeriod + ")", (productCredits * timeMultiplier).toLocaleString()],
        ];

        autoTable(doc, {
          startY: currentY,
          head: [["Parameter", "Value"]],
          body: formData.map(row => [String(row[0]), String(row[1])]),
          theme: "grid",
          headStyles: { fillColor: [purple[0], purple[1], purple[2]] },
        });

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        currentY = (doc as any).lastAutoTable?.finalY ?? currentY + 40;
      });
    }

    // Legal
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const finalY = (doc as any).lastAutoTable?.finalY ?? 200;
    if (finalY > 250) doc.addPage();
    const legalY = finalY > 250 ? 20 : finalY + 10;
    doc.setFontSize(7);
    doc.setTextColor(150, 150, 150);
    const legalText = "The Copilot Studio estimator is not a binding offer nor a guarantee of the final cost or availability of the product. This estimate should be regarded only as guidance.";
    doc.text(legalText, 14, legalY, { maxWidth: 180 });

    doc.save("copilot-credit-estimate.pdf");
  };

  return (
    <FluentProvider theme={customTheme} style={{ overflow: "visible" }}>
      <div className={styles.appContainer}>
        <div className={styles.bodyContainer}>
              {/* Header */}
              <div style={{ width: "100%", marginBottom: "20px" }}>
                <div className={styles.headerSection}>
                  <div className={styles.headerCard}>
                    <p className={styles.headline}>Microsoft agent usage estimator</p>
                    <p className={styles.headerDescription}>
                      Use the estimator to forecast your agent's Copilot credit volume. Select from licensing options, agent types, and the features your agent leverages to respond to your end users. See the Copilot credit consumption impact based on these selections. This estimator provides a monthly Copilot credit informational estimate for a single agent and makes no guarantees of final costs. While message rates and currency converter links are provided here for your convenience, this tool should not be used as a pricing calculator or a way to create definite forecasts around your monthly expenses.
                    </p>
                  </div>

                  <div className={styles.creditCard}>
                    <div className={styles.creditContent}>
                      <p className={styles.creditTitle}>1 Copilot credit = $.01</p>
                      <p className={styles.creditLink}>
                        Go <Link href="#">here</Link> to convert to your currency.
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              <div ref={navSentinelRef} style={{ height: 0 }} />
              <div
                ref={navRef}
                className={`${styles.stickyNav}`}
                style={{
                  backgroundColor: isScrolled ? tokens.colorNeutralBackground1 : "transparent",
                  boxShadow: isScrolled ? "0 2px 8px rgba(0,0,0,0.1)" : "none",
                  borderRadius: isScrolled ? "0 0 12px 12px" : "0",
                }}
              >
                <div className={styles.navContainer}>
                  <Button
                    appearance="primary"
                    size="large"
                    icon={<ArrowSyncRegular />}
                    onClick={handleReset}
                    onMouseEnter={(e) => { e.currentTarget.style.filter = "brightness(0.85)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.filter = "none"; }}
                  >Reset</Button>
                  <Button
                    appearance="outline"
                    size="large"
                    icon={<ArrowDownloadRegular />}
                    onClick={handleDownloadPDF}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#ebebeb"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = ""; }}
                  >Download Results</Button>
                  <Button
                    appearance="outline"
                    size="large"
                    onClick={() => window.open("https://signup.microsoft.com/get-started/signup?products=25a8ddb8-34ca-4a93-828d-95a68d02e3a9&mproducts=CFQ7TTC0LH1F:000P&fmproducts=CFQ7TTC0LH1F:000P&culture=en-us&country=us&ali=1", "_blank")}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#ebebeb"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = ""; }}
                  >Buy Copilot Credits</Button>
                  <Button
                    appearance="outline"
                    size="large"
                    onClick={() => window.open("https://www.microsoft.com/en-us/microsoft-365-copilot", "_blank")}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#ebebeb"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = ""; }}
                  >Free Copilot Chat</Button>
                </div>
              </div>

              {/* Product Category Selection */}
              <div style={{ width: "100%", marginBottom: "16px" }}>
                <div className={styles.productCategorySection}>
                  <div
                    style={{ cursor: "pointer", userSelect: "none" }}
                    onClick={() => setIsCategoryCollapsed(prev => !prev)}
                  >
                    <div style={{ display: "flex", alignItems: "center" }}>
                      <button
                        onClick={(e) => { e.stopPropagation(); setIsCategoryCollapsed(prev => !prev); }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = tokens.colorNeutralBackground4;
                          e.currentTarget.style.borderColor = "#464feb";
                          const svg = e.currentTarget.querySelector("svg");
                          if (svg) svg.style.color = "#464feb";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = "transparent";
                          e.currentTarget.style.borderColor = "transparent";
                          const svg = e.currentTarget.querySelector("svg");
                          if (svg) svg.style.color = tokens.colorNeutralForeground3;
                        }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "28px",
                          height: "28px",
                          borderRadius: "50%",
                          border: "1px solid transparent",
                          backgroundColor: "transparent",
                          cursor: "pointer",
                          outline: "none",
                          padding: 0,
                          marginLeft: "-36px",
                          marginRight: "8px",
                          flexShrink: 0,
                          transition: "background-color 0.15s ease, border-color 0.15s ease",
                        }}
                      >
                        {isCategoryCollapsed ? <ChevronDownRegular style={{ color: tokens.colorNeutralForeground3, fontSize: "16px", transition: "color 0.15s ease" }} /> : <ChevronUpRegular style={{ color: tokens.colorNeutralForeground3, fontSize: "16px", transition: "color 0.15s ease" }} />}
                      </button>
                      <h2 style={{ fontSize: "20px", fontWeight: 600, margin: 0 }}>
                        Select agent category or categories
                      </h2>
                    </div>
                    {!isCategoryCollapsed && (
                      <p className={styles.sectionDescription} style={{ marginTop: "8px" }}>
                        Choose an agent category to begin configuring your agent estimation.
                      </p>
                    )}
                  </div>
                  {!isCategoryCollapsed && (
                  <div className={styles.categoryCatalogGrid}>
                    {[
                      { name: "Copilot Studio Custom" as ProductCategory, description: "Build custom agents for employee or customer-facing scenarios.", icon: <svg width="28" height="28" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#cs_clip)"><path d="M31.8232 6.0311C26.8849 4.38497 24.4153 3.56235 22.708 4.79281C21.0007 6.02337 21.001 8.62627 21.001 13.8319V18.3788L15.8223 16.6532C10.8839 15.007 8.41432 14.1843 6.70703 15.4149C4.99999 16.6455 5 19.2486 5 24.4539V31.786C5 34.6462 5.00036 36.0765 5.77637 37.1532C6.55238 38.2298 7.90874 38.6823 10.6221 39.5868L18.3555 42.1649C21.1836 43.1076 22.598 43.5788 24.0205 43.3846C25.4432 43.1902 26.6795 42.3563 29.1514 40.6893L37.5654 35.0145C40.2278 33.219 41.5593 32.3214 42.2812 30.9637C43.003 29.6062 43.0029 28.0007 43.0029 24.7899V18.6034H43V15.6834C43 12.8233 42.9996 11.3929 42.2236 10.3163C41.4476 9.23982 40.0911 8.78704 37.3779 7.88266L31.8232 6.0311Z" fill="url(#cs_p0)"/><path d="M31.8232 6.0311C26.8849 4.38497 24.4153 3.56235 22.708 4.79281C21.0007 6.02337 21.001 8.62627 21.001 13.8319V18.3788L15.8223 16.6532C10.8839 15.007 8.41432 14.1843 6.70703 15.4149C4.99999 16.6455 5 19.2486 5 24.4539V31.786C5 34.6462 5.00036 36.0765 5.77637 37.1532C6.55238 38.2298 7.90874 38.6823 10.6221 39.5868L18.3555 42.1649C21.1836 43.1076 22.598 43.5788 24.0205 43.3846C25.4432 43.1902 26.6795 42.3563 29.1514 40.6893L37.5654 35.0145C40.2278 33.219 41.5593 32.3214 42.2812 30.9637C43.003 29.6062 43.0029 28.0007 43.0029 24.7899V18.6034H43V15.6834C43 12.8233 42.9996 11.3929 42.2236 10.3163C41.4476 9.23982 40.0911 8.78704 37.3779 7.88266L31.8232 6.0311Z" fill="url(#cs_p1)"/><path d="M31.8232 6.0311C26.8849 4.38497 24.4153 3.56235 22.708 4.79281C21.0007 6.02337 21.001 8.62627 21.001 13.8319V18.3788L15.8223 16.6532C10.8839 15.007 8.41432 14.1843 6.70703 15.4149C4.99999 16.6455 5 19.2486 5 24.4539V31.786C5 34.6462 5.00036 36.0765 5.77637 37.1532C6.55238 38.2298 7.90874 38.6823 10.6221 39.5868L18.3555 42.1649C21.1836 43.1076 22.598 43.5788 24.0205 43.3846C25.4432 43.1902 26.6795 42.3563 29.1514 40.6893L37.5654 35.0145C40.2278 33.219 41.5593 32.3214 42.2812 30.9637C43.003 29.6062 43.0029 28.0007 43.0029 24.7899V18.6034H43V15.6834C43 12.8233 42.9996 11.3929 42.2236 10.3163C41.4476 9.23982 40.0911 8.78704 37.3779 7.88266L31.8232 6.0311Z" fill="url(#cs_p2)"/><path d="M26.9986 26.3054C26.9986 23.4453 26.9986 22.0152 26.2226 20.9385C25.4466 19.8619 24.0899 19.4096 21.3765 18.5052L15.8223 16.6538C10.8838 15.0076 8.4146 14.1845 6.7073 15.4151C5 16.6456 5 19.2484 5 24.454V31.7867C5 34.6469 5 36.077 5.776 37.1537C6.55201 38.2303 7.90872 38.6826 10.6221 39.587L16.1763 41.4384C21.1148 43.0846 23.584 43.9077 25.2913 42.6771C26.9986 41.4466 26.9986 38.8438 26.9986 33.6381V26.3054Z" fill="url(#cs_p3)"/><path d="M26.9986 26.3054C26.9986 23.4453 26.9986 22.0152 26.2226 20.9385C25.4466 19.8619 24.0899 19.4096 21.3765 18.5052L15.8223 16.6538C10.8838 15.0076 8.4146 14.1845 6.7073 15.4151C5 16.6456 5 19.2484 5 24.454V31.7867C5 34.6469 5 36.077 5.776 37.1537C6.55201 38.2303 7.90872 38.6826 10.6221 39.587L16.1763 41.4384C21.1148 43.0846 23.584 43.9077 25.2913 42.6771C26.9986 41.4466 26.9986 38.8438 26.9986 33.6381V26.3054Z" fill="url(#cs_p4)"/><path d="M42.9956 31.296V18.5515L27.2 29.2853L5.00002 22.9129V37.7129L24.1167 44.0853L42.9956 31.296Z" fill="url(#cs_p5)"/><path d="M21.028 10.3942C17.883 9.40833 16.0572 9.09759 14.7076 10.07C13.418 10.9995 13.1032 12.7123 13.026 15.738C13.8601 15.9994 14.7874 16.3079 15.8229 16.653L21.0006 18.3786V13.8317C21.0006 12.5294 21.0011 11.39 21.028 10.3942Z" fill="url(#cs_p6)"/><path d="M21.028 10.3942C17.883 9.40833 16.0572 9.09759 14.7076 10.07C13.418 10.9995 13.1032 12.7123 13.026 15.738C13.8601 15.9994 14.7874 16.3079 15.8229 16.653L21.0006 18.3786V13.8317C21.0006 12.5294 21.0011 11.39 21.028 10.3942Z" fill="url(#cs_p7)" fillOpacity="0.7"/><path d="M21.0277 10.3945C21.001 11.3903 21.0004 12.5298 21.0004 13.832V21.165C21.0004 24.0249 21.0008 25.4547 21.7767 26.5312C22.5527 27.6079 23.9091 28.0604 26.6224 28.9648C26.8447 29.0389 27.3184 29.1968 27.9336 29.4016C31.0918 30.453 32.6709 30.9786 33.833 30.1414C34.9952 29.3041 34.9965 27.6414 34.9991 24.3161C35.0003 22.74 35.0004 21.4148 35.0004 20.9609C35.0004 18.1012 34.9998 16.6713 34.224 15.5947C33.448 14.5181 32.0914 14.0655 29.3783 13.1611L23.8226 11.3086C22.788 10.9637 21.8613 10.6558 21.0277 10.3945Z" fill="url(#cs_p8)"/><path d="M21.0277 10.3945C21.001 11.3903 21.0004 12.5298 21.0004 13.832V21.165C21.0004 24.0249 21.0008 25.4547 21.7767 26.5312C22.5527 27.6079 23.9091 28.0604 26.6224 28.9648C26.8447 29.0389 27.3184 29.1968 27.9336 29.4016C31.0918 30.453 32.6709 30.9786 33.833 30.1414C34.9952 29.3041 34.9965 27.6414 34.9991 24.3161C35.0003 22.74 35.0004 21.4148 35.0004 20.9609C35.0004 18.1012 34.9998 16.6713 34.224 15.5947C33.448 14.5181 32.0914 14.0655 29.3783 13.1611L23.8226 11.3086C22.788 10.9637 21.8613 10.6558 21.0277 10.3945Z" fill="url(#cs_p9)"/><path d="M13.0262 15.738C13.0012 16.718 12.9998 17.8357 12.9998 19.1091V26.4421C12.9998 29.3023 13.0002 30.7327 13.7762 31.8093C14.5522 32.8857 15.9089 33.3376 18.6219 34.2419C18.8431 34.3157 19.3132 34.4723 19.9238 34.6756C23.0879 35.7288 24.6699 36.2554 25.832 35.418C26.9942 34.5807 26.9953 32.9149 26.9977 29.5834C26.9988 28.0375 26.9988 26.7445 26.9988 26.3054C26.9988 23.4452 26.9985 22.0149 26.2225 20.9382C25.4465 19.8617 24.09 19.409 21.3768 18.5046L15.8221 16.6531C14.7869 16.308 13.8601 15.9994 13.0262 15.738Z" fill="url(#cs_p10)"/><path d="M21.0008 21.165C21.0008 24.0246 21.0005 25.4547 21.7762 26.5312C22.5522 27.6079 23.9095 28.0604 26.6229 28.9648L26.9988 29.0898V26.3057C26.9988 23.4455 26.9985 22.0151 26.2225 20.9385C25.4465 19.8619 24.09 19.4093 21.3768 18.5049L21.0008 18.3789V21.165Z" fill="url(#cs_p11)"/></g><defs><linearGradient id="cs_p0" x1="26.7461" y1="35.7058" x2="37.8257" y2="7.96439" gradientUnits="userSpaceOnUse"><stop stopColor="#2764E7"/><stop offset="0.307475" stopColor="#8B52F4"/><stop offset="0.544627" stopColor="#BB45EA"/><stop offset="0.803866" stopColor="#DB56C6"/><stop offset="1" stopColor="#F462AB"/></linearGradient><radialGradient id="cs_p1" cx="0" cy="0" r="1" gradientTransform="matrix(10.3452 9.65562 6.27421 -6.36495 26.3239 22.5577)" gradientUnits="userSpaceOnUse"><stop offset="0.549399" stopColor="#5B2AB5"/><stop offset="1" stopColor="#A931D8" stopOpacity="0"/></radialGradient><radialGradient id="cs_p2" cx="0" cy="0" r="1" gradientTransform="matrix(19.846 6.16317 3.15774 -9.62767 22.7347 18.0381)" gradientUnits="userSpaceOnUse"><stop offset="0.527929" stopColor="#9529C2"/><stop offset="1" stopColor="#DD3CE2" stopOpacity="0"/></radialGradient><radialGradient id="cs_p3" cx="0" cy="0" r="1" gradientTransform="matrix(-19.1297 -27.618 -27.432 19.2594 29.1953 40.6685)" gradientUnits="userSpaceOnUse"><stop stopColor="#2764E7"/><stop offset="0.225228" stopColor="#0094F0"/><stop offset="0.443437" stopColor="#19B2CE"/><stop offset="0.6999" stopColor="#52D17C"/><stop offset="1" stopColor="#FFD638"/></radialGradient><linearGradient id="cs_p4" x1="12.1473" y1="37.9502" x2="26.1208" y2="37.9502" gradientUnits="userSpaceOnUse"><stop stopColor="#16BBDA" stopOpacity="0"/><stop offset="0.535279" stopColor="#0094F0"/><stop offset="1" stopColor="#2764E7"/></linearGradient><radialGradient id="cs_p5" cx="0" cy="0" r="1" gradientTransform="matrix(8.85681 4.54903 3.15823 -5.04838 22.4543 32.7527)" gradientUnits="userSpaceOnUse"><stop stopColor="#1B44B1"/><stop offset="1" stopColor="#367AF2" stopOpacity="0"/></radialGradient><linearGradient id="cs_p6" x1="18.9946" y1="17.7329" x2="19.203" y2="9.33928" gradientUnits="userSpaceOnUse"><stop stopColor="#FF9C70"/><stop offset="1" stopColor="#FFD394"/></linearGradient><linearGradient id="cs_p7" x1="16.7719" y1="14.2895" x2="15.9357" y2="17.9602" gradientUnits="userSpaceOnUse"><stop stopColor="#FFB357" stopOpacity="0"/><stop offset="1" stopColor="#F24A9D"/></linearGradient><linearGradient id="cs_p8" x1="28.7781" y1="12.488" x2="29.0132" y2="31.5134" gradientUnits="userSpaceOnUse"><stop stopColor="#FFB357"/><stop offset="0.380259" stopColor="#FB6F7B"/><stop offset="0.659779" stopColor="#F24A9D"/><stop offset="1" stopColor="#DD3CE2"/></linearGradient><radialGradient id="cs_p9" cx="0" cy="0" r="1" gradientTransform="matrix(9.13889 2.26464 -2.05987 10.0474 21.7781 27.0246)" gradientUnits="userSpaceOnUse"><stop offset="0.567938" stopColor="#D7257D"/><stop offset="1" stopColor="#F462AB" stopOpacity="0"/></radialGradient><linearGradient id="cs_p10" x1="24.6773" y1="36.7373" x2="11.3263" y2="15.7738" gradientUnits="userSpaceOnUse"><stop stopColor="#0FAFFF"/><stop offset="0.54828" stopColor="#2BDABE"/><stop offset="0.765945" stopColor="#88E06C"/><stop offset="1" stopColor="#FFD638"/></linearGradient><linearGradient id="cs_p11" x1="20.3343" y1="22.3955" x2="26.1547" y2="24.1849" gradientUnits="userSpaceOnUse"><stop stopColor="#76EB95"/><stop offset="1" stopColor="#3BD5FF" stopOpacity="0"/></linearGradient><clipPath id="cs_clip"><rect width="48" height="48" fill="white"/></clipPath></defs></svg> },
                      { name: "Dynamics 365 Sales" as ProductCategory, description: "Pre-built agents for Dynamics 365 Sales workflows.", icon: <svg width="28" height="28" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#d365s_cat_c0)"><g clipPath="url(#d365s_cat_c1)"><path d="M0 127.998C0 110.325 14.3269 95.998 32 95.998H42.6667V159.998H32C14.3269 159.998 0 145.671 0 127.998Z" fill="url(#d365s_cat_p0)"/><path d="M0 127.998C0 110.325 14.3269 95.998 32 95.998H42.6667V159.998H32C14.3269 159.998 0 145.671 0 127.998Z" fill="url(#d365s_cat_p1)"/><path d="M42.6665 79.998C42.6665 62.3249 56.9934 47.998 74.6665 47.998H85.3332V159.998H42.6665V79.998Z" fill="url(#d365s_cat_p2)"/><path d="M42.6665 79.998C42.6665 62.3249 56.9934 47.998 74.6665 47.998H85.3332V159.998H42.6665V79.998Z" fill="url(#d365s_cat_p3)" fillOpacity="0.6"/><path d="M85.3335 31.998C85.3335 14.3249 99.6604 -0.00195312 117.333 -0.00195312H128C146.667 -0.00195312 160 4.13124 160 4.13124V143.998C160 152.835 152.837 159.998 144 159.998H85.3335V31.998Z" fill="url(#d365s_cat_p4)"/><path d="M85.3335 31.998C85.3335 14.3249 99.6604 -0.00195312 117.333 -0.00195312H128C146.667 -0.00195312 160 4.13124 160 4.13124V143.998C160 152.835 152.837 159.998 144 159.998H85.3335V31.998Z" fill="url(#d365s_cat_p5)" fillOpacity="0.5"/><path d="M143.959 0.996549C163.62 3.46713 182.516 10.48 199.113 21.5698C220.163 35.6346 236.569 55.6255 246.257 79.0145C255.945 102.403 258.479 128.14 253.541 152.97C248.602 177.799 236.411 200.607 218.51 218.508C200.608 236.409 177.801 248.6 152.971 253.538C128.142 258.477 102.405 255.942 79.0163 246.254C55.6274 236.566 35.6366 220.16 21.5718 199.111C7.50698 178.061 -4.88895e-05 153.314 2.38288e-10 127.998C2.38288e-10 145.671 14.3269 159.998 32 159.998H42.6667H74.6667H112C120.837 159.998 128 152.834 128 143.998V15.9979C128 7.16134 135.191 -0.105173 143.959 0.996549Z" fill="url(#d365s_cat_p6)"/><path d="M143.959 0.996549C163.62 3.46713 182.516 10.48 199.113 21.5698C220.163 35.6346 236.569 55.6255 246.257 79.0145C255.945 102.403 258.479 128.14 253.541 152.97C248.602 177.799 236.411 200.607 218.51 218.508C200.608 236.409 177.801 248.6 152.971 253.538C128.142 258.477 102.405 255.942 79.0163 246.254C55.6274 236.566 35.6366 220.16 21.5718 199.111C7.50698 178.061 -4.88895e-05 153.314 2.38288e-10 127.998C2.38288e-10 145.671 14.3269 159.998 32 159.998H42.6667H74.6667H112C120.837 159.998 128 152.834 128 143.998V15.9979C128 7.16134 135.191 -0.105173 143.959 0.996549Z" fill="url(#d365s_cat_p7)"/><g opacity="0.6" style={{mixBlendMode: "soft-light"}}><path d="M256 127.998C256 110.325 241.673 95.998 224 95.998H128V143.998C128 152.835 120.837 159.998 112 159.998H106.667H224C241.673 159.998 256 145.671 256 127.998Z" fill="url(#d365s_cat_p8)"/></g></g></g><defs><linearGradient id="d365s_cat_p0" x1="0.608505" y1="139.96" x2="42.4696" y2="143.599" gradientUnits="userSpaceOnUse"><stop stopColor="#1B44B1"/><stop offset="1" stopColor="#102784"/></linearGradient><radialGradient id="d365s_cat_p1" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(14.6667 95.9981) rotate(90) scale(64 47.1506)"><stop offset="0.57876" stopColor="#102784" stopOpacity="0"/><stop offset="1" stopColor="#102784"/></radialGradient><linearGradient id="d365s_cat_p2" x1="63.9998" y1="47.998" x2="63.9998" y2="159.998" gradientUnits="userSpaceOnUse"><stop stopColor="#0094F0"/><stop offset="0.775536" stopColor="#2052CB"/><stop offset="1" stopColor="#163697"/></linearGradient><linearGradient id="d365s_cat_p3" x1="63.9998" y1="119.998" x2="85.347" y2="118.944" gradientUnits="userSpaceOnUse"><stop stopColor="#0078D4" stopOpacity="0"/><stop offset="1" stopColor="#2052CB"/></linearGradient><linearGradient id="d365s_cat_p4" x1="106.667" y1="-0.00195312" x2="106.667" y2="159.998" gradientUnits="userSpaceOnUse"><stop stopColor="#26CFE8"/><stop offset="0.409431" stopColor="#0FAFFF"/><stop offset="0.809746" stopColor="#367AF2"/><stop offset="1" stopColor="#2052CB"/></linearGradient><linearGradient id="d365s_cat_p5" x1="109.037" y1="91.998" x2="130.371" y2="91.998" gradientUnits="userSpaceOnUse"><stop stopColor="#0094F0" stopOpacity="0"/><stop offset="1" stopColor="#2764E7"/></linearGradient><radialGradient id="d365s_cat_p6" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(168.833 37.2047) rotate(90) scale(237.736 237.736)"><stop offset="0.062127" stopColor="#6FE8F5"/><stop offset="0.288121" stopColor="#3BD5FF"/><stop offset="0.68128" stopColor="#0094F0"/><stop offset="1" stopColor="#2052CB"/></radialGradient><radialGradient id="d365s_cat_p7" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(109.333 170.665) rotate(-90) scale(181.333 181.333)"><stop offset="0.542484" stopColor="#29C3FF" stopOpacity="0"/><stop offset="1" stopColor="#73EDD8"/></radialGradient><linearGradient id="d365s_cat_p8" x1="191.91" y1="159.998" x2="191.91" y2="100.601" gradientUnits="userSpaceOnUse"><stop stopColor="white"/><stop offset="1" stopColor="white" stopOpacity="0"/></linearGradient><clipPath id="d365s_cat_c0"><rect width="256" height="256" fill="white"/></clipPath><clipPath id="d365s_cat_c1"><rect width="256" height="256" fill="white"/></clipPath></defs></svg> },
                      { name: "Dynamics 365 Service" as ProductCategory, description: "Pre-built agents for Dynamics 365 Service workflows.", icon: <svg width="28" height="28" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M179.763 32H240C248.837 32 256 39.1634 256 48V94.2509C256 106.386 251.645 118.118 243.726 127.313L168.414 214.768C147.136 239.477 108.864 239.476 87.5865 214.768L50.1536 171.3L167.743 37.4404C170.78 33.9823 175.16 32 179.763 32Z" fill="url(#d365cs_cat_p0)"/><path d="M179.763 32H240C248.837 32 256 39.1634 256 48V94.2509C256 106.386 251.645 118.118 243.726 127.313L168.414 214.768C147.136 239.477 108.864 239.476 87.5865 214.768L50.1536 171.3L167.743 37.4404C170.78 33.9823 175.16 32 179.763 32Z" fill="url(#d365cs_cat_p1)"/><path d="M76.2378 32H16C7.16344 32 0 39.1634 0 48V107.121C0 110.953 1.37524 114.657 3.87565 117.561L87.5826 214.77C108.861 239.481 147.137 239.479 168.414 214.767L205.854 171.281L88.2574 37.4393C85.2196 33.9819 80.8401 32 76.2378 32Z" fill="url(#d365cs_cat_p2)"/><path d="M167.42 127.538C187.502 150.394 222.976 150.478 243.185 127.941L168.414 214.768C147.136 239.476 108.864 239.476 87.5864 214.768L50.1538 171.299L128.003 82.6771L167.42 127.538Z" fill="url(#d365cs_cat_p3)"/><path d="M167.42 127.538C187.502 150.394 222.976 150.478 243.185 127.941L168.414 214.768C147.136 239.476 108.864 239.476 87.5864 214.768L50.1538 171.299L128.003 82.6771L167.42 127.538Z" fill="url(#d365cs_cat_p4)"/><defs><linearGradient id="d365cs_cat_p0" x1="249.422" y1="29.6103" x2="242.825" y2="146.849" gradientUnits="userSpaceOnUse"><stop stopColor="#9C6CFE"/><stop offset="0.550303" stopColor="#7A41DC"/><stop offset="1" stopColor="#5B2AB5"/></linearGradient><radialGradient id="d365cs_cat_p1" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(188 22.6667) rotate(90) scale(124 167.663)"><stop offset="0.631434" stopColor="#4B20A0" stopOpacity="0"/><stop offset="1" stopColor="#4B20A0"/></radialGradient><linearGradient id="d365cs_cat_p2" x1="1.86997e-06" y1="50.8857" x2="153.695" y2="231.589" gradientUnits="userSpaceOnUse"><stop stopColor="#F8C4FA"/><stop offset="0.468701" stopColor="#E4A7FE"/><stop offset="1" stopColor="#AC80FF"/></linearGradient><linearGradient id="d365cs_cat_p3" x1="178.044" y1="139.026" x2="95.8605" y2="220.606" gradientUnits="userSpaceOnUse"><stop stopColor="#AC80FF"/><stop offset="0.699029" stopColor="#CC75FD" stopOpacity="0.190939"/><stop offset="1" stopColor="#D373FC" stopOpacity="0"/></linearGradient><linearGradient id="d365cs_cat_p4" x1="142.666" y1="151.793" x2="185.22" y2="194.035" gradientUnits="userSpaceOnUse"><stop stopColor="#9C6CFE" stopOpacity="0"/><stop offset="0.50385" stopColor="#9C6CFE" stopOpacity="0.282283"/><stop offset="1" stopColor="#9C6CFE"/></linearGradient></defs></svg> },
                      { name: "Dynamics ERP" as ProductCategory, description: "Pre-built agents for Dynamics ERP workflows.", icon: <svg width="28" height="28" viewBox="0 0 340 340" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="d365_cat_grad0" x1="134.743" y1="-3.542" x2="200.665" y2="169.02" gradientUnits="userSpaceOnUse"><stop stopColor="#0B53CE"/><stop offset="1" stopColor="#7252AA"/></linearGradient><linearGradient id="d365_cat_grad1" x1="227.154" y1="331.118" x2="227.154" y2="125.429" gradientUnits="userSpaceOnUse"><stop stopColor="#2266E3"/><stop offset="1" stopColor="#AE7FE2"/></linearGradient><linearGradient id="d365_cat_grad2" x1="290.417" y1="201.116" x2="219.854" y2="201.116" gradientUnits="userSpaceOnUse"><stop stopColor="#94B9FF"/><stop offset="0.2878" stopColor="#94B9FF" stopOpacity="0.524"/><stop offset="1" stopColor="#538FFF" stopOpacity="0"/></linearGradient></defs><path d="M42.5 -3.542L290.417 85V206.566C290.417 216.362 280.713 223.202 271.487 219.908L219.583 201.377V132.544C219.583 117.789 210.436 104.58 196.623 99.39L172.491 90.323C167.86 88.583 162.917 92.006 162.917 96.954V181.131L42.5 138.125V-3.542Z" fill="url(#d365_cat_grad0)"/><path d="M290.417 109.791C290.417 124.664 281.124 137.978 267.155 143.082L106.25 201.875V343.541L290.417 276.249V109.791Z" fill="url(#d365_cat_grad1)"/><path opacity="0.5" d="M290.417 109.791C290.417 124.664 281.124 137.978 267.155 143.082L106.25 201.875V343.541L290.417 276.249V109.791Z" fill="url(#d365_cat_grad2)"/><path opacity="0.5" d="M219.588 160.509L162.889 181.251L162.89 264.332C162.89 269.281 167.836 272.705 172.468 270.961L196.648 261.86C210.45 256.664 219.588 243.461 219.588 228.713V160.509Z" fill="#B0ADFF"/></svg> },
                      { name: "Microsoft 365" as ProductCategory, description: "Pre-built agents for Microsoft 365 scenarios.", icon: <svg width="28" height="28" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M34.142 7.82501C33.5631 5.85387 31.7544 4.5 29.7 4.5L28.3484 4.5C26.1139 4.5 24.1982 6.09611 23.7949 8.29398L21.4802 20.9072L22.0546 18.9419C22.6316 16.9679 24.4416 15.6111 26.4983 15.6111H34.3521L37.6458 16.8942L40.8209 15.6111H39.8942C37.8398 15.6111 36.0312 14.2572 35.4522 12.2861L34.142 7.82501Z" fill="url(#m365_p0)"/><path d="M14.3304 41.156C14.9029 43.1367 16.7162 44.5 18.7779 44.5H21.6483C24.1588 44.5 26.2119 42.499 26.2764 39.9893L26.5889 27.8271L25.9351 30.0603C25.3573 32.0332 23.5478 33.3889 21.492 33.3889L13.5728 33.3889L10.7496 31.8573L7.69302 33.3889H8.60427C10.666 33.3889 12.4793 34.7523 13.0518 36.7329L14.3304 41.156Z" fill="url(#m365_p1)"/><path d="M29.4993 4.5H13.46C8.87732 4.5 6.12772 10.5566 4.29466 16.6132C2.12296 23.7886 -0.718769 33.3852 7.50252 33.3852H14.4282C16.4978 33.3852 18.3147 32.0168 18.8835 30.0269C20.0876 25.8143 22.1978 18.4655 23.8554 12.8712C24.6977 10.0283 25.3993 7.58673 26.4762 6.06628C27.0799 5.21385 28.086 4.5 29.4993 4.5Z" fill="url(#m365_p2)"/><path d="M29.4993 4.5H13.46C8.87732 4.5 6.12772 10.5566 4.29466 16.6132C2.12296 23.7886 -0.718769 33.3852 7.50252 33.3852H14.4282C16.4978 33.3852 18.3147 32.0168 18.8835 30.0269C20.0876 25.8143 22.1978 18.4655 23.8554 12.8712C24.6977 10.0283 25.3993 7.58673 26.4762 6.06628C27.0799 5.21385 28.086 4.5 29.4993 4.5Z" fill="url(#m365_p3)"/><path d="M18.4977 44.5H34.537C39.1196 44.5 41.8692 38.4424 43.7023 32.3847C45.874 25.208 48.7157 15.6098 40.4944 15.6098H33.5689C31.4992 15.6098 29.6823 16.9784 29.1136 18.9684C27.9094 23.1816 25.7992 30.5319 24.1416 36.1273C23.2992 38.9707 22.5976 41.4127 21.5208 42.9334C20.9171 43.786 19.9109 44.5 18.4977 44.5Z" fill="url(#m365_p4)"/><path d="M18.4977 44.5H34.537C39.1196 44.5 41.8692 38.4424 43.7023 32.3847C45.874 25.208 48.7157 15.6098 40.4944 15.6098H33.5689C31.4992 15.6098 29.6823 16.9784 29.1136 18.9684C27.9094 23.1816 25.7992 30.5319 24.1416 36.1273C23.2992 38.9707 22.5976 41.4127 21.5208 42.9334C20.9171 43.786 19.9109 44.5 18.4977 44.5Z" fill="url(#m365_p5)"/><rect x="14" y="32" width="34" height="15" rx="2.55247" fill="black"/><path d="M35.9209 34.9951C36.718 34.9952 37.3568 35.2081 37.8369 35.6338C38.317 36.055 38.6156 36.6602 38.7334 37.4482H37.0625C36.9946 37.1041 36.8626 36.8483 36.668 36.6807C36.4778 36.5086 36.2288 36.4219 35.9209 36.4219C35.4227 36.4219 35.0374 36.6847 34.7656 37.21C34.5338 37.6619 34.4028 38.3271 34.3721 39.2051C34.4013 39.1763 34.4303 39.1471 34.46 39.1191C34.6954 38.9018 34.9652 38.728 35.2686 38.5967C35.5765 38.4653 35.9342 38.3994 36.3418 38.3994C36.8264 38.3994 37.2615 38.5059 37.6465 38.7188C38.0359 38.9271 38.3439 39.2373 38.5703 39.6494C38.7967 40.057 38.9101 40.5618 38.9102 41.1641C38.9102 41.7438 38.7945 42.2586 38.5635 42.707C38.3325 43.1506 37.993 43.4994 37.5449 43.7529C37.1011 44.0066 36.5572 44.1338 35.9141 44.1338C35.2756 44.1338 34.7048 43.982 34.2021 43.6787C33.704 43.3707 33.3094 42.8858 33.0195 42.2246C32.7296 41.5588 32.585 40.691 32.585 39.6221C32.585 38.5579 32.7275 37.6862 33.0127 37.0068C33.2981 36.3229 33.6925 35.8173 34.1953 35.4912C34.698 35.1607 35.2733 34.9951 35.9209 34.9951ZM45.2217 36.5986H41.8184L41.6553 38.6904C41.7911 38.5366 41.9905 38.4032 42.2529 38.29C42.5201 38.1723 42.835 38.1133 43.1973 38.1133C43.6683 38.1133 44.1103 38.2128 44.5225 38.4121C44.9344 38.6068 45.2669 38.9173 45.5205 39.3428C45.7787 39.7685 45.9082 40.3285 45.9082 41.0215C45.9082 41.7144 45.7717 42.2919 45.5 42.7539C45.2282 43.2112 44.859 43.5552 44.3926 43.7861C43.9306 44.0171 43.4098 44.1328 42.8301 44.1328C42.2459 44.1328 41.7158 44.0333 41.2402 43.834C40.7648 43.6347 40.3862 43.3337 40.1055 42.9307C39.8292 42.523 39.6914 42.0128 39.6914 41.4014H41.4238C41.4238 41.809 41.5557 42.1307 41.8184 42.3662C42.081 42.5971 42.418 42.7128 42.8301 42.7129C43.2195 42.7129 43.5321 42.5772 43.7676 42.3057C44.0076 42.0339 44.1279 41.6057 44.1279 41.0215C44.1279 40.4825 44.0007 40.0926 43.7471 39.8525C43.4981 39.6082 43.1746 39.4854 42.7764 39.4854C42.4956 39.4854 42.2572 39.5375 42.0625 39.6416C41.8677 39.7458 41.7069 39.8776 41.5801 40.0361H40.0244L40.4111 35.1104H45.2217V36.5986ZM28.7119 34.9883C29.2237 34.9883 29.697 35.0727 30.1318 35.2402C30.5667 35.4078 30.916 35.6636 31.1787 36.0078C31.4457 36.3519 31.579 36.7934 31.5791 37.332C31.5791 37.8799 31.4481 38.3152 31.1855 38.6367C30.9274 38.9583 30.578 39.1851 30.1387 39.3164C30.6233 39.4161 31.0247 39.6428 31.3418 39.9961C31.6631 40.3448 31.8241 40.836 31.8242 41.4697C31.8242 42.3303 31.5453 42.9898 30.9883 43.4473C30.4357 43.9002 29.6836 44.127 28.7324 44.127C27.7269 44.1269 26.9435 43.8864 26.3818 43.4062C25.8248 42.9261 25.5459 42.204 25.5459 41.2393H27.2178C27.2178 41.6966 27.3487 42.0543 27.6113 42.3125C27.8786 42.5707 28.25 42.7002 28.7256 42.7002C29.1513 42.7002 29.4776 42.5914 29.7041 42.374C29.9351 42.1566 30.0508 41.8119 30.0508 41.3408C30.0507 40.888 29.9097 40.5593 29.6289 40.3555C29.3527 40.1473 28.9925 40.043 28.5488 40.043H27.999V38.6709H28.5967C28.9952 38.6709 29.3123 38.5621 29.5479 38.3447C29.7832 38.1274 29.9013 37.84 29.9014 37.4824C29.9014 37.1203 29.7947 36.8528 29.582 36.6807C29.3737 36.5085 29.0856 36.4219 28.7188 36.4219C28.3157 36.4219 28.0032 36.5353 27.7812 36.7617C27.5594 36.9836 27.4483 37.2893 27.4482 37.6787H25.7842C25.7842 37.0675 25.9106 36.5649 26.1641 36.1709C26.4222 35.7768 26.7739 35.4819 27.2178 35.2871C27.6615 35.088 28.1596 34.9883 28.7119 34.9883ZM20.2568 39.1094L22.376 34.8662H24.3262V44.0107H22.5801V37.4199L20.7666 41.0762H19.6387L17.7832 37.4209V44.0107H16.0918V34.8662H18.1504L20.2568 39.1094ZM36.0225 39.8125C35.5605 39.8125 35.1462 39.9374 34.7793 40.1865C34.6317 40.2849 34.4974 40.3923 34.377 40.5098C34.4033 40.9577 34.4719 41.3298 34.582 41.626C34.7315 42.011 34.9246 42.2898 35.1602 42.4619C35.4002 42.6294 35.6514 42.7139 35.9141 42.7139C36.3216 42.7138 36.625 42.5682 36.8242 42.2783C37.028 41.9885 37.1299 41.6238 37.1299 41.1846C37.1298 40.7545 37.0325 40.4197 36.8379 40.1797C36.6431 39.9351 36.3712 39.8125 36.0225 39.8125Z" fill="white"/><defs><radialGradient id="m365_p0" cx="0" cy="0" r="1" gradientTransform="matrix(-10.9604 -13.3893 -11.8337 11.2305 38.0047 21.0144)" gradientUnits="userSpaceOnUse"><stop offset="0.0955758" stopColor="#00AEFF"/><stop offset="0.773185" stopColor="#2253CE"/><stop offset="1" stopColor="#0736C4"/></radialGradient><radialGradient id="m365_p1" cx="0" cy="0" r="1" gradientTransform="matrix(9.88029 12.5737 11.6634 -10.2629 11.1211 33.3171)" gradientUnits="userSpaceOnUse"><stop stopColor="#FFB657"/><stop offset="0.633728" stopColor="#FF5F3D"/><stop offset="0.923392" stopColor="#C02B3C"/></radialGradient><linearGradient id="m365_p2" x1="12.5" y1="8" x2="14.7884" y2="34.4751" gradientUnits="userSpaceOnUse"><stop offset="0.156162" stopColor="#0D91E1"/><stop offset="0.487484" stopColor="#52B471"/><stop offset="0.652394" stopColor="#98BD42"/><stop offset="0.937361" stopColor="#FFC800"/></linearGradient><linearGradient id="m365_p3" x1="14.5" y1="4.5" x2="15.7496" y2="33.3852" gradientUnits="userSpaceOnUse"><stop stopColor="#3DCBFF"/><stop offset="0.246674" stopColor="#0588F7" stopOpacity="0"/></linearGradient><radialGradient id="m365_p4" cx="0" cy="0" r="1" gradientTransform="matrix(-12.6712 36.2356 -43.1249 -15.9926 41.3183 12.7812)" gradientUnits="userSpaceOnUse"><stop offset="0.0661714" stopColor="#8C48FF"/><stop offset="0.5" stopColor="#F2598A"/><stop offset="0.895833" stopColor="#FFB152"/></radialGradient><linearGradient id="m365_p5" x1="42.5855" y1="13.846" x2="42.5691" y2="21.7147" gradientUnits="userSpaceOnUse"><stop offset="0.0581535" stopColor="#F8ADFA"/><stop offset="0.708063" stopColor="#A86EDD" stopOpacity="0"/></linearGradient></defs></svg> },
                    ].map(cat => {
                      const isSelected = selectedCategories.includes(cat.name);
                      return (
                        <div
                          key={cat.name}
                          className={`${styles.categoryCatalogItem} ${isSelected ? styles.categoryCatalogItemSelected : ''}`}
                          onClick={() => toggleCategory(cat.name)}
                          style={isSelected ? { borderColor: tokens.colorBrandBackground } : undefined}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#f5f5f5';
                            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
                            if (!isSelected) e.currentTarget.style.borderColor = '#c0c0c0';
                            const indicator = e.currentTarget.querySelector('.fui-Checkbox__indicator') as HTMLElement;
                            if (indicator) indicator.style.borderColor = '#464feb';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '';
                            e.currentTarget.style.boxShadow = 'none';
                            if (!isSelected) e.currentTarget.style.borderColor = '';
                            const indicator = e.currentTarget.querySelector('.fui-Checkbox__indicator') as HTMLElement;
                            if (indicator && !isSelected) indicator.style.borderColor = '';
                          }}
                        >
                          <div className={styles.chipTopRow}>
                            <div className={styles.chipIcon}>
                              {cat.icon}
                            </div>
                            <div className={styles.chipContent}>
                              <h4 className={styles.chipTitle}>{cat.name}</h4>
                              <p className={styles.chipDescription}>{cat.description}</p>
                            </div>
                            <div className={styles.chipActions}>
                              <Checkbox
                                size="large"
                                checked={isSelected}
                                onChange={() => {}}
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  )}
                </div>
              </div>

              {/* Product Selection Section */}
              {visibleProducts.length > 0 && (
                <div style={{ width: "100%", marginBottom: "16px" }}>
                  <div className={styles.productSelectionSection}>
                    <div
                      style={{ cursor: "pointer", userSelect: "none" }}
                      onClick={() => setIsAgentCollapsed(prev => !prev)}
                    >
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <button
                          onClick={(e) => { e.stopPropagation(); setIsAgentCollapsed(prev => !prev); }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = tokens.colorNeutralBackground4;
                            e.currentTarget.style.borderColor = "#464feb";
                            const svg = e.currentTarget.querySelector("svg");
                            if (svg) svg.style.color = "#464feb";
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = "transparent";
                            e.currentTarget.style.borderColor = "transparent";
                            const svg = e.currentTarget.querySelector("svg");
                            if (svg) svg.style.color = tokens.colorNeutralForeground3;
                          }}
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            width: "28px",
                            height: "28px",
                            borderRadius: "50%",
                            border: "1px solid transparent",
                            backgroundColor: "transparent",
                            cursor: "pointer",
                            outline: "none",
                            padding: 0,
                            marginLeft: "-36px",
                            marginRight: "8px",
                            flexShrink: 0,
                            transition: "background-color 0.15s ease, border-color 0.15s ease",
                          }}
                        >
                          {isAgentCollapsed ? <ChevronDownRegular style={{ color: tokens.colorNeutralForeground3, fontSize: "16px", transition: "color 0.15s ease" }} /> : <ChevronUpRegular style={{ color: tokens.colorNeutralForeground3, fontSize: "16px", transition: "color 0.15s ease" }} />}
                        </button>
                        <h2 style={{ fontSize: "20px", fontWeight: 600, margin: 0 }}>
                          Add your agent or agents
                        </h2>
                      </div>
                      {!isAgentCollapsed && (
                        <p className={styles.sectionDescription} style={{ marginTop: "8px" }}>
                          Choose the agents you want to configure.
                        </p>
                      )}
                    </div>
                    {!isAgentCollapsed && (
                    <div className={styles.productChipsGrid}>
                      {visibleProducts.map(product => {
                        const hasAdded = products.some(p => p.productId === product.id);
                        return (
                        <div key={product.id}
                          className={`${styles.productChip} ${hasAdded ? styles.productChipSelected : ''}`}
                          style={hasAdded ? { borderColor: tokens.colorBrandBackground } : undefined}
                        >
                          <div className={styles.chipTopRow}>
                          <div className={styles.chipIcon}>
                            {product.id === "copilot-chat" ? (
                              <svg width="28" height="28" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M34.1423 7.32501C33.5634 5.35387 31.7547 4 29.7003 4L28.3488 4C26.1142 4 24.1985 5.59611 23.7952 7.79398L21.4805 20.4072L22.0549 18.4419C22.6319 16.4679 24.4419 15.1111 26.4986 15.1111H34.3524L37.6462 16.3942L40.8213 15.1111H39.8946C37.8401 15.1111 36.0315 13.7572 35.4525 11.7861L34.1423 7.32501Z" fill="url(#paint0_copilot)"/>
                                <path d="M14.3307 40.656C14.9032 42.6366 16.7165 44 18.7783 44H21.6486C24.1592 44 26.2122 41.999 26.2767 39.4893L26.5893 27.3271L25.9354 29.5602C25.3577 31.5332 23.5481 32.8889 21.4923 32.8889L13.5732 32.8889L10.7499 31.3573L7.69336 32.8889H8.60461C10.6663 32.8889 12.4796 34.2522 13.0521 36.2329L14.3307 40.656Z" fill="url(#paint1_copilot)"/>
                                <path d="M29.4993 4H13.46C8.87732 4 6.12772 10.0566 4.29466 16.1132C2.12296 23.2886 -0.718769 32.8852 7.50252 32.8852H14.4282C16.4978 32.8852 18.3147 31.5168 18.8835 29.5269C20.0876 25.3143 22.1978 17.9655 23.8554 12.3712C24.6977 9.52831 25.3993 7.08673 26.4762 5.56628C27.0799 4.71385 28.086 4 29.4993 4Z" fill="url(#paint2_copilot)"/>
                                <path d="M29.4993 4H13.46C8.87732 4 6.12772 10.0566 4.29466 16.1132C2.12296 23.2886 -0.718769 32.8852 7.50252 32.8852H14.4282C16.4978 32.8852 18.3147 31.5168 18.8835 29.5269C20.0876 25.3143 22.1978 17.9655 23.8554 12.3712C24.6977 9.52831 25.3993 7.08673 26.4762 5.56628C27.0799 4.71385 28.086 4 29.4993 4Z" fill="url(#paint3_copilot)"/>
                                <path d="M18.498 44H34.5374C39.12 44 41.8696 37.9424 43.7027 31.8848C45.8744 24.7081 48.7161 15.1098 40.4948 15.1098H33.5693C31.4996 15.1098 29.6827 16.4784 29.114 18.4684C27.9098 22.6817 25.7996 30.032 24.142 35.6273C23.2996 38.4708 22.598 40.9127 21.5212 42.4335C20.9175 43.286 19.9113 44 18.498 44Z" fill="url(#paint4_copilot)"/>
                                <path d="M18.498 44H34.5374C39.12 44 41.8696 37.9424 43.7027 31.8848C45.8744 24.7081 48.7161 15.1098 40.4948 15.1098H33.5693C31.4996 15.1098 29.6827 16.4784 29.114 18.4684C27.9098 22.6817 25.7996 30.032 24.142 35.6273C23.2996 38.4708 22.598 40.9127 21.5212 42.4335C20.9175 43.286 19.9113 44 18.498 44Z" fill="url(#paint5_copilot)"/>
                                <defs>
                                  <radialGradient id="paint0_copilot" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(38.005 20.5144) rotate(-129.304) scale(17.3033 16.2706)">
                                    <stop offset="0.0955758" stopColor="#00AEFF"/><stop offset="0.773185" stopColor="#2253CE"/><stop offset="1" stopColor="#0736C4"/>
                                  </radialGradient>
                                  <radialGradient id="paint1_copilot" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(11.1215 32.8171) rotate(51.84) scale(15.9912 15.5119)">
                                    <stop offset="0" stopColor="#FFB657"/><stop offset="0.633728" stopColor="#FF5F3D"/><stop offset="0.923392" stopColor="#C02B3C"/>
                                  </radialGradient>
                                  <linearGradient id="paint2_copilot" x1="12.5" y1="7.5" x2="14.7884" y2="33.9751" gradientUnits="userSpaceOnUse">
                                    <stop offset="0.156162" stopColor="#0D91E1"/><stop offset="0.487484" stopColor="#52B471"/><stop offset="0.652394" stopColor="#98BD42"/><stop offset="0.937361" stopColor="#FFC800"/>
                                  </linearGradient>
                                  <linearGradient id="paint3_copilot" x1="14.5" y1="4" x2="15.7496" y2="32.8852" gradientUnits="userSpaceOnUse">
                                    <stop offset="0" stopColor="#3DCBFF"/><stop offset="0.246674" stopColor="#0588F7" stopOpacity="0"/>
                                  </linearGradient>
                                  <radialGradient id="paint4_copilot" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(41.3187 12.2813) rotate(109.274) scale(38.3873 45.9867)">
                                    <stop offset="0.0661714" stopColor="#8C48FF"/><stop offset="0.5" stopColor="#F2598A"/><stop offset="0.895833" stopColor="#FFB152"/>
                                  </radialGradient>
                                  <linearGradient id="paint5_copilot" x1="42.5859" y1="13.346" x2="42.5695" y2="21.2147" gradientUnits="userSpaceOnUse">
                                    <stop offset="0.0581535" stopColor="#F8ADFA"/><stop offset="0.708063" stopColor="#A86EDD" stopOpacity="0"/>
                                  </linearGradient>
                                </defs>
                              </svg>
                            ) : product.id === "employee-self-service" ? (
                              <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                  <linearGradient id="ess_grad" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#2AA0D5"/>
                                    <stop offset="1" stopColor="#1B6A9C"/>
                                  </linearGradient>
                                </defs>
                                <rect width="28" height="28" rx="6" fill="url(#ess_grad)"/>
                                <rect x="7" y="4.5" width="14" height="19" rx="3" stroke="white" strokeWidth="1.5" fill="none"/>
                                <circle cx="14" cy="11.5" r="2.5" fill="white"/>
                                <path d="M9.5 18.5C9.5 16 11.5 14.5 14 14.5C16.5 14.5 18.5 16 18.5 18.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none"/>
                              </svg>
                            ) : product.category === "Copilot Studio Custom" ? (
                              <svg width="28" height="28" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#cs_chip_clip)"><path d="M31.8232 6.0311C26.8849 4.38497 24.4153 3.56235 22.708 4.79281C21.0007 6.02337 21.001 8.62627 21.001 13.8319V18.3788L15.8223 16.6532C10.8839 15.007 8.41432 14.1843 6.70703 15.4149C4.99999 16.6455 5 19.2486 5 24.4539V31.786C5 34.6462 5.00036 36.0765 5.77637 37.1532C6.55238 38.2298 7.90874 38.6823 10.6221 39.5868L18.3555 42.1649C21.1836 43.1076 22.598 43.5788 24.0205 43.3846C25.4432 43.1902 26.6795 42.3563 29.1514 40.6893L37.5654 35.0145C40.2278 33.219 41.5593 32.3214 42.2812 30.9637C43.003 29.6062 43.0029 28.0007 43.0029 24.7899V18.6034H43V15.6834C43 12.8233 42.9996 11.3929 42.2236 10.3163C41.4476 9.23982 40.0911 8.78704 37.3779 7.88266L31.8232 6.0311Z" fill="url(#cs_chip_p0)"/><path d="M26.9986 26.3054C26.9986 23.4453 26.9986 22.0152 26.2226 20.9385C25.4466 19.8619 24.0899 19.4096 21.3765 18.5052L15.8223 16.6538C10.8838 15.0076 8.4146 14.1845 6.7073 15.4151C5 16.6456 5 19.2484 5 24.454V31.7867C5 34.6469 5 36.077 5.776 37.1537C6.55201 38.2303 7.90872 38.6826 10.6221 39.587L16.1763 41.4384C21.1148 43.0846 23.584 43.9077 25.2913 42.6771C26.9986 41.4466 26.9986 38.8438 26.9986 33.6381V26.3054Z" fill="url(#cs_chip_p3)"/><path d="M42.9956 31.296V18.5515L27.2 29.2853L5.00002 22.9129V37.7129L24.1167 44.0853L42.9956 31.296Z" fill="url(#cs_chip_p5)"/><path d="M21.028 10.3942C17.883 9.40833 16.0572 9.09759 14.7076 10.07C13.418 10.9995 13.1032 12.7123 13.026 15.738C13.8601 15.9994 14.7874 16.3079 15.8229 16.653L21.0006 18.3786V13.8317C21.0006 12.5294 21.0011 11.39 21.028 10.3942Z" fill="url(#cs_chip_p6)"/><path d="M21.0277 10.3945C21.001 11.3903 21.0004 12.5298 21.0004 13.832V21.165C21.0004 24.0249 21.0008 25.4547 21.7767 26.5312C22.5527 27.6079 23.9091 28.0604 26.6224 28.9648C26.8447 29.0389 27.3184 29.1968 27.9336 29.4016C31.0918 30.453 32.6709 30.9786 33.833 30.1414C34.9952 29.3041 34.9965 27.6414 34.9991 24.3161C35.0003 22.74 35.0004 21.4148 35.0004 20.9609C35.0004 18.1012 34.9998 16.6713 34.224 15.5947C33.448 14.5181 32.0914 14.0655 29.3783 13.1611L23.8226 11.3086C22.788 10.9637 21.8613 10.6558 21.0277 10.3945Z" fill="url(#cs_chip_p8)"/><path d="M13.0262 15.738C13.0012 16.718 12.9998 17.8357 12.9998 19.1091V26.4421C12.9998 29.3023 13.0002 30.7327 13.7762 31.8093C14.5522 32.8857 15.9089 33.3376 18.6219 34.2419C18.8431 34.3157 19.3132 34.4723 19.9238 34.6756C23.0879 35.7288 24.6699 36.2554 25.832 35.418C26.9942 34.5807 26.9953 32.9149 26.9977 29.5834C26.9988 28.0375 26.9988 26.7445 26.9988 26.3054C26.9988 23.4452 26.9985 22.0149 26.2225 20.9382C25.4465 19.8617 24.09 19.409 21.3768 18.5046L15.8221 16.6531C14.7869 16.308 13.8601 15.9994 13.0262 15.738Z" fill="url(#cs_chip_p10)"/><path d="M21.0008 21.165C21.0008 24.0246 21.0005 25.4547 21.7762 26.5312C22.5522 27.6079 23.9095 28.0604 26.6229 28.9648L26.9988 29.0898V26.3057C26.9988 23.4455 26.9985 22.0151 26.2225 20.9385C25.4465 19.8619 24.09 19.4093 21.3768 18.5049L21.0008 18.3789V21.165Z" fill="url(#cs_chip_p11)"/></g><defs><linearGradient id="cs_chip_p0" x1="26.7461" y1="35.7058" x2="37.8257" y2="7.96439" gradientUnits="userSpaceOnUse"><stop stopColor="#2764E7"/><stop offset="0.307475" stopColor="#8B52F4"/><stop offset="0.544627" stopColor="#BB45EA"/><stop offset="0.803866" stopColor="#DB56C6"/><stop offset="1" stopColor="#F462AB"/></linearGradient><radialGradient id="cs_chip_p3" cx="0" cy="0" r="1" gradientTransform="matrix(-19.1297 -27.618 -27.432 19.2594 29.1953 40.6685)" gradientUnits="userSpaceOnUse"><stop stopColor="#2764E7"/><stop offset="0.225228" stopColor="#0094F0"/><stop offset="0.443437" stopColor="#19B2CE"/><stop offset="0.6999" stopColor="#52D17C"/><stop offset="1" stopColor="#FFD638"/></radialGradient><radialGradient id="cs_chip_p5" cx="0" cy="0" r="1" gradientTransform="matrix(8.85681 4.54903 3.15823 -5.04838 22.4543 32.7527)" gradientUnits="userSpaceOnUse"><stop stopColor="#1B44B1"/><stop offset="1" stopColor="#367AF2" stopOpacity="0"/></radialGradient><linearGradient id="cs_chip_p6" x1="18.9946" y1="17.7329" x2="19.203" y2="9.33928" gradientUnits="userSpaceOnUse"><stop stopColor="#FF9C70"/><stop offset="1" stopColor="#FFD394"/></linearGradient><linearGradient id="cs_chip_p8" x1="28.7781" y1="12.488" x2="29.0132" y2="31.5134" gradientUnits="userSpaceOnUse"><stop stopColor="#FFB357"/><stop offset="0.380259" stopColor="#FB6F7B"/><stop offset="0.659779" stopColor="#F24A9D"/><stop offset="1" stopColor="#DD3CE2"/></linearGradient><linearGradient id="cs_chip_p10" x1="24.6773" y1="36.7373" x2="11.3263" y2="15.7738" gradientUnits="userSpaceOnUse"><stop stopColor="#0FAFFF"/><stop offset="0.54828" stopColor="#2BDABE"/><stop offset="0.765945" stopColor="#88E06C"/><stop offset="1" stopColor="#FFD638"/></linearGradient><linearGradient id="cs_chip_p11" x1="20.3343" y1="22.3955" x2="26.1547" y2="24.1849" gradientUnits="userSpaceOnUse"><stop stopColor="#76EB95"/><stop offset="1" stopColor="#3BD5FF" stopOpacity="0"/></linearGradient><clipPath id="cs_chip_clip"><rect width="48" height="48" fill="white"/></clipPath></defs></svg>
                            ) : product.category === "Dynamics 365 Sales" ? (
                              <svg width="28" height="28" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#d365s_agent_c0)"><g clipPath="url(#d365s_agent_c1)"><path d="M0 127.998C0 110.325 14.3269 95.998 32 95.998H42.6667V159.998H32C14.3269 159.998 0 145.671 0 127.998Z" fill="url(#d365s_agent_p0)"/><path d="M0 127.998C0 110.325 14.3269 95.998 32 95.998H42.6667V159.998H32C14.3269 159.998 0 145.671 0 127.998Z" fill="url(#d365s_agent_p1)"/><path d="M42.6665 79.998C42.6665 62.3249 56.9934 47.998 74.6665 47.998H85.3332V159.998H42.6665V79.998Z" fill="url(#d365s_agent_p2)"/><path d="M42.6665 79.998C42.6665 62.3249 56.9934 47.998 74.6665 47.998H85.3332V159.998H42.6665V79.998Z" fill="url(#d365s_agent_p3)" fillOpacity="0.6"/><path d="M85.3335 31.998C85.3335 14.3249 99.6604 -0.00195312 117.333 -0.00195312H128C146.667 -0.00195312 160 4.13124 160 4.13124V143.998C160 152.835 152.837 159.998 144 159.998H85.3335V31.998Z" fill="url(#d365s_agent_p4)"/><path d="M85.3335 31.998C85.3335 14.3249 99.6604 -0.00195312 117.333 -0.00195312H128C146.667 -0.00195312 160 4.13124 160 4.13124V143.998C160 152.835 152.837 159.998 144 159.998H85.3335V31.998Z" fill="url(#d365s_agent_p5)" fillOpacity="0.5"/><path d="M143.959 0.996549C163.62 3.46713 182.516 10.48 199.113 21.5698C220.163 35.6346 236.569 55.6255 246.257 79.0145C255.945 102.403 258.479 128.14 253.541 152.97C248.602 177.799 236.411 200.607 218.51 218.508C200.608 236.409 177.801 248.6 152.971 253.538C128.142 258.477 102.405 255.942 79.0163 246.254C55.6274 236.566 35.6366 220.16 21.5718 199.111C7.50698 178.061 -4.88895e-05 153.314 2.38288e-10 127.998C2.38288e-10 145.671 14.3269 159.998 32 159.998H42.6667H74.6667H112C120.837 159.998 128 152.834 128 143.998V15.9979C128 7.16134 135.191 -0.105173 143.959 0.996549Z" fill="url(#d365s_agent_p6)"/><path d="M143.959 0.996549C163.62 3.46713 182.516 10.48 199.113 21.5698C220.163 35.6346 236.569 55.6255 246.257 79.0145C255.945 102.403 258.479 128.14 253.541 152.97C248.602 177.799 236.411 200.607 218.51 218.508C200.608 236.409 177.801 248.6 152.971 253.538C128.142 258.477 102.405 255.942 79.0163 246.254C55.6274 236.566 35.6366 220.16 21.5718 199.111C7.50698 178.061 -4.88895e-05 153.314 2.38288e-10 127.998C2.38288e-10 145.671 14.3269 159.998 32 159.998H42.6667H74.6667H112C120.837 159.998 128 152.834 128 143.998V15.9979C128 7.16134 135.191 -0.105173 143.959 0.996549Z" fill="url(#d365s_agent_p7)"/><g opacity="0.6" style={{mixBlendMode: "soft-light"}}><path d="M256 127.998C256 110.325 241.673 95.998 224 95.998H128V143.998C128 152.835 120.837 159.998 112 159.998H106.667H224C241.673 159.998 256 145.671 256 127.998Z" fill="url(#d365s_agent_p8)"/></g></g></g><defs><linearGradient id="d365s_agent_p0" x1="0.608505" y1="139.96" x2="42.4696" y2="143.599" gradientUnits="userSpaceOnUse"><stop stopColor="#1B44B1"/><stop offset="1" stopColor="#102784"/></linearGradient><radialGradient id="d365s_agent_p1" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(14.6667 95.9981) rotate(90) scale(64 47.1506)"><stop offset="0.57876" stopColor="#102784" stopOpacity="0"/><stop offset="1" stopColor="#102784"/></radialGradient><linearGradient id="d365s_agent_p2" x1="63.9998" y1="47.998" x2="63.9998" y2="159.998" gradientUnits="userSpaceOnUse"><stop stopColor="#0094F0"/><stop offset="0.775536" stopColor="#2052CB"/><stop offset="1" stopColor="#163697"/></linearGradient><linearGradient id="d365s_agent_p3" x1="63.9998" y1="119.998" x2="85.347" y2="118.944" gradientUnits="userSpaceOnUse"><stop stopColor="#0078D4" stopOpacity="0"/><stop offset="1" stopColor="#2052CB"/></linearGradient><linearGradient id="d365s_agent_p4" x1="106.667" y1="-0.00195312" x2="106.667" y2="159.998" gradientUnits="userSpaceOnUse"><stop stopColor="#26CFE8"/><stop offset="0.409431" stopColor="#0FAFFF"/><stop offset="0.809746" stopColor="#367AF2"/><stop offset="1" stopColor="#2052CB"/></linearGradient><linearGradient id="d365s_agent_p5" x1="109.037" y1="91.998" x2="130.371" y2="91.998" gradientUnits="userSpaceOnUse"><stop stopColor="#0094F0" stopOpacity="0"/><stop offset="1" stopColor="#2764E7"/></linearGradient><radialGradient id="d365s_agent_p6" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(168.833 37.2047) rotate(90) scale(237.736 237.736)"><stop offset="0.062127" stopColor="#6FE8F5"/><stop offset="0.288121" stopColor="#3BD5FF"/><stop offset="0.68128" stopColor="#0094F0"/><stop offset="1" stopColor="#2052CB"/></radialGradient><radialGradient id="d365s_agent_p7" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(109.333 170.665) rotate(-90) scale(181.333 181.333)"><stop offset="0.542484" stopColor="#29C3FF" stopOpacity="0"/><stop offset="1" stopColor="#73EDD8"/></radialGradient><linearGradient id="d365s_agent_p8" x1="191.91" y1="159.998" x2="191.91" y2="100.601" gradientUnits="userSpaceOnUse"><stop stopColor="white"/><stop offset="1" stopColor="white" stopOpacity="0"/></linearGradient><clipPath id="d365s_agent_c0"><rect width="256" height="256" fill="white"/></clipPath><clipPath id="d365s_agent_c1"><rect width="256" height="256" fill="white"/></clipPath></defs></svg>
                            ) : product.category === "Dynamics 365 Service" ? (
                              <svg width="28" height="28" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M179.763 32H240C248.837 32 256 39.1634 256 48V94.2509C256 106.386 251.645 118.118 243.726 127.313L168.414 214.768C147.136 239.477 108.864 239.476 87.5865 214.768L50.1536 171.3L167.743 37.4404C170.78 33.9823 175.16 32 179.763 32Z" fill="url(#d365cs_agent_p0)"/><path d="M179.763 32H240C248.837 32 256 39.1634 256 48V94.2509C256 106.386 251.645 118.118 243.726 127.313L168.414 214.768C147.136 239.477 108.864 239.476 87.5865 214.768L50.1536 171.3L167.743 37.4404C170.78 33.9823 175.16 32 179.763 32Z" fill="url(#d365cs_agent_p1)"/><path d="M76.2378 32H16C7.16344 32 0 39.1634 0 48V107.121C0 110.953 1.37524 114.657 3.87565 117.561L87.5826 214.77C108.861 239.481 147.137 239.479 168.414 214.767L205.854 171.281L88.2574 37.4393C85.2196 33.9819 80.8401 32 76.2378 32Z" fill="url(#d365cs_agent_p2)"/><path d="M167.42 127.538C187.502 150.394 222.976 150.478 243.185 127.941L168.414 214.768C147.136 239.476 108.864 239.476 87.5864 214.768L50.1538 171.299L128.003 82.6771L167.42 127.538Z" fill="url(#d365cs_agent_p3)"/><path d="M167.42 127.538C187.502 150.394 222.976 150.478 243.185 127.941L168.414 214.768C147.136 239.476 108.864 239.476 87.5864 214.768L50.1538 171.299L128.003 82.6771L167.42 127.538Z" fill="url(#d365cs_agent_p4)"/><defs><linearGradient id="d365cs_agent_p0" x1="249.422" y1="29.6103" x2="242.825" y2="146.849" gradientUnits="userSpaceOnUse"><stop stopColor="#9C6CFE"/><stop offset="0.550303" stopColor="#7A41DC"/><stop offset="1" stopColor="#5B2AB5"/></linearGradient><radialGradient id="d365cs_agent_p1" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(188 22.6667) rotate(90) scale(124 167.663)"><stop offset="0.631434" stopColor="#4B20A0" stopOpacity="0"/><stop offset="1" stopColor="#4B20A0"/></radialGradient><linearGradient id="d365cs_agent_p2" x1="1.86997e-06" y1="50.8857" x2="153.695" y2="231.589" gradientUnits="userSpaceOnUse"><stop stopColor="#F8C4FA"/><stop offset="0.468701" stopColor="#E4A7FE"/><stop offset="1" stopColor="#AC80FF"/></linearGradient><linearGradient id="d365cs_agent_p3" x1="178.044" y1="139.026" x2="95.8605" y2="220.606" gradientUnits="userSpaceOnUse"><stop stopColor="#AC80FF"/><stop offset="0.699029" stopColor="#CC75FD" stopOpacity="0.190939"/><stop offset="1" stopColor="#D373FC" stopOpacity="0"/></linearGradient><linearGradient id="d365cs_agent_p4" x1="142.666" y1="151.793" x2="185.22" y2="194.035" gradientUnits="userSpaceOnUse"><stop stopColor="#9C6CFE" stopOpacity="0"/><stop offset="0.50385" stopColor="#9C6CFE" stopOpacity="0.282283"/><stop offset="1" stopColor="#9C6CFE"/></linearGradient></defs></svg>
                            ) : product.category === "Dynamics ERP" ? (
                              <svg width="28" height="28" viewBox="0 0 340 340" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="d365_grad0" x1="134.743" y1="-3.542" x2="200.665" y2="169.02" gradientUnits="userSpaceOnUse"><stop stopColor="#0B53CE"/><stop offset="1" stopColor="#7252AA"/></linearGradient><linearGradient id="d365_grad1" x1="227.154" y1="331.118" x2="227.154" y2="125.429" gradientUnits="userSpaceOnUse"><stop stopColor="#2266E3"/><stop offset="1" stopColor="#AE7FE2"/></linearGradient><linearGradient id="d365_grad2" x1="290.417" y1="201.116" x2="219.854" y2="201.116" gradientUnits="userSpaceOnUse"><stop stopColor="#94B9FF"/><stop offset="0.2878" stopColor="#94B9FF" stopOpacity="0.524"/><stop offset="1" stopColor="#538FFF" stopOpacity="0"/></linearGradient></defs><path d="M42.5 -3.542L290.417 85V206.566C290.417 216.362 280.713 223.202 271.487 219.908L219.583 201.377V132.544C219.583 117.789 210.436 104.58 196.623 99.39L172.491 90.323C167.86 88.583 162.917 92.006 162.917 96.954V181.131L42.5 138.125V-3.542Z" fill="url(#d365_grad0)"/><path d="M290.417 109.791C290.417 124.664 281.124 137.978 267.155 143.082L106.25 201.875V343.541L290.417 276.249V109.791Z" fill="url(#d365_grad1)"/><path opacity="0.5" d="M290.417 109.791C290.417 124.664 281.124 137.978 267.155 143.082L106.25 201.875V343.541L290.417 276.249V109.791Z" fill="url(#d365_grad2)"/><path opacity="0.5" d="M219.588 160.509L162.889 181.251L162.89 264.332C162.89 269.281 167.836 272.705 172.468 270.961L196.648 261.86C210.45 256.664 219.588 243.461 219.588 228.713V160.509Z" fill="#B0ADFF"/></svg>
                            ) : (
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                                <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="currentColor" fillOpacity="0.5"/>
                                <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" fill="none"/>
                                <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" fill="none"/>
                              </svg>
                            )}
                          </div>
                          <div className={styles.chipContent}>
                            <h4 className={styles.chipTitle}>{product.name}</h4>
                            <span className={styles.categoryPill}>
                            {product.category === "Copilot Studio Custom" && <PeopleRegular style={{ fontSize: 12 }} />}
                            {product.category === "Dynamics 365 Sales" && <svg width="12" height="12" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"><g clipPath="url(#d365s_pill_c0)"><path d="M0 127.998C0 110.325 14.3269 95.998 32 95.998H42.6667V159.998H32C14.3269 159.998 0 145.671 0 127.998Z" fill="url(#d365s_pill_p0)"/><path d="M42.6665 79.998C42.6665 62.3249 56.9934 47.998 74.6665 47.998H85.3332V159.998H42.6665V79.998Z" fill="url(#d365s_pill_p2)"/><path d="M85.3335 31.998C85.3335 14.3249 99.6604 -0.00195312 117.333 -0.00195312H128C146.667 -0.00195312 160 4.13124 160 4.13124V143.998C160 152.835 152.837 159.998 144 159.998H85.3335V31.998Z" fill="url(#d365s_pill_p4)"/><path d="M143.959 0.996549C163.62 3.46713 182.516 10.48 199.113 21.5698C220.163 35.6346 236.569 55.6255 246.257 79.0145C255.945 102.403 258.479 128.14 253.541 152.97C248.602 177.799 236.411 200.607 218.51 218.508C200.608 236.409 177.801 248.6 152.971 253.538C128.142 258.477 102.405 255.942 79.0163 246.254C55.6274 236.566 35.6366 220.16 21.5718 199.111C7.50698 178.061 -4.88895e-05 153.314 2.38288e-10 127.998C2.38288e-10 145.671 14.3269 159.998 32 159.998H42.6667H74.6667H112C120.837 159.998 128 152.834 128 143.998V15.9979C128 7.16134 135.191 -0.105173 143.959 0.996549Z" fill="url(#d365s_pill_p6)"/></g><defs><linearGradient id="d365s_pill_p0" x1="0.608505" y1="139.96" x2="42.4696" y2="143.599" gradientUnits="userSpaceOnUse"><stop stopColor="#1B44B1"/><stop offset="1" stopColor="#102784"/></linearGradient><linearGradient id="d365s_pill_p2" x1="63.9998" y1="47.998" x2="63.9998" y2="159.998" gradientUnits="userSpaceOnUse"><stop stopColor="#0094F0"/><stop offset="0.775536" stopColor="#2052CB"/><stop offset="1" stopColor="#163697"/></linearGradient><linearGradient id="d365s_pill_p4" x1="106.667" y1="-0.00195312" x2="106.667" y2="159.998" gradientUnits="userSpaceOnUse"><stop stopColor="#26CFE8"/><stop offset="0.409431" stopColor="#0FAFFF"/><stop offset="0.809746" stopColor="#367AF2"/><stop offset="1" stopColor="#2052CB"/></linearGradient><radialGradient id="d365s_pill_p6" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(168.833 37.2047) rotate(90) scale(237.736 237.736)"><stop offset="0.062127" stopColor="#6FE8F5"/><stop offset="0.288121" stopColor="#3BD5FF"/><stop offset="0.68128" stopColor="#0094F0"/><stop offset="1" stopColor="#2052CB"/></radialGradient><clipPath id="d365s_pill_c0"><rect width="256" height="256" fill="white"/></clipPath></defs></svg>}
                            {product.category === "Dynamics 365 Service" && <svg width="12" height="12" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M179.763 32H240C248.837 32 256 39.1634 256 48V94.2509C256 106.386 251.645 118.118 243.726 127.313L168.414 214.768C147.136 239.477 108.864 239.476 87.5865 214.768L50.1536 171.3L167.743 37.4404C170.78 33.9823 175.16 32 179.763 32Z" fill="url(#d365cs_pill_p0)"/><path d="M76.2378 32H16C7.16344 32 0 39.1634 0 48V107.121C0 110.953 1.37524 114.657 3.87565 117.561L87.5826 214.77C108.861 239.481 147.137 239.479 168.414 214.767L205.854 171.281L88.2574 37.4393C85.2196 33.9819 80.8401 32 76.2378 32Z" fill="url(#d365cs_pill_p2)"/><path d="M167.42 127.538C187.502 150.394 222.976 150.478 243.185 127.941L168.414 214.768C147.136 239.476 108.864 239.476 87.5864 214.768L50.1538 171.299L128.003 82.6771L167.42 127.538Z" fill="url(#d365cs_pill_p3)"/><defs><linearGradient id="d365cs_pill_p0" x1="249.422" y1="29.6103" x2="242.825" y2="146.849" gradientUnits="userSpaceOnUse"><stop stopColor="#9C6CFE"/><stop offset="0.550303" stopColor="#7A41DC"/><stop offset="1" stopColor="#5B2AB5"/></linearGradient><linearGradient id="d365cs_pill_p2" x1="1.86997e-06" y1="50.8857" x2="153.695" y2="231.589" gradientUnits="userSpaceOnUse"><stop stopColor="#F8C4FA"/><stop offset="0.468701" stopColor="#E4A7FE"/><stop offset="1" stopColor="#AC80FF"/></linearGradient><linearGradient id="d365cs_pill_p3" x1="178.044" y1="139.026" x2="95.8605" y2="220.606" gradientUnits="userSpaceOnUse"><stop stopColor="#AC80FF"/><stop offset="0.699029" stopColor="#CC75FD" stopOpacity="0.190939"/><stop offset="1" stopColor="#D373FC" stopOpacity="0"/></linearGradient></defs></svg>}
                            {product.category === "Dynamics ERP" && <svg width="12" height="12" viewBox="0 0 340 340" fill="none" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="d365_pill_grad0" x1="134.743" y1="-3.542" x2="200.665" y2="169.02" gradientUnits="userSpaceOnUse"><stop stopColor="#0B53CE"/><stop offset="1" stopColor="#7252AA"/></linearGradient><linearGradient id="d365_pill_grad1" x1="227.154" y1="331.118" x2="227.154" y2="125.429" gradientUnits="userSpaceOnUse"><stop stopColor="#2266E3"/><stop offset="1" stopColor="#AE7FE2"/></linearGradient></defs><path d="M42.5 -3.542L290.417 85V206.566C290.417 216.362 280.713 223.202 271.487 219.908L219.583 201.377V132.544C219.583 117.789 210.436 104.58 196.623 99.39L172.491 90.323C167.86 88.583 162.917 92.006 162.917 96.954V181.131L42.5 138.125V-3.542Z" fill="url(#d365_pill_grad0)"/><path d="M290.417 109.791C290.417 124.664 281.124 137.978 267.155 143.082L106.25 201.875V343.541L290.417 276.249V109.791Z" fill="url(#d365_pill_grad1)"/><path opacity="0.5" d="M219.588 160.509L162.889 181.251L162.89 264.332C162.89 269.281 167.836 272.705 172.468 270.961L196.648 261.86C210.45 256.664 219.588 243.461 219.588 228.713V160.509Z" fill="#B0ADFF"/></svg>}
                            {product.category === "Microsoft 365" && <svg width="12" height="12" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M34.142 7.82501C33.5631 5.85387 31.7544 4.5 29.7 4.5L28.3484 4.5C26.1139 4.5 24.1982 6.09611 23.7949 8.29398L21.4802 20.9072L22.0546 18.9419C22.6316 16.9679 24.4416 15.6111 26.4983 15.6111H34.3521L37.6458 16.8942L40.8209 15.6111H39.8942C37.8398 15.6111 36.0312 14.2572 35.4522 12.2861L34.142 7.82501Z" fill="url(#m365_pill_p0)"/><path d="M14.3304 41.156C14.9029 43.1367 16.7162 44.5 18.7779 44.5H21.6483C24.1588 44.5 26.2119 42.499 26.2764 39.9893L26.5889 27.8271L25.9351 30.0603C25.3573 32.0332 23.5478 33.3889 21.492 33.3889L13.5728 33.3889L10.7496 31.8573L7.69302 33.3889H8.60427C10.666 33.3889 12.4793 34.7523 13.0518 36.7329L14.3304 41.156Z" fill="url(#m365_pill_p1)"/><path d="M29.4993 4.5H13.46C8.87732 4.5 6.12772 10.5566 4.29466 16.6132C2.12296 23.7886 -0.718769 33.3852 7.50252 33.3852H14.4282C16.4978 33.3852 18.3147 32.0168 18.8835 30.0269C20.0876 25.8143 22.1978 18.4655 23.8554 12.8712C24.6977 10.0283 25.3993 7.58673 26.4762 6.06628C27.0799 5.21385 28.086 4.5 29.4993 4.5Z" fill="url(#m365_pill_p2)"/><path d="M18.4977 44.5H34.537C39.1196 44.5 41.8692 38.4424 43.7023 32.3847C45.874 25.208 48.7157 15.6098 40.4944 15.6098H33.5689C31.4992 15.6098 29.6823 16.9784 29.1136 18.9684C27.9094 23.1816 25.7992 30.5319 24.1416 36.1273C23.2992 38.9707 22.5976 41.4127 21.5208 42.9334C20.9171 43.786 19.9109 44.5 18.4977 44.5Z" fill="url(#m365_pill_p4)"/><defs><radialGradient id="m365_pill_p0" cx="0" cy="0" r="1" gradientTransform="matrix(-10.9604 -13.3893 -11.8337 11.2305 38.0047 21.0144)" gradientUnits="userSpaceOnUse"><stop offset="0.0955758" stopColor="#00AEFF"/><stop offset="0.773185" stopColor="#2253CE"/><stop offset="1" stopColor="#0736C4"/></radialGradient><radialGradient id="m365_pill_p1" cx="0" cy="0" r="1" gradientTransform="matrix(9.88029 12.5737 11.6634 -10.2629 11.1211 33.3171)" gradientUnits="userSpaceOnUse"><stop stopColor="#FFB657"/><stop offset="0.633728" stopColor="#FF5F3D"/><stop offset="0.923392" stopColor="#C02B3C"/></radialGradient><linearGradient id="m365_pill_p2" x1="12.5" y1="8" x2="14.7884" y2="34.4751" gradientUnits="userSpaceOnUse"><stop offset="0.156162" stopColor="#0D91E1"/><stop offset="0.487484" stopColor="#52B471"/><stop offset="0.652394" stopColor="#98BD42"/><stop offset="0.937361" stopColor="#FFC800"/></linearGradient><radialGradient id="m365_pill_p4" cx="0" cy="0" r="1" gradientTransform="matrix(-12.6712 36.2356 -43.1249 -15.9926 41.3183 12.7812)" gradientUnits="userSpaceOnUse"><stop offset="0.0661714" stopColor="#8C48FF"/><stop offset="0.5" stopColor="#F2598A"/><stop offset="0.895833" stopColor="#FFB152"/></radialGradient></defs></svg>}
                            {product.category}
                          </span>
                            <p className={styles.chipDescription}>{product.description}</p>
                          </div>
                          <div className={styles.chipActions}>
                            <div className={styles.badgeWrapper}>
                              <button
                                onClick={(e) => { e.stopPropagation(); addProduct(product.id, product.name, product.category); }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.backgroundColor = tokens.colorNeutralBackground4;
                                  e.currentTarget.style.borderColor = "#464feb";
                                  const svg = e.currentTarget.querySelector("svg");
                                  if (svg) svg.style.color = "#464feb";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.backgroundColor = "transparent";
                                  e.currentTarget.style.borderColor = tokens.colorNeutralForeground3;
                                  const svg = e.currentTarget.querySelector("svg");
                                  if (svg) svg.style.color = tokens.colorNeutralForeground1;
                                }}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  width: "20px",
                                  height: "20px",
                                  borderRadius: "3px",
                                  border: `1px solid ${tokens.colorNeutralForeground3}`,
                                  backgroundColor: "transparent",
                                  cursor: "pointer",
                                  outline: "none",
                                  padding: 0,
                                  transition: "background-color 0.15s ease, border-radius 0.15s ease, border 0.15s ease",
                                }}
                              >
                                <AddRegular style={{ color: tokens.colorNeutralForeground1, fontSize: "14px", transition: "color 0.15s ease" }} />
                              </button>
                              {products.filter(p => p.productId === product.id).length > 0 && (
                                <Badge 
                                  appearance="filled" 
                                  color="danger"
                                  className={styles.countBadge}
                                  shape="circular"
                                  size="small"
                                >
                                  {products.filter(p => p.productId === product.id).length}
                                </Badge>
                              )}
                            </div>
                          </div>
                          </div>
                          {products.filter(p => p.productId === product.id).length > 0 && (
                            <div
                              onClick={(e) => e.stopPropagation()}
                              style={{
                                width: "100%",
                                marginTop: "8px",
                                borderTop: `1px solid ${tokens.colorNeutralStroke2}`,
                                paddingTop: "6px",
                                display: "flex",
                                flexDirection: "column",
                                gap: "2px",
                              }}
                            >
                              {products.filter(p => p.productId === product.id).map(addedAgent => (
                                <div
                                  key={addedAgent.id}
                                  style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "flex-start",
                                    gap: "12px",
                                    padding: "3px 4px",
                                    borderRadius: "4px",
                                  }}
                                  onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = tokens.colorNeutralBackground3;
                                  }}
                                  onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = "transparent";
                                  }}
                                >
                                  <span style={{ fontSize: "14px", color: tokens.colorNeutralForeground1, fontWeight: 500, lineHeight: "20px", flex: 1, textWrap: "pretty" }}>
                                    {addedAgent.name}
                                  </span>
                                  <Button
                                    appearance="subtle"
                                    size="small"
                                    icon={<DeleteRegular />}
                                    onClick={(e) => { e.stopPropagation(); removeProduct(addedAgent.id, addedAgent.productId); }}
                                    style={{ flexShrink: 0 }}
                                  />
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      );
                      })}
                    </div>
                    )}
                  </div>
                </div>
              )}

              {/* Two Column Layout */}
              {products.length > 0 && (
                <div className={styles.twoColumnLayout}>
                  {/* Estimation Form Column */}
                  <div className={styles.estimationColumn}>
                    {products.map(product => (
                      <div key={product.id} className={styles.productCard}>
                        {/* Product Header */}
                        <div className={styles.productCardHeader} style={{ cursor: "pointer", userSelect: "none", ...(collapsedForms.has(product.id) ? { borderBottom: "none", paddingBottom: 0 } : {}) }} onClick={() => setCollapsedForms(prev => { const next = new Set(prev); if (next.has(product.id)) next.delete(product.id); else next.add(product.id); return next; })}>
                          <div style={{ display: "flex", alignItems: "center", flex: 1, minWidth: 0 }}>
                            <button
                              onClick={(e) => { e.stopPropagation(); setCollapsedForms(prev => { const next = new Set(prev); if (next.has(product.id)) next.delete(product.id); else next.add(product.id); return next; }); }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = tokens.colorNeutralBackground4;
                                e.currentTarget.style.borderColor = "#464feb";
                                const svg = e.currentTarget.querySelector("svg");
                                if (svg) svg.style.color = "#464feb";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = "transparent";
                                e.currentTarget.style.borderColor = "transparent";
                                const svg = e.currentTarget.querySelector("svg");
                                if (svg) svg.style.color = tokens.colorNeutralForeground3;
                              }}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "28px",
                                height: "28px",
                                borderRadius: "50%",
                                border: "1px solid transparent",
                                backgroundColor: "transparent",
                                cursor: "pointer",
                                outline: "none",
                                padding: 0,
                                flexShrink: 0,
                                marginLeft: "-36px",
                                marginRight: "8px",
                                transition: "background-color 0.15s ease, border-color 0.15s ease",
                              }}
                            >
                              {collapsedForms.has(product.id) ? <ChevronDownRegular style={{ color: tokens.colorNeutralForeground3, fontSize: "16px", transition: "color 0.15s ease" }} /> : <ChevronUpRegular style={{ color: tokens.colorNeutralForeground3, fontSize: "16px", transition: "color 0.15s ease" }} />}
                            </button>
                            <p className={styles.productTitle} style={{ margin: 0 }}>{product.name}</p>
                          </div>
                          <Button
                            appearance="subtle"
                            size="small"
                            icon={<DeleteRegular />}
                            onClick={(e) => { e.stopPropagation(); removeProduct(product.id, product.productId); }}
                          />
                        </div>

                        {!collapsedForms.has(product.id) && (<>
                        {/* Microsoft 365 Licenses */}
                        <div className={`${styles.section} ${styles.sectionBorder}`}>
                          <div className={styles.sectionHeader}>
                            <h3 className={styles.h4Title}>Microsoft 365 Copilot licenses</h3>
                            <p className={styles.sectionDescription}>
                              How many users have Microsoft 365 Copilot licenses?
                            </p>
                          </div>
                          <Input 
                            value={product.m365LicenseCount}
                            onChange={(_, data) => updateProduct(product.id, { m365LicenseCount: data.value })}
                            placeholder="e.g. 100"
                          />
                        </div>

                        {/* Agent Traffic */}
                        <div className={`${styles.section} ${styles.sectionBorder}`}>
                          <div className={styles.sectionHeader}>
                            <h3 className={styles.h4Title}>Agent traffic</h3>
                            <p className={styles.sectionDescription}>
                              Agent traffic quantifies the activity an agent supports by assessing the number of end users accessing the agent and their monthly engagement frequency.
                            </p>
                          </div>

                          <div className={styles.inputsRow}>
                            <div className={styles.inputColumn}>
                              <Label required>How many users?</Label>
                              <Input 
                                value={product.users}
                                onChange={(_, data) => updateProduct(product.id, { users: data.value })}
                                placeholder="e.g. 100"
                              />
                            </div>
                            <div className={styles.inputColumn}>
                              <Label required>How often will a user interact with the agent per month?</Label>
                              <Input 
                                value={product.interactionsPerMonth}
                                onChange={(_, data) => updateProduct(product.id, { interactionsPerMonth: data.value })}
                                placeholder="e.g. 100"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Agent knowledge */}
                        <div className={`${styles.section} ${styles.sectionBorder}`}>
                          <div className={styles.sectionHeader}>
                            <h3 className={styles.h4Title}>Agent knowledge</h3>
                            <p className={styles.sectionDescription}>
                              Knowledge sources enable agents to provide relevant information and insights. Published agents use configured knowledge sources to ground their responses.
                            </p>
                            <Link href="#">Learn more</Link>
                          </div>

                          <div className={styles.inputColumn}>
                            <Label required>What is the percentage of agent responses are from knowledge added to your agent?</Label>
                            <Input 
                              value={product.knowledgePercent}
                              onChange={(_, data) => updateProduct(product.id, { knowledgePercent: data.value })}
                              placeholder="e.g. 100"
                            />
                          </div>

                          <div className={styles.inputsRow}>
                            <div className={styles.inputColumn}>
                              <Label>What is the percentage of knowledge responses from tenant graph grounding?</Label>
                              <Input 
                                value={product.tenantGraphPercent}
                                onChange={(_, data) => updateProduct(product.id, { tenantGraphPercent: data.value })}
                                placeholder="e.g. 100"
                              />
                            </div>
                            <div className={styles.outputColumn}>
                              <Label>All other knowledge</Label>
                              <p className={styles.outputValue}>
                                {100 - (parseInt(product.tenantGraphPercent) || 0)}%
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Agent tools/actions */}
                        <div className={styles.section}>
                          <div className={styles.sectionHeader}>
                            <h3 className={styles.h4Title}>Agent tools/actions</h3>
                            <p className={styles.sectionDescription}>
                              Help agents answer a query, execute workflows, connect to external systems, or provide topic-specific guidance. <Link href="#">Learn more</Link>
                            </p>
                          </div>

                          <div className={styles.toolsTable}>
                            <div className={styles.toolsTableHeader}>
                              <p className={styles.toolsTableHeaderCell}>Tool type</p>
                              <p className={styles.toolsTableHeaderCell}>How many tools are configured?</p>
                              <p className={styles.toolsTableHeaderCell}>How often will they be invoked per interaction?</p>
                            </div>

                            <div className={styles.toolsTableRow}>
                              <p className={styles.toolsTableCell}>Prompt</p>
                              <Input
                                value={product.promptCount}
                                onChange={(_, data) => updateProduct(product.id, { promptCount: data.value })}
                                placeholder="0"
                              />
                              <Input
                                value={product.promptFreq}
                                onChange={(_, data) => updateProduct(product.id, { promptFreq: data.value })}
                                placeholder="0"
                              />
                            </div>

                            <div className={styles.toolsTableRow}>
                              <p className={styles.toolsTableCell}>Agent flow</p>
                              <Input
                                value={product.agentFlowCount}
                                onChange={(_, data) => updateProduct(product.id, { agentFlowCount: data.value })}
                                placeholder="0"
                              />
                              <Input
                                value={product.agentFlowFreq}
                                onChange={(_, data) => updateProduct(product.id, { agentFlowFreq: data.value })}
                                placeholder="0"
                              />
                            </div>

                            <div className={styles.toolsTableRow}>
                              <p className={styles.toolsTableCell}>Computer use</p>
                              <Input
                                value={product.computerUseCount}
                                onChange={(_, data) => updateProduct(product.id, { computerUseCount: data.value })}
                                placeholder="0"
                              />
                              <Input
                                value={product.computerUseFreq}
                                onChange={(_, data) => updateProduct(product.id, { computerUseFreq: data.value })}
                                placeholder="0"
                              />
                            </div>

                            <div className={styles.toolsTableRow}>
                              <p className={styles.toolsTableCell}>Custom connector</p>
                              <Input
                                value={product.customConnectorCount}
                                onChange={(_, data) => updateProduct(product.id, { customConnectorCount: data.value })}
                                placeholder="1"
                              />
                              <Input
                                value={product.customConnectorFreq}
                                onChange={(_, data) => updateProduct(product.id, { customConnectorFreq: data.value })}
                                placeholder="1"
                              />
                            </div>

                            <div className={styles.toolsTableRow}>
                              <p className={styles.toolsTableCell}>Model Context Protocol</p>
                              <Input
                                value={product.mcpCount}
                                onChange={(_, data) => updateProduct(product.id, { mcpCount: data.value })}
                                placeholder="e.g. 1"
                              />
                              <Input
                                value={product.mcpFreq}
                                onChange={(_, data) => updateProduct(product.id, { mcpFreq: data.value })}
                                placeholder="e.g. 0.2"
                              />
                            </div>

                            <div className={styles.toolsTableRow}>
                              <p className={styles.toolsTableCell}>REST API</p>
                              <Input
                                value={product.restApiCount}
                                onChange={(_, data) => updateProduct(product.id, { restApiCount: data.value })}
                                placeholder="e.g. 1"
                              />
                              <Input
                                value={product.restApiFreq}
                                onChange={(_, data) => updateProduct(product.id, { restApiFreq: data.value })}
                                placeholder="e.g. 0.3"
                              />
                            </div>
                          </div>
                        </div>

                        {/* Agent flows - revealed when Agent flow has a value */}
                        {(parseInt(product.agentFlowCount) > 0 || parseInt(product.agentFlowFreq) > 0) && (
                          <div className={`${styles.section} ${styles.sectionBorder}`}>
                            <div className={styles.sectionHeader}>
                              <h3 className={styles.h4Title}>Agent flows</h3>
                              <p className={styles.sectionDescription}>
                                Agent flows represent the number of predefined action sequences configured for an agent. <Link href="#">Learn more</Link>
                              </p>
                            </div>

                            <div className={styles.inputsRow}>
                              <div className={styles.inputColumn}>
                                <Label>How many agent flows have you configured for your agent (either within a topic or standalone agent action)?</Label>
                                <Link href="#">Learn more</Link>
                                <Input
                                  value={product.agentFlowConfiguredCount}
                                  onChange={(_, data) => updateProduct(product.id, { agentFlowConfiguredCount: data.value })}
                                  placeholder="1"
                                />
                              </div>
                              <div className={styles.inputColumn}>
                                <Label>On average, how many actions does each agent flow contain?</Label>
                                <Input
                                  value={product.agentFlowActionsCount}
                                  onChange={(_, data) => updateProduct(product.id, { agentFlowActionsCount: data.value })}
                                  placeholder="e.g. 10"
                                />
                              </div>
                            </div>
                          </div>
                        )}

                        {/* Agent optional modifiers - revealed when Prompt has a value */}
                        {(parseInt(product.promptCount) > 0 || parseInt(product.promptFreq) > 0) && (
                          <div className={styles.section}>
                            <div className={styles.sectionHeader}>
                              <h3 className={styles.h4Title}>Agent optional modifiers</h3>
                              <p className={styles.sectionDescription}>
                                These features are not required for agents but drive additional Copilot credit consumption
                              </p>
                            </div>

                            <div className={styles.toolsTable}>
                              <div className={styles.toolsTableHeader}>
                                <p className={styles.toolsTableHeaderCell}>Prompt model type <Link href="#">Learn more</Link></p>
                                <p className={styles.toolsTableHeaderCell}>How many prompts?</p>
                                <p className={styles.toolsTableHeaderCell}>How often will they be triggered in your agent?</p>
                              </div>

                              <div className={styles.toolsTableRow}>
                                <p className={styles.toolsTableCell}>Basic</p>
                                <Input
                                  value={product.promptBasicCount}
                                  onChange={(_, data) => updateProduct(product.id, { promptBasicCount: data.value })}
                                  placeholder="1"
                                />
                                <Input
                                  value={product.promptBasicFreq}
                                  onChange={(_, data) => updateProduct(product.id, { promptBasicFreq: data.value })}
                                  placeholder="e.g. 4"
                                />
                              </div>

                              <div className={styles.toolsTableRow}>
                                <p className={styles.toolsTableCell}>Standard</p>
                                <Input
                                  value={product.promptStandardCount}
                                  onChange={(_, data) => updateProduct(product.id, { promptStandardCount: data.value })}
                                  placeholder="e.g. 1"
                                />
                                <Input
                                  value={product.promptStandardFreq}
                                  onChange={(_, data) => updateProduct(product.id, { promptStandardFreq: data.value })}
                                  placeholder="e.g. 4"
                                />
                              </div>

                              <div className={styles.toolsTableRow}>
                                <p className={styles.toolsTableCell}>Premium</p>
                                <Input
                                  value={product.promptPremiumCount}
                                  onChange={(_, data) => updateProduct(product.id, { promptPremiumCount: data.value })}
                                  placeholder="e.g. 1"
                                />
                                <Input
                                  value={product.promptPremiumFreq}
                                  onChange={(_, data) => updateProduct(product.id, { promptPremiumFreq: data.value })}
                                  placeholder="e.g. 4"
                                />
                              </div>
                            </div>
                          </div>
                        )}
                        </>)}
                      </div>
                    ))}
                  </div>

                  {/* Calculation Column */}
                  <div className={styles.calculationPanel}>
                   <div className={styles.calcStickyHeader}>
                    <div style={{
                      display: "inline-flex",
                      border: `1px solid ${tokens.colorNeutralStroke2}`,
                      borderRadius: "8px",
                      overflow: "hidden",
                      alignSelf: "center",
                    }}>
                      {[
                        { period: "month" as const, label: "Per month", radiusLeft: "8px", radiusRight: "0" },
                        { period: "year" as const, label: "Per year", radiusLeft: "0", radiusRight: "8px" },
                      ].map(({ period, label, radiusLeft, radiusRight }, index) => (
                        <button
                          key={period}
                          onClick={() => setTimePeriod(period)}
                          onMouseEnter={(e) => {
                            if (timePeriod !== period) {
                              e.currentTarget.style.background = "#e0e0e0";
                            }
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = timePeriod === period ? tokens.colorNeutralBackground1 : tokens.colorNeutralBackground3;
                          }}
                          style={{
                            padding: "10px 20px",
                            fontSize: "15px",
                            fontWeight: 600,
                            color: timePeriod === period ? "#464feb" : tokens.colorNeutralForeground3,
                            background: timePeriod === period ? tokens.colorNeutralBackground1 : tokens.colorNeutralBackground3,
                            border: "none",
                            borderLeft: index > 0 ? `1px solid ${tokens.colorNeutralStroke2}` : "none",
                            cursor: "pointer",
                            borderRadius: `${radiusLeft} ${radiusRight} ${radiusRight} ${radiusLeft}`,
                            outline: "none",
                          }}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                    <div style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "stretch",
                      gap: "0px",
                      paddingBottom: "16px",
                      marginBottom: "0px",
                      width: "100%",
                    }}>
                      <div style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "12px",
                        flex: 1,
                        minWidth: 0,
                      }}>
                        <p style={{ fontSize: "14px", fontWeight: 600, letterSpacing: "0.5px", textTransform: "uppercase", color: tokens.colorNeutralForeground3, margin: 0, textAlign: "center", lineHeight: "20px" }}>Total estimated Copilot credits</p>
                        <p style={{ fontSize: "40px", fontWeight: 700, color: tokens.colorBrandBackground, margin: 0 }}>{displayCredits.toLocaleString()}</p>
                      </div>
                    </div>
                   </div>

                   <div className={styles.calcScrollArea}>
                    <div className={styles.expandedSection}>
                      {products.map(product => {
                        const users = parseInt(product.users) || 0;
                        const m365Count = parseInt(product.m365LicenseCount) || 0;
                        const interactions = parseInt(product.interactionsPerMonth) || 0;
                        const knowledgePct = (parseInt(product.knowledgePercent) || 0) / 100;
                        const tenantGraphPct = (parseInt(product.tenantGraphPercent) || 0) / 100;
                        const otherKnowledgePct = 1 - tenantGraphPct;

                        const billableUsers = Math.max(users - m365Count, 0);
                        const agentTraffic = billableUsers * interactions;
                        const trafficRequiringKnowledge = agentTraffic * knowledgePct;

                        const ttgMessages = Math.round(trafficRequiringKnowledge * tenantGraphPct * 12);
                        const otherKnowledgeMessages = Math.round(trafficRequiringKnowledge * otherKnowledgePct * 2);
                        const knowledgeCredits = ttgMessages + otherKnowledgeMessages;

                        const promptToolCount = parseInt(product.promptCount) || 0;
                        const computerUseCount = parseInt(product.computerUseCount) || 0;
                        const customConnectorCount = parseInt(product.customConnectorCount) || 0;
                        const mcpCount = parseInt(product.mcpCount) || 0;
                        const restApiCount = parseInt(product.restApiCount) || 0;
                        const totalToolInvocations = promptToolCount + computerUseCount + customConnectorCount + mcpCount + restApiCount;
                        const toolsCredits = Math.round(agentTraffic * totalToolInvocations * 5);

                        const flowsConfigured = parseInt(product.agentFlowConfiguredCount) || 0;
                        const flowActionsCount = parseInt(product.agentFlowActionsCount) || 0;
                        const flowsCredits = Math.round(flowsConfigured * flowActionsCount * 0.13 * interactions);

                        const copilotRatio = users > 0 ? Math.max((users - m365Count) / users, 0) : 1;
                        const basicCount = parseInt(product.promptBasicCount) || 0;
                        const basicFreq = parseFloat(product.promptBasicFreq) || 0;
                        const standardCount = parseInt(product.promptStandardCount) || 0;
                        const standardFreq = parseFloat(product.promptStandardFreq) || 0;
                        const premiumCount = parseInt(product.promptPremiumCount) || 0;
                        const premiumFreq = parseFloat(product.promptPremiumFreq) || 0;

                        const basicCredits = Math.round(basicCount * basicFreq * 0.1 * 3.073 * copilotRatio);
                        const standardCredits = Math.round(standardCount * standardFreq * 1.5 * 4.945 * copilotRatio);
                        const premiumCredits = Math.round(premiumCount * premiumFreq * 10 * 7.091 * copilotRatio);
                        const modifiersCredits = basicCredits + standardCredits + premiumCredits;

                        // Negation values (Microsoft 365 Copilot license zero-rating)
                        // @ts-expect-error TS6133 - computed for future use
                        const knowledgeNegation = users > 0 ? Math.round(knowledgeCredits * (m365Count / users)) : 0;
                        // @ts-expect-error TS6133 - computed for future use
                        const toolsNegation = users > 0 ? Math.round(toolsCredits * (m365Count / users)) : 0;
                        // @ts-expect-error TS6133 - computed for future use
                        const flowsNegation = users > 0 ? Math.round(flowsCredits * (m365Count / users)) : 0;
                        // @ts-expect-error TS6133 - computed for future use
                        const modifiersNegation = users > 0 ? Math.round(modifiersCredits * (m365Count / users)) : 0;

                        return (
                          <div key={product.id} style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "20px",
                            border: `1px solid ${tokens.colorNeutralStroke2}`,
                            borderRadius: "12px",
                            padding: "24px 24px 24px 48px",
                          }}>
                            <div style={{ display: "flex", alignItems: "center", cursor: "pointer", userSelect: "none" }} onClick={() => setCollapsedEstimations(prev => { const next = new Set(prev); if (next.has(product.id)) next.delete(product.id); else next.add(product.id); return next; })}>
                              <button
                                onClick={(e) => { e.stopPropagation(); setCollapsedEstimations(prev => { const next = new Set(prev); if (next.has(product.id)) next.delete(product.id); else next.add(product.id); return next; }); }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.backgroundColor = tokens.colorNeutralBackground4;
                                  e.currentTarget.style.borderColor = "#464feb";
                                  const svg = e.currentTarget.querySelector("svg");
                                  if (svg) svg.style.color = "#464feb";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.backgroundColor = "transparent";
                                  e.currentTarget.style.borderColor = "transparent";
                                  const svg = e.currentTarget.querySelector("svg");
                                  if (svg) svg.style.color = tokens.colorNeutralForeground3;
                                }}
                                style={{
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  width: "28px",
                                  height: "28px",
                                  borderRadius: "50%",
                                  border: "1px solid transparent",
                                  backgroundColor: "transparent",
                                  cursor: "pointer",
                                  outline: "none",
                                  padding: 0,
                                  flexShrink: 0,
                                  marginLeft: "-36px",
                                  marginRight: "8px",
                                  transition: "background-color 0.15s ease, border-color 0.15s ease",
                                }}
                              >
                                {collapsedEstimations.has(product.id) ? <ChevronDownRegular style={{ color: tokens.colorNeutralForeground3, fontSize: "16px", transition: "color 0.15s ease" }} /> : <ChevronUpRegular style={{ color: tokens.colorNeutralForeground3, fontSize: "16px", transition: "color 0.15s ease" }} />}
                              </button>
                              <div style={{ display: "flex", alignItems: "baseline", gap: "8px", flex: 1, minWidth: 0 }}>
                                <p style={{ fontSize: "20px", lineHeight: "28px", fontWeight: 600, color: tokens.colorNeutralForeground1, margin: 0 }}>{product.name}</p>
                                <span className={styles.calcLeader} />
                                <p style={{ fontSize: "20px", lineHeight: "28px", fontWeight: 600, color: tokens.colorNeutralForeground1, margin: 0, flexShrink: 0, whiteSpace: "nowrap" }}>{(calculateProductCredits(product) * timeMultiplier).toLocaleString()}</p>
                              </div>
                            </div>

                            {!collapsedEstimations.has(product.id) && (<>
                            <div className={styles.calcSectionContainer}>
                              <div style={{ display: "flex", alignItems: "baseline", gap: "8px", width: "100%" }}>
                                <h3 className={styles.h4Title}>Copilot credits driven by knowledge</h3>
                                <span className={styles.calcLeader} />
                                <p style={{ fontSize: "14px", fontWeight: 600, color: tokens.colorNeutralForeground1, margin: 0, flexShrink: 0, whiteSpace: "nowrap" }}>{(knowledgeCredits * timeMultiplier).toLocaleString()}</p>
                              </div>

                              <div className={styles.calcItemRow}>
                                <p className={styles.calcItemLabel}>Copilot credits consumed for tenant graph grounding</p>
                                <span className={styles.calcLeader} />
                                <p className={styles.calcItemValue}>{(ttgMessages * timeMultiplier).toLocaleString()}</p>
                              </div>

                              <div className={styles.calcItemRow}>
                                <p className={styles.calcItemLabel}>Copilot credits consumed for non-tenant graph grounding: Dataverse, web, files</p>
                                <span className={styles.calcLeader} />
                                <p className={styles.calcItemValue}>{(otherKnowledgeMessages * timeMultiplier).toLocaleString()}</p>
                              </div>

                            </div>

                            {/* Copilot credits driven by agent tools */}
                            <div className={styles.calcSectionContainer}>
                              <div style={{ display: "flex", alignItems: "baseline", gap: "8px", width: "100%" }}>
                                <h3 className={styles.h4Title}>Copilot credits driven by agent tools</h3>
                                <span className={styles.calcLeader} />
                                <p style={{ fontSize: "14px", fontWeight: 600, color: tokens.colorNeutralForeground1, margin: 0, flexShrink: 0, whiteSpace: "nowrap" }}>{(toolsCredits * timeMultiplier).toLocaleString()}</p>
                              </div>
                            </div>

                            {/* Copilot credits driven by agent flows */}
                            <div className={styles.calcSectionContainer}>
                              <div style={{ display: "flex", alignItems: "baseline", gap: "8px", width: "100%" }}>
                                <h3 className={styles.h4Title}>Copilot credits driven by agent flows</h3>
                                <span className={styles.calcLeader} />
                                <p style={{ fontSize: "14px", fontWeight: 600, color: tokens.colorNeutralForeground1, margin: 0, flexShrink: 0, whiteSpace: "nowrap" }}>{(flowsCredits * timeMultiplier).toLocaleString()}</p>
                              </div>
                            </div>

                            {/* Copilot credits driven by optional modifiers */}
                            <div className={styles.calcSectionContainer}>
                              <div style={{ display: "flex", alignItems: "baseline", gap: "8px", width: "100%" }}>
                                <h3 className={styles.h4Title}>Copilot credits driven by optional modifiers</h3>
                                <span className={styles.calcLeader} />
                                <p style={{ fontSize: "14px", fontWeight: 600, color: tokens.colorNeutralForeground1, margin: 0, flexShrink: 0, whiteSpace: "nowrap" }}>{(modifiersCredits * timeMultiplier).toLocaleString()}</p>
                              </div>

                              <p style={{ fontSize: "14px", fontWeight: 600, color: tokens.colorNeutralForeground1, margin: 0, paddingLeft: "15px" }}>Prompts</p>

                              <div className={styles.calcItemRow}>
                                <p className={styles.calcItemLabel} style={{ fontWeight: 600, paddingLeft: "16px" }}>Basic</p>
                                <span className={styles.calcLeader} />
                                <p className={styles.calcItemValue}>{(basicCredits * timeMultiplier).toLocaleString()}</p>
                              </div>

                              <div className={styles.calcItemRow}>
                                <p className={styles.calcItemLabel} style={{ fontWeight: 600, paddingLeft: "16px" }}>Standard</p>
                                <span className={styles.calcLeader} />
                                <p className={styles.calcItemValue}>{(standardCredits * timeMultiplier).toLocaleString()}</p>
                              </div>

                              <div className={styles.calcItemRow}>
                                <p className={styles.calcItemLabel} style={{ fontWeight: 600, paddingLeft: "16px" }}>Premium</p>
                                <span className={styles.calcLeader} />
                                <p className={styles.calcItemValue}>{(premiumCredits * timeMultiplier).toLocaleString()}</p>
                              </div>
                            </div>
                            </>)}
                          </div>
                        );
                      })}
                    </div>

                    <p style={{ fontSize: "14px", lineHeight: "20px", color: tokens.colorNeutralForeground3, margin: 0, textAlign: "center" as const }}>
                      *Estimates are for planning purposes only. Actual credit consumption may vary based on usage patterns.
                    </p>
                   </div>
                  </div>
                </div>
              )}

              {/* Legal */}
              <div className={styles.legalContainer} style={{ marginTop: "48px", marginBottom: "64px", position: "relative" }}>
                {/* Version Switcher */}
                <div style={{ position: "absolute", left: 0, top: 0, flexShrink: 0 }}>
                  <button
                    onClick={() => setVersionMenuOpen(!versionMenuOpen)}
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#3a3ec5"; e.currentTarget.style.transform = "scale(1.05)"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "#464feb"; e.currentTarget.style.transform = "scale(1)"; }}
                    style={{
                      display: "flex", alignItems: "center", justifyContent: "center",
                      width: "44px", height: "44px", borderRadius: "50%",
                      border: "none", backgroundColor: "#464feb",
                      color: "#ffffff", cursor: "pointer", outline: "none",
                      boxShadow: "0 2px 8px rgba(70,79,235,0.3), 0 6px 20px rgba(70,79,235,0.15)",
                      transition: "background-color 0.15s ease, transform 0.15s ease",
                    }}
                  >
                    <InfoRegular style={{ fontSize: "20px" }} />
                  </button>
                  {versionMenuOpen && (
                    <>
                      <div onClick={() => setVersionMenuOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 1999 }} />
                      <div style={{
                        position: "absolute", bottom: "52px", left: 0,
                        backgroundColor: tokens.colorNeutralBackground1, borderRadius: "12px",
                        boxShadow: "0 4px 16px rgba(0,0,0,0.12), 0 12px 32px rgba(0,0,0,0.08)",
                        border: `1px solid ${tokens.colorNeutralStroke2}`,
                        zIndex: 2001, minWidth: "260px", padding: "8px",
                        display: "flex", flexDirection: "column", gap: "2px",
                      }}>
                        <p style={{ fontSize: "12px", fontWeight: 600, color: tokens.colorNeutralForeground3, margin: 0, padding: "8px 12px 6px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Design versions</p>
                        {versions.map(v => (
                          <button
                            key={v.id}
                            onClick={() => { onVersionChange(v.id); setVersionMenuOpen(false); }}
                            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = tokens.colorNeutralBackground4; }}
                            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = currentVersion === v.id ? tokens.colorNeutralBackground3 : "transparent"; }}
                            style={{
                              display: "flex", alignItems: "center", gap: "12px",
                              padding: "10px 12px", borderRadius: "8px", border: "none",
                              backgroundColor: currentVersion === v.id ? tokens.colorNeutralBackground3 : "transparent",
                              cursor: "pointer", outline: "none", width: "100%", textAlign: "left",
                              transition: "background-color 0.1s ease",
                            }}
                          >
                            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "2px" }}>
                              <span style={{ fontSize: "14px", fontWeight: 600, color: tokens.colorNeutralForeground1 }}>{v.label}</span>
                              <span style={{ fontSize: "12px", color: tokens.colorNeutralForeground3 }}>{v.description}</span>
                            </div>
                            {currentVersion === v.id && (
                              <CheckmarkRegular style={{ fontSize: "16px", color: "#464feb", flexShrink: 0 }} />
                            )}
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
                <p className={styles.legalText}>
                  The Copilot Studio estimator is not a binding offer nor a guarantee of the final cost or availability of the product. This estimate should be regarded only as guidance and not incorporated into a contractual agreement. The actual amount of message consumption and associated cost may vary depending on the region, availability, workload usage, number of users, and other factors. You may contact your Microsoft representative before making any customer recommendations or purchase decisions. Microsoft reserves the right to modify or discontinue the Copilot Studio estimator at any time without notice.
                </p>
              </div>
            </div>
          </div>
    </FluentProvider>
  );
}

export default AppV1;
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
  CartRegular,
  PeopleRegular,
  PersonRegular,
  ShoppingBagRegular,
  BuildingRegular,
  AppGenericRegular,
} from "@fluentui/react-icons";

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
    border: `1.5px solid ${tokens.colorBrandBackground}`,
    padding: "14.5px",
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
    border: `1.5px solid ${tokens.colorBrandBackground}`,
    padding: "15.5px",
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
    marginTop: "auto",
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
    padding: "48px 48px 24px",
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
    fontSize: "10px",
    lineHeight: "14px",
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

type ProductCategory = "Employee facing custom" | "Customer facing custom" | "Dynamics 365 Sales" | "Dynamics 365 Service" | "Business Central" | "M365" | "";

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
];

function App() {
  const styles = useStyles();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<ProductCategory[]>([]);
  const [selectedProductIds, setSelectedProductIds] = useState<string[]>([]);
  const [timePeriod, setTimePeriod] = useState<"month" | "year">("month");
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
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

    // Billable users (zero-rated for M365 Copilot license holders)
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
    const isB2C = product.category === "Customer facing custom";
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

    const isB2C = product.category === "Customer facing custom";
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
        ["Credits Negated with M365 Copilot", displayNegated.toLocaleString()],
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
          ["M365 Copilot Licenses", m365Count],
          ["Interactions / Month", interactions],
          ["Knowledge %", product.knowledgePercent || "0"],
          ["Tenant Graph %", product.tenantGraphPercent || "0"],
          ["Net Credits (" + timePeriod + ")", (productCredits * timeMultiplier).toLocaleString()],
          ["Negated Credits (" + timePeriod + ")", (productNegation * timeMultiplier).toLocaleString()],
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
                  <div>
                    <h2 style={{ fontSize: "20px", fontWeight: 600, margin: 0, marginBottom: "8px" }}>
                      Select product category
                    </h2>
                    <p className={styles.sectionDescription}>
                      Choose a product category to begin configuring your agent estimation.
                    </p>
                  </div>
                  
                  <div className={styles.categoryCatalogGrid}>
                    {[
                      { name: "Employee facing custom" as ProductCategory, description: "Custom agents for internal employee-facing scenarios.", icon: <PeopleRegular /> },
                      { name: "Customer facing custom" as ProductCategory, description: "Custom agents for external customer-facing scenarios.", icon: <PersonRegular /> },
                      { name: "Dynamics 365 Sales" as ProductCategory, description: "Pre-built agents for Dynamics 365 Sales workflows.", icon: <ShoppingBagRegular /> },
                      { name: "Dynamics 365 Service" as ProductCategory, description: "Pre-built agents for Dynamics 365 Service workflows.", icon: <BuildingRegular /> },
                      { name: "Business Central" as ProductCategory, description: "Pre-built agents for Business Central workflows.", icon: <CartRegular /> },
                      { name: "M365" as ProductCategory, description: "Pre-built agents for Microsoft 365 scenarios.", icon: <AppGenericRegular /> },
                    ].map(cat => {
                      const isSelected = selectedCategories.includes(cat.name);
                      return (
                        <div
                          key={cat.name}
                          className={`${styles.categoryCatalogItem} ${isSelected ? styles.categoryCatalogItemSelected : ''}`}
                          onClick={() => toggleCategory(cat.name)}
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
                </div>
              </div>

              {/* Product Selection Section */}
              {visibleProducts.length > 0 && (
                <div style={{ width: "100%", marginBottom: "16px" }}>
                  <div className={styles.productSelectionSection}>
                    <div>
                      <h2 style={{ fontSize: "20px", fontWeight: 600, margin: 0, marginBottom: "8px" }}>
                        Add your product or products
                      </h2>
                      <p className={styles.sectionDescription}>
                        Choose the products you want to configure.
                      </p>
                    </div>

                    <div className={styles.productChipsGrid}>
                      {visibleProducts.map(product => {
                        const hasAdded = products.some(p => p.productId === product.id);
                        return (
                        <div key={product.id}
                          className={`${styles.productChip} ${hasAdded ? styles.productChipSelected : ''}`}
                          onClick={() => addProduct(product.id, product.name, product.category)}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = '#f5f5f5';
                            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
                            if (!hasAdded) e.currentTarget.style.borderColor = '#c0c0c0';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = '';
                            e.currentTarget.style.boxShadow = 'none';
                            if (!hasAdded) e.currentTarget.style.borderColor = '';
                          }}
                        >
                          <div className={styles.chipTopRow}>
                          <div className={styles.chipIcon}>
                            {product.category.startsWith("Dynamics 365") ? (
                              <svg width="28" height="28" viewBox="0 0 340 340" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <defs>
                                  <linearGradient id="d365_grad0" x1="134.743" y1="-3.542" x2="200.665" y2="169.02" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#0B53CE"/>
                                    <stop offset="1" stopColor="#7252AA"/>
                                  </linearGradient>
                                  <linearGradient id="d365_grad1" x1="227.154" y1="331.118" x2="227.154" y2="125.429" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#2266E3"/>
                                    <stop offset="1" stopColor="#AE7FE2"/>
                                  </linearGradient>
                                  <linearGradient id="d365_grad2" x1="290.417" y1="201.116" x2="219.854" y2="201.116" gradientUnits="userSpaceOnUse">
                                    <stop stopColor="#94B9FF"/>
                                    <stop offset="0.2878" stopColor="#94B9FF" stopOpacity="0.524"/>
                                    <stop offset="1" stopColor="#538FFF" stopOpacity="0"/>
                                  </linearGradient>
                                </defs>
                                <path d="M42.5 -3.542L290.417 85V206.566C290.417 216.362 280.713 223.202 271.487 219.908L219.583 201.377V132.544C219.583 117.789 210.436 104.58 196.623 99.39L172.491 90.323C167.86 88.583 162.917 92.006 162.917 96.954V181.131L42.5 138.125V-3.542Z" fill="url(#d365_grad0)"/>
                                <path d="M290.417 109.791C290.417 124.664 281.124 137.978 267.155 143.082L106.25 201.875V343.541L290.417 276.249V109.791Z" fill="url(#d365_grad1)"/>
                                <path opacity="0.5" d="M290.417 109.791C290.417 124.664 281.124 137.978 267.155 143.082L106.25 201.875V343.541L290.417 276.249V109.791Z" fill="url(#d365_grad2)"/>
                                <path opacity="0.5" d="M219.588 160.509L162.889 181.251L162.89 264.332C162.89 269.281 167.836 272.705 172.468 270.961L196.648 261.86C210.45 256.664 219.588 243.461 219.588 228.713V160.509Z" fill="#B0ADFF"/>
                              </svg>
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
                            <p className={styles.chipDescription}>{product.description}</p>
                          </div>
                          <div className={styles.chipActions}>
                            <div className={styles.badgeWrapper}>
                              <button
                                onClick={() => addProduct(product.id, product.name, product.category)}
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
                          <span className={styles.categoryPill}>
                            {product.category === "Employee facing custom" && <PeopleRegular style={{ fontSize: 12 }} />}
                            {product.category === "Customer facing custom" && <PersonRegular style={{ fontSize: 12 }} />}
                            {product.category === "Dynamics 365 Sales" && <ShoppingBagRegular style={{ fontSize: 12 }} />}
                            {product.category === "Dynamics 365 Service" && <BuildingRegular style={{ fontSize: 12 }} />}
                            {product.category === "Business Central" && <CartRegular style={{ fontSize: 12 }} />}
                            {product.category === "M365" && <AppGenericRegular style={{ fontSize: 12 }} />}
                            {product.category}
                          </span>
                        </div>
                      );
                      })}
                    </div>
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
                        <div className={styles.productCardHeader}>
                          <p className={styles.productTitle}>{product.name}</p>
                          <Button
                            appearance="subtle"
                            size="small"
                            icon={<DeleteRegular />}
                            onClick={() => removeProduct(product.id, product.productId)}
                          />
                        </div>

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
                        <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.5px", textTransform: "uppercase", color: tokens.colorNeutralForeground3, margin: 0, textAlign: "center", lineHeight: "18px" }}>Total estimated<br />Copilot credits</p>
                        <p style={{ fontSize: "40px", fontWeight: 700, color: tokens.colorBrandBackground, margin: 0 }}>{displayCredits.toLocaleString()}</p>
                      </div>
                      <div style={{ width: "1px", flexShrink: 0, backgroundColor: tokens.colorNeutralStroke2, margin: "0 12px" }} />
                      <div style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: "12px",
                        flex: 1,
                        minWidth: 0,
                      }}>
                        <p style={{ fontSize: "12px", fontWeight: 600, letterSpacing: "0.5px", textTransform: "uppercase", color: tokens.colorNeutralForeground3, margin: 0, textAlign: "center", lineHeight: "18px" }}>Total Copilot credits negated<br />with Microsoft 365 Copilot</p>
                        <p style={{ fontSize: "40px", fontWeight: 700, color: tokens.colorPaletteGreenForeground1, margin: 0 }}>{displayNegated.toLocaleString()}</p>
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

                        // Negation values (M365 Copilot license zero-rating)
                        const knowledgeNegation = users > 0 ? Math.round(knowledgeCredits * (m365Count / users)) : 0;
                        const toolsNegation = users > 0 ? Math.round(toolsCredits * (m365Count / users)) : 0;
                        const flowsNegation = users > 0 ? Math.round(flowsCredits * (m365Count / users)) : 0;
                        const modifiersNegation = users > 0 ? Math.round(modifiersCredits * (m365Count / users)) : 0;

                        return (
                          <div key={product.id} style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "20px",
                            border: `1px solid ${tokens.colorNeutralStroke2}`,
                            borderRadius: "12px",
                            padding: "24px",
                          }}>
                            <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
                              <p style={{ fontSize: "20px", lineHeight: "28px", fontWeight: 600, color: tokens.colorNeutralForeground1, margin: 0 }}>{product.name}</p>
                              <span className={styles.calcLeader} />
                              <p style={{ fontSize: "20px", lineHeight: "28px", fontWeight: 600, color: tokens.colorNeutralForeground1, margin: 0, flexShrink: 0, whiteSpace: "nowrap" }}>{calculateProductCredits(product).toLocaleString()}</p>
                            </div>

                            {/* Copilot credits driven by knowledge */}
                            <div className={styles.calcSectionContainer}>
                              <div style={{ display: "flex", alignItems: "baseline", gap: "8px", width: "100%" }}>
                                <h3 className={styles.h4Title}>Copilot credits driven by knowledge</h3>
                                <span className={styles.calcLeader} />
                                <p style={{ fontSize: "14px", fontWeight: 600, color: tokens.colorNeutralForeground1, margin: 0, flexShrink: 0, whiteSpace: "nowrap" }}>{knowledgeCredits}</p>
                              </div>

                              <div className={styles.calcItemRow}>
                                <p className={styles.calcItemLabel}>Copilot credits consumed for tenant graph grounding</p>
                                <span className={styles.calcLeader} />
                                <p className={styles.calcItemValue}>{ttgMessages}</p>
                              </div>

                              <div className={styles.calcItemRow}>
                                <p className={styles.calcItemLabel}>Copilot credits consumed for non-tenant graph grounding: Dataverse, web, files</p>
                                <span className={styles.calcLeader} />
                                <p className={styles.calcItemValue}>{otherKnowledgeMessages}</p>
                              </div>

                              <div className={styles.calcNegationRow}>
                                <p className={styles.calcNegationLabel}>Copilot credits negated for {m365Count} users with Microsoft 365 Copilot licenses</p>
                                <span className={styles.calcLeader} />
                                <p className={styles.calcNegationValue}>{knowledgeNegation}</p>
                              </div>
                            </div>

                            {/* Copilot credits driven by agent tools */}
                            <div className={styles.calcSectionContainer}>
                              <div style={{ display: "flex", alignItems: "baseline", gap: "8px", width: "100%" }}>
                                <h3 className={styles.h4Title}>Copilot credits driven by agent tools</h3>
                                <span className={styles.calcLeader} />
                                <p style={{ fontSize: "14px", fontWeight: 600, color: tokens.colorNeutralForeground1, margin: 0, flexShrink: 0, whiteSpace: "nowrap" }}>{toolsCredits}</p>
                              </div>

                              <div className={styles.calcNegationRow}>
                                <p className={styles.calcNegationLabel}>Copilot credits negated for {m365Count} users with Microsoft 365 Copilot licenses</p>
                                <span className={styles.calcLeader} />
                                <p className={styles.calcNegationValue}>{toolsNegation}</p>
                              </div>
                            </div>

                            {/* Copilot credits driven by agent flows */}
                            <div className={styles.calcSectionContainer}>
                              <div style={{ display: "flex", alignItems: "baseline", gap: "8px", width: "100%" }}>
                                <h3 className={styles.h4Title}>Copilot credits driven by agent flows</h3>
                                <span className={styles.calcLeader} />
                                <p style={{ fontSize: "14px", fontWeight: 600, color: tokens.colorNeutralForeground1, margin: 0, flexShrink: 0, whiteSpace: "nowrap" }}>{flowsCredits}</p>
                              </div>

                              <div className={styles.calcNegationRow}>
                                <p className={styles.calcNegationLabel}>Copilot credits negated for {m365Count} users with Microsoft 365 Copilot licenses</p>
                                <span className={styles.calcLeader} />
                                <p className={styles.calcNegationValue}>{flowsNegation}</p>
                              </div>
                            </div>

                            {/* Copilot credits driven by optional modifiers */}
                            <div className={styles.calcSectionContainer}>
                              <div style={{ display: "flex", alignItems: "baseline", gap: "8px", width: "100%" }}>
                                <h3 className={styles.h4Title}>Copilot credits driven by optional modifiers</h3>
                                <span className={styles.calcLeader} />
                                <p style={{ fontSize: "14px", fontWeight: 600, color: tokens.colorNeutralForeground1, margin: 0, flexShrink: 0, whiteSpace: "nowrap" }}>{modifiersCredits}</p>
                              </div>

                              <p style={{ fontSize: "14px", fontWeight: 600, color: tokens.colorNeutralForeground1, margin: 0, paddingLeft: "15px" }}>Prompts</p>

                              <div className={styles.calcItemRow}>
                                <p className={styles.calcItemLabel} style={{ fontWeight: 600, paddingLeft: "16px" }}>Basic</p>
                                <span className={styles.calcLeader} />
                                <p className={styles.calcItemValue}>{basicCredits}</p>
                              </div>

                              <div className={styles.calcItemRow}>
                                <p className={styles.calcItemLabel} style={{ fontWeight: 600, paddingLeft: "16px" }}>Standard</p>
                                <span className={styles.calcLeader} />
                                <p className={styles.calcItemValue}>{standardCredits}</p>
                              </div>

                              <div className={styles.calcItemRow}>
                                <p className={styles.calcItemLabel} style={{ fontWeight: 600, paddingLeft: "16px" }}>Premium</p>
                                <span className={styles.calcLeader} />
                                <p className={styles.calcItemValue}>{premiumCredits}</p>
                              </div>

                              <div className={styles.calcNegationRow}>
                                <p className={styles.calcNegationLabel}>Copilot credits negated for {m365Count} users with Microsoft 365 Copilot licenses</p>
                                <span className={styles.calcLeader} />
                                <p className={styles.calcNegationValue}>{modifiersNegation}</p>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>

                    <p style={{ fontSize: "12px", lineHeight: "16px", color: tokens.colorNeutralForeground3, margin: 0, textAlign: "center" as const }}>
                      *Estimates are for planning purposes only. Actual credit consumption may vary based on usage patterns.
                    </p>
                   </div>
                  </div>
                </div>
              )}

              {/* Legal */}
              <div className={styles.legalContainer} style={{ marginTop: "48px", marginBottom: "64px" }}>
                <p className={styles.legalText}>
                  The Copilot Studio estimator is not a binding offer nor a guarantee of the final cost or availability of the product. This estimate should be regarded only as guidance and not incorporated into a contractual agreement. The actual amount of message consumption and associated cost may vary depending on the region, availability, workload usage, number of users, and other factors. You may contact your Microsoft representative before making any customer recommendations or purchase decisions. Microsoft reserves the right to modify or discontinue the Copilot Studio estimator at any time without notice.
                </p>
              </div>
            </div>
          </div>
    </FluentProvider>
  );
}

export default App;
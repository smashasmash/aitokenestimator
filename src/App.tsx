import {
  FluentProvider,
  webLightTheme,
  makeStyles,
  tokens,
  Button,
  Input,
  Label,
  Radio,
  Link,
} from "@fluentui/react-components";
import { ArrowClockwiseRegular, LockClosedRegular, StarAddRegular, MoreHorizontalRegular } from "@fluentui/react-icons";

const img2 = "https://www.figma.com/api/mcp/asset/e68ee78b-5c06-40ca-b830-c6783462f567";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100%",
  },
  browserContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
    padding: "8px",
    borderRadius: "8px",
    maxWidth: "1919px",
    position: "relative",
    backgroundColor: tokens.colorNeutralBackground6,
  },
  browserBar: {
    display: "flex",
    gap: "8px",
    alignItems: "center",
    width: "100%",
  },
  avatar: {
    width: "24px",
    height: "24px",
    borderRadius: "100px",
    overflow: "hidden",
  },
  avatarImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover" as const,
  },
  browserButton: {
    width: "24px",
    height: "24px",
    minWidth: "24px",
    padding: "4px",
  },
  searchBar: {
    display: "flex",
    flex: "1 0 0",
    gap: "12px",
    height: "30px",
    alignItems: "center",
    padding: "2px 8px",
    backgroundColor: tokens.colorNeutralBackground1,
    border: `1px solid ${tokens.colorNeutralStroke1}`,
    borderRadius: "9999px",
  },
  searchText: {
    flex: "1 0 0",
    fontSize: "14px",
    lineHeight: "20px",
    color: tokens.colorNeutralForeground3,
    overflow: "hidden",
    paddingBottom: "2px",
  },
  win11Commands: {
    display: "flex",
    height: "30px",
    alignItems: "center",
    justifyContent: "center",
    borderTopRightRadius: "7px",
    overflow: "hidden",
  },
  win11Button: {
    width: "44px",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "10px",
    fontFamily: "'Segoe Fluent Icons'",
    color: tokens.colorNeutralForeground1,
  },
  appContainer: {
    backgroundColor: tokens.colorNeutralBackground2,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    overflow: "hidden",
    flex: "1 0 0",
    width: "100%",
  },
  bodyContainer: {
    display: "flex",
    flexDirection: "row" as const,
    gap: "0px",
    width: "1329px",
    paddingTop: "24px",
  },
  mainContent: {
    display: "flex",
    flexDirection: "column",
    gap: "32px",
    flex: "1 0 0",
  },
  headerSection: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
    width: "100%",
  },
  h1Container: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  headline: {
    fontSize: "32px",
    lineHeight: "40px",
    fontWeight: 600,
    color: tokens.colorNeutralForeground1,
    textAlign: "center" as const,
    flex: "1 0 0",
    margin: 0,
  },
  headerDescription: {
    fontSize: "14px",
    lineHeight: "20px",
    color: tokens.colorNeutralForeground3,
    textAlign: "center" as const,
    maxWidth: "850px",
    width: "850px",
    margin: 0,
  },
  creditContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    width: "100%",
  },
  creditConversion: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    flex: "1 0 0",
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
    width: "224px",
    margin: 0,
  },
  navContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "100%",
  },
  navButtons: {
    display: "flex",
    gap: "16px",
    height: "40px",
    alignItems: "center",
  },
  section: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    width: "100%",
  },
  sectionBorder: {
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    paddingBottom: "20px",
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
    fontSize: "18px",
    lineHeight: "24px",
    fontWeight: 600,
    color: tokens.colorNeutralForeground1,
    width: "100%",
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
  calculationContainer: {
    display: "flex",
    width: "596px",
    overflow: "hidden",
  },
  calculationPanel: {
    backgroundColor: tokens.colorNeutralBackground3,
    borderLeft: `1px solid ${tokens.colorNeutralStroke2}`,
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    padding: "32px",
    width: "596px",
  },
  totalHeading: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: "10px",
    borderBottom: `0.5px solid ${tokens.colorNeutralStroke1}`,
    width: "100%",
  },
  totalText: {
    fontSize: "24px",
    lineHeight: "32px",
    fontWeight: 700,
    color: tokens.colorBrandBackground,
    flex: "1 0 0",
    maxWidth: "380px",
    paddingRight: "24px",
    margin: 0,
  },
  totalValue: {
    fontSize: "24px",
    lineHeight: "32px",
    fontWeight: 700,
    color: tokens.colorBrandBackground,
    margin: 0,
  },
  expandedSection: {
    display: "flex",
    flexDirection: "column",
    gap: "24px",
    overflow: "hidden",
    width: "100%",
  },
  calcSectionContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    minWidth: "400px",
    borderBottom: `1px solid ${tokens.colorNeutralStroke2}`,
    paddingBottom: "20px",
    width: "100%",
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
  calcH6Container: {
    display: "flex",
    flexDirection: "column",
    gap: "2px",
    width: "100%",
  },
  calcItemRow: {
    display: "flex",
    gap: "0px",
    width: "100%",
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
    flex: "1 0 0",
    fontSize: "14px",
    lineHeight: "20px",
    color: tokens.colorNeutralForeground1,
    maxWidth: "360px",
    margin: 0,
  },
  calcItemValue: {
    fontSize: "14px",
    lineHeight: "20px",
    color: tokens.colorNeutralForeground1,
    margin: 0,
  },
  legalContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    maxWidth: "1200px",
    width: "800px",
    paddingBottom: "48px",
    paddingLeft: "56px",
    paddingRight: "56px",
  },
  legalText: {
    flex: "1 0 0",
    fontSize: "10px",
    lineHeight: "14px",
    color: tokens.colorNeutralForeground2,
    textAlign: "center" as const,
    margin: 0,
  },
});

function App() {
  const styles = useStyles();

  return (
    <FluentProvider theme={webLightTheme}>
      <div className={styles.root}>
        {/* Browser Chrome */}
        <div className={styles.browserContainer}>
          <div className={styles.browserBar}>
            <div className={styles.avatar}>
              <img src={img2} alt="" className={styles.avatarImage} />
            </div>
            
            <div style={{ display: "flex", gap: "16px", padding: "0 8px" }}>
              <Button
                appearance="subtle"
                size="small"
                icon={<ArrowClockwiseRegular />}
                className={styles.browserButton}
              />
              <Button
                appearance="subtle"
                size="small"
                icon={<ArrowClockwiseRegular />}
                className={styles.browserButton}
              />
            </div>

            <div className={styles.searchBar}>
              <Button
                appearance="subtle"
                size="small"
                icon={<ArrowClockwiseRegular />}
                className={styles.browserButton}
              />
              <div className={styles.searchText}>
                https://www.copilotstudio.microsoft.com
              </div>
              <Button
                appearance="subtle"
                size="small"
                icon={<ArrowClockwiseRegular />}
                className={styles.browserButton}
              />
            </div>

            <div style={{ display: "flex", gap: "20px", alignItems: "center", paddingLeft: "2px", paddingRight: "8px" }}>
              <Button appearance="subtle" size="small" icon={<StarAddRegular />} className={styles.browserButton} />
              <Button appearance="subtle" size="small" icon={<LockClosedRegular />} className={styles.browserButton} />
              <Button appearance="subtle" size="small" icon={<MoreHorizontalRegular />} className={styles.browserButton} />
            </div>

            <div className={styles.win11Commands}>
              <div className={styles.win11Button}>−</div>
              <div className={styles.win11Button}>□</div>
              <div className={styles.win11Button}>×</div>
            </div>
          </div>

          {/* App Container */}
          <div className={styles.appContainer}>
            <div className={styles.bodyContainer}>
              <div className={styles.mainContent}>
                {/* Header */}
                <div className={styles.headerSection}>
                  <div className={styles.h1Container}>
                    <p className={styles.headline}>Microsoft agent usage estimator</p>
                    <p className={styles.headerDescription}>
                      Use the estimator to forecast your agent's Copilot credit volume. Select from licensing options, agent types, and the features your agent leverages to respond to your end users. See the credit consumption impact based on these selections. This estimator provides a monthly credit informational estimate for a single agent and makes no guarantees of final costs. This isn't' a pricing calculator, so you should not rely on it to make cost decisions or to make any definite forecasts around your monthly expenses.
                    </p>
                  </div>

                  <div className={styles.creditContainer}>
                    <div className={styles.creditConversion}>
                      <p className={styles.creditTitle}>1 Copilot credit = $0.01</p>
                      <p className={styles.creditLink}>
                        <span>Go </span>
                        <Link href="#">here</Link>
                        <span> to convert to your currency.</span>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Nav Container */}
                <div className={styles.navContainer}>
                  <div className={styles.navButtons}>
                    <Button appearance="primary">Learn more</Button>
                  </div>
                </div>

                {/* Agent Type Section */}
                <div className={styles.section}>
                  <div className={styles.radioContainer}>
                    <p className={styles.sectionDescription}>
                      Placeholder section description lorem ipsum
                    </p>
                  </div>
                  <div className={styles.radioChoices}>
                    <Radio value="copilot-chat" label="Copilot Chat employee facing agent (Copilot Studio Lite)" />
                    <Radio value="standard" label="Label" />
                  </div>
                </div>

                {/* Licensing Inputs */}
                <div className={styles.inputsRow}>
                  <div className={styles.inputColumn}>
                    <div className={styles.radioContainer}>
                      <p className={styles.sectionDescription}>
                        Placeholder section description lorem ipsum
                      </p>
                    </div>
                    <div className={styles.radioChoices}>
                      <Radio value="yes" label="Yes" />
                      <Radio value="no" label="No" />
                    </div>
                  </div>
                  
                  <div className={styles.inputColumn}>
                    <Label>How many users have Microsoft 365 Copilot licenses?</Label>
                    <Input appearance="outline" size="medium" placeholder="Placeholder text" />
                  </div>
                </div>

                {/* Agent Traffic Section */}
                <div className={`${styles.section} ${styles.sectionBorder}`}>
                  <div className={styles.h4Container}>
                    <div className={styles.h4Content}>
                      <p className={styles.h4Title}>Agent traffic</p>
                      <div>
                        <p className={styles.sectionDescription}>
                          Agent traffic quantifies the activity an agent supports by assessing the number of end users accessing the agent and their monthly engagement frequency.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className={styles.inputsRow}>
                    <div className={styles.inputColumn}>
                      <Label>How many users?</Label>
                      <Input appearance="outline" size="medium" placeholder="Placeholder text" />
                    </div>
                    <div className={styles.inputColumn}>
                      <Label>On average, how many times per month will your users interact with your agent?</Label>
                      <Input appearance="outline" size="medium" placeholder="Placeholder text" />
                    </div>
                  </div>
                </div>

                {/* Agent Orchestration Section */}
                <div className={`${styles.section} ${styles.sectionBorder}`}>
                  <div className={styles.h4Container}>
                    <div className={styles.h4Content}>
                      <p className={styles.h4Title}>Agent orchestration</p>
                      <div>
                        <p className={styles.sectionDescription}>
                          Orchestration involves managing and coordinating an agent's capabilities and actions to effectively respond to user queries and perform tasks.
                        </p>
                        <Link href="#">Learn more</Link>
                      </div>
                    </div>
                  </div>

                  <div className={styles.radioChoices}>
                    <Radio value="generative" label="Generative" />
                    <Radio value="classic" label="Classic" />
                  </div>
                </div>

                {/* Agent Knowledge Section */}
                <div className={`${styles.section} ${styles.sectionBorder}`}>
                  <div className={styles.h4Container}>
                    <div className={styles.h4Content}>
                      <p className={styles.h4Title}>Agent knowledge</p>
                      <div>
                        <p className={styles.sectionDescription}>
                          Knowledge sources enable agents to provide relevant information and insights. Published agents use configured knowledge sources to ground their responses.
                        </p>
                        <Link href="#">Learn more</Link>
                      </div>
                    </div>
                  </div>

                  <div className={styles.inputColumn}>
                    <Label>What is the percentage of agent responses are from knowledge added to your agent? *</Label>
                    <Input appearance="outline" size="medium" placeholder="Placeholder text" />
                  </div>

                  <div className={styles.inputsRow} style={{ paddingLeft: "36px" }}>
                    <div className={styles.inputColumn}>
                      <Label>What is the percentage of knowledge responses from tenant graph grounding?</Label>
                      <Input appearance="outline" size="medium" placeholder="Placeholder text" />
                    </div>
                    <div className={styles.inputColumn}>
                      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        <div style={{ display: "flex", height: "44px", alignItems: "flex-start", width: "100%" }}>
                          <p style={{ flex: "1 0 0", fontSize: "14px", lineHeight: "20px", margin: 0 }}>All other knowledge</p>
                        </div>
                        <div style={{ display: "flex", height: "40px", alignItems: "center", width: "100%" }}>
                          <p style={{ flex: "1 0 0", fontSize: "32px", lineHeight: "40px", fontWeight: 600, color: "#0078d4", margin: 0 }}>100%</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Calculation Panel */}
              <div className={styles.calculationContainer}>
                <div className={styles.calculationPanel}>
                  <div>
                    <div className={styles.totalHeading}>
                      <p className={styles.totalText}>Total estimated Copilot credits</p>
                      <p className={styles.totalValue}>-</p>
                    </div>
                  </div>

                  <div className={styles.expandedSection}>
                    {/* Knowledge Section */}
                    <div className={styles.calcSectionContainer}>
                      <div className={styles.calcH4Container}>
                        <div className={styles.calcH4Heading}>
                          <p className={styles.calcH4Text}>
                            Copilot credits driven by knowledge
                          </p>
                          <p className={styles.calcH4Value}>0</p>
                        </div>
                      </div>

                      <div className={styles.calcH6Container}>
                        <div className={styles.calcItemRow}>
                          <div className={styles.calcItemContent}>
                            <div className={styles.calcItemText}>
                              <div className={styles.bulletContainer}>
                                <div className={styles.bullet} />
                              </div>
                              <p className={styles.calcItemLabel}>
                                Copilot credits consumed for tenant graph grounding (10 Copilot credits) + generative answers (2 Copilot credits)
                              </p>
                            </div>
                            <p className={styles.calcItemValue}>-</p>
                          </div>
                        </div>
                      </div>

                      <div className={styles.calcH6Container}>
                        <div className={styles.calcItemRow}>
                          <div className={styles.calcItemContent}>
                            <div className={styles.calcItemText}>
                              <div className={styles.bulletContainer}>
                                <div className={styles.bullet} />
                              </div>
                              <p className={styles.calcItemLabel}>
                                Copilot credits consumed for non-tenant graph grounding (2 Copilot credits): Dataverse, web, files
                              </p>
                            </div>
                            <p className={styles.calcItemValue}>-</p>
                          </div>
                        </div>
                      </div>

                      <div className={styles.calcH6Container}>
                        <div className={styles.calcItemRow}>
                          <div className={styles.calcItemContent}>
                            <div className={styles.calcItemText}>
                              <div className={styles.bulletContainer}>
                                <div className={styles.bullet} />
                              </div>
                              <p className={styles.calcItemLabel} style={{ fontStyle: "italic" }}>
                                Copilot credits negated for users with Microsoft 365 Copilot licenses
                              </p>
                            </div>
                            <p className={styles.calcItemValue}>-</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions & Topics Section */}
                    <div className={styles.calcSectionContainer}>
                      <div className={styles.calcH4Container}>
                        <div className={styles.calcH4Heading}>
                          <p className={styles.calcH4Text}>
                            Copilot credits driven by agent actions and topics
                          </p>
                          <p className={styles.calcH4Value}>0</p>
                        </div>
                      </div>

                      <div className={styles.calcH6Container}>
                        <div className={styles.calcItemRow}>
                          <div className={styles.calcItemContent}>
                            <div className={styles.calcItemText}>
                              <div className={styles.bulletContainer}>
                                <div className={styles.bullet} />
                              </div>
                              <p className={styles.calcItemLabel}>
                                Number of Copilot credits that charge for actions and topics
                              </p>
                            </div>
                            <p className={styles.calcItemValue}>0</p>
                          </div>
                        </div>
                      </div>

                      <div className={styles.calcH6Container}>
                        <div className={styles.calcItemRow}>
                          <div className={styles.calcItemContent}>
                            <div className={styles.calcItemText}>
                              <div className={styles.bulletContainer}>
                                <div className={styles.bullet} />
                              </div>
                              <p className={styles.calcItemLabel}>
                                Number of Copilot credits that charge for agent flows
                              </p>
                            </div>
                            <p className={styles.calcItemValue}>0</p>
                          </div>
                        </div>
                      </div>

                      <div className={styles.calcH6Container}>
                        <div className={styles.calcItemRow}>
                          <div className={styles.calcItemContent}>
                            <div className={styles.calcItemText}>
                              <div className={styles.bulletContainer}>
                                <div className={styles.bullet} />
                              </div>
                              <p className={styles.calcItemLabel} style={{ fontStyle: "italic" }}>
                                Copilot credits negated for users with Microsoft 365 Copilot licenses
                              </p>
                            </div>
                            <p className={styles.calcItemValue}>0</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Autonomous Triggers Section */}
                    <div className={styles.calcSectionContainer}>
                      <div className={styles.calcH4Container}>
                        <div className={styles.calcH4Heading}>
                          <p className={styles.calcH4Text}>
                            Copilot credits driven by agent autonomous triggers
                          </p>
                          <p className={styles.calcH4Value}>0</p>
                        </div>
                      </div>
                    </div>

                    {/* Optional Modifiers Section */}
                    <div style={{ display: "flex", flexDirection: "column", gap: "8px", paddingBottom: "20px" }}>
                      <div className={styles.calcH4Container}>
                        <div className={styles.calcH4Heading}>
                          <p className={styles.calcH4Text}>
                            Copilot credits driven by optional modifiers
                          </p>
                          <p className={styles.calcH4Value}>0</p>
                        </div>
                      </div>

                      <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                        <div style={{ display: "flex", height: "20px", justifyContent: "space-between" }}>
                          <p style={{ flex: "1 0 0", fontSize: "14px", lineHeight: "20px", fontWeight: 600, color: tokens.colorNeutralForeground1, maxWidth: "460px", margin: 0 }}>
                            Prompts
                          </p>
                          <p style={{ fontSize: "14px", lineHeight: "20px", fontWeight: 600, color: tokens.colorNeutralForeground1, margin: 0 }}>
                            0
                          </p>
                        </div>

                        <div style={{ display: "flex", height: "20px", justifyContent: "space-between" }}>
                          <p style={{ flex: "1 0 0", fontSize: "14px", lineHeight: "20px", fontWeight: 600, color: tokens.colorNeutralForeground1, maxWidth: "460px", margin: 0 }}>
                            Code interpreter
                          </p>
                          <p style={{ fontSize: "14px", lineHeight: "20px", fontWeight: 600, color: tokens.colorNeutralForeground1, margin: 0 }}>
                            0
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Legal */}
            <div className={styles.legalContainer}>
              <p className={styles.legalText}>
                The Copilot Studio estimator tool is not a binding offer nor a guarantee of the final cost or availability of any Microsoft product. The estimates are purely informational, should be regarded only as guidance, and are not incorporated into any contractual agreement. Users should not rely on these estimates solely for making decisions or taking final actions. Actual costs and consumption may vary based on factors such as region, availability, workload usage, number of users, and other variables. Please contact your Microsoft representative for accurate information before making any recommendations or purchase decisions.
                {"\n\n"}
                Microsoft reserves the right to modify or discontinue the Copilot Studio estimator tool at any time without notice.
              </p>
            </div>
          </div>
        </div>
      </div>
    </FluentProvider>
  );
}

export default App;

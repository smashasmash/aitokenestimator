import {
  FluentProvider,
  webLightTheme,
  makeStyles,
  tokens,
  Button,
  Input,
  Label,
  Radio,
  RadioGroup,
  Link,
} from "@fluentui/react-components";
import { 
  ArrowClockwiseRegular, 
  LockClosedRegular, 
  StarAddRegular, 
  MoreHorizontalRegular,
} from "@fluentui/react-icons";

const avatarImg = "https://www.figma.com/api/mcp/asset/528e9b06-2a76-4d8a-8266-7e9f60c2023a";

const useStyles = makeStyles({
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    height: "100vh",
    overflow: "hidden",
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
    height: "100%",
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
  actionsLeft: {
    display: "flex",
    gap: "16px",
    padding: "0 8px",
  },
  browserButton: {
    minWidth: "24px",
    width: "24px",
    height: "24px",
    padding: "0px",
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
  actionsRight: {
    display: "flex",
    gap: "20px",
    alignItems: "center",
    paddingLeft: "2px",
    paddingRight: "8px",
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
    overflow: "auto",
    flex: "1",
    width: "100%",
    minHeight: 0,
  },
  bodyContainer: {
    display: "flex",
    flexDirection: "row" as const,
    gap: "0px",
    width: "1329px",
    paddingTop: "24px",
    paddingBottom: "24px",
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
    color: "#0078d4",
    margin: 0,
  },
  calculationContainer: {
    display: "flex",
    height: "760px",
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
    overflow: "auto",
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
});

function App() {
  const styles = useStyles();

  return (
    <FluentProvider theme={webLightTheme}>
      <div className={styles.root}>
        <div className={styles.browserContainer}>
          {/* Browser Bar */}
          <div className={styles.browserBar}>
            <div className={styles.avatar}>
              <img src={avatarImg} alt="" className={styles.avatarImage} />
            </div>
            
            <div className={styles.actionsLeft}>
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

            <div className={styles.actionsRight}>
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
                      Use the estimator to forecast your agent's Copilot credit volume. Select from licensing options, agent types, and the features your agent leverages to respond to your end users. See the credit consumption impact based on these selections. This estimator provides a monthly credit informational estimate for a single agent and makes no guarantees of final costs. This isn't a pricing calculator, so you should not rely on it to make cost decisions or to make any definite forecasts around your monthly expenses.
                    </p>
                  </div>

                  <div className={styles.creditContainer}>
                    <div className={styles.creditConversion}>
                      <p className={styles.creditTitle}>1 Copilot credit = $0.01</p>
                      <p className={styles.creditLink}>
                        Go <Link href="#">here</Link> to convert to your currency.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Nav Container */}
                <div className={styles.navContainer}>
                  <div className={styles.navButtons}>
                    <Button appearance="primary">ID Help me</Button>
                    <Button appearance="secondary">Read</Button>
                    <Button appearance="secondary">Download results</Button>
                    <Button appearance="secondary">Buy Copilot credits</Button>
                    <Button appearance="secondary">Free Copilot chat</Button>
                  </div>
                </div>

                {/* Agent Type Section */}
                <div className={styles.section}>
                  <div className={styles.radioContainer}>
                    <p className={styles.sectionDescription}>
                      Choose which type of agent you'll add most frequently. You can layer expenses for various types in a single tenant by running the estimator for distinct agent types & scenarios separately for subsequent aggregation, to create a comprehensive estimation.
                    </p>
                  </div>
                  <RadioGroup layout="horizontal">
                    <Radio value="copilot-chat" label="Copilot Chat employee facing agent (Copilot Studio Lite)" />
                    <Radio value="standard" label="Custom engine agent (Standard)" />
                    <Radio value="custom" label="Custom engine automation (Studio)" />
                  </RadioGroup>
                </div>

                {/* Licensing Inputs */}
                <div className={styles.inputsRow}>
                  <div className={styles.inputColumn}>
                    <p className={styles.sectionDescription}>
                      Do any users have Microsoft 365 Copilot licenses?
                    </p>
                    <RadioGroup layout="horizontal">
                      <Radio value="yes" label="Yes" />
                      <Radio value="no" label="No" />
                    </RadioGroup>
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
                      <p className={styles.sectionDescription}>
                        Agent traffic quantifies the activity an agent supports by assessing the number of end users accessing the agent and their monthly engagement frequency.
                      </p>
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
                      <p className={styles.sectionDescription}>
                        Orchestration involves managing and coordinating an agent's capabilities and actions to effectively respond to user queries and perform tasks.
                      </p>
                      <Link href="#">Learn more</Link>
                    </div>
                  </div>

                  <p className={styles.sectionDescription}>
                    What type of orchestration will you use?
                  </p>
                  <RadioGroup layout="horizontal">
                    <Radio value="generative" label="Generative" />
                    <Radio value="classic" label="Classic" />
                  </RadioGroup>
                </div>

                {/* Agent Knowledge Section */}
                <div className={`${styles.section} ${styles.sectionBorder}`}>
                  <div className={styles.h4Container}>
                    <div className={styles.h4Content}>
                      <p className={styles.h4Title}>Agent knowledge</p>
                      <p className={styles.sectionDescription}>
                        Knowledge sources enable agents to provide relevant information and insights. Published agents use configured knowledge sources to ground their responses.
                      </p>
                      <Link href="#">Learn more</Link>
                    </div>
                  </div>

                  <div className={styles.inputColumn}>
                    <Label>What is the percentage of agent responses are from knowledge added to your agent? *</Label>
                    <Input appearance="outline" size="medium" placeholder="Placeholder text" />
                  </div>

                  <div className={styles.inputsRow} style={{ paddingLeft: "36px", gap: "24px" }}>
                    <div className={styles.inputColumn}>
                      <Label>What is the percentage of knowledge responses from tenant graph grounding?</Label>
                      <Input appearance="outline" size="medium" placeholder="Placeholder text" />
                    </div>
                    <div className={styles.outputColumn}>
                      <p className={styles.outputLabel}>All other knowledge</p>
                      <p className={styles.outputValue}>100%</p>
                    </div>
                  </div>
                </div>

                {/* Agent Actions & Topics Section */}
                <div className={`${styles.section} ${styles.sectionBorder}`}>
                  <div style={{ display: "flex", gap: "20px", width: "100%" }}>
                    <div style={{ flex: "1 0 0", maxWidth: "596px" }}>
                      <div className={styles.h4Content}>
                        <p className={styles.h4Title}>Agent actions and topics</p>
                        <p className={styles.sectionDescription}>
                          Help agents answer a query, execute workflows, connect to external systems, or provide topic-specific guidance.
                        </p>
                      </div>
                    </div>
                    <div className={styles.outputColumn}>
                      <p className={styles.outputLabel}>Number of Copilot credits that charge for actions and topics</p>
                      <p className={styles.outputValue}>100%</p>
                    </div>
                  </div>

                  <div className={styles.inputsRow} style={{ gap: "24px" }}>
                    <div className={styles.inputColumn}>
                      <Label>How many agent flows have you configured for your agent (either within a topic or standalone agent action)?</Label>
                      <Link href="#">Learn more</Link>
                      <Input appearance="outline" size="medium" placeholder="Placeholder text" />
                    </div>
                    <div className={styles.inputColumn}>
                      <Label>How often will these flows run per month?</Label>
                      <Input appearance="outline" size="medium" placeholder="Placeholder text" />
                    </div>
                  </div>
                </div>

                {/* Agent Topics Section */}
                <div className={`${styles.section} ${styles.sectionBorder}`}>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "24px", width: "100%" }}>
                    <div style={{ flex: "1 0 0" }}>
                      <div className={styles.h4Content}>
                        <p className={styles.h4Title}>Agent topics</p>
                        <p className={styles.sectionDescription}>
                          Help agents answer a query, execute workflows, connect to external systems, or provide topic-specific guidance.
                        </p>
                      </div>
                    </div>
                    <div className={styles.outputColumn}>
                      <p className={styles.outputLabel}>All other knowledge</p>
                      <p className={styles.outputValue}>100%</p>
                    </div>
                  </div>

                  <div className={styles.inputsRow} style={{ gap: "24px" }}>
                    <div className={styles.inputColumn}>
                      <Label>How many agent flows are included in your topics?</Label>
                      <Link href="#">Learn more</Link>
                      <Input appearance="outline" size="medium" placeholder="Placeholder text" />
                    </div>
                    <div className={styles.inputColumn}>
                      <Label>How often will these flows run per month?</Label>
                      <Input appearance="outline" size="medium" placeholder="Placeholder text" />
                    </div>
                  </div>
                </div>

                {/* Autonomous Triggers Section */}
                <div className={`${styles.section} ${styles.sectionBorder}`}>
                  <div className={styles.h4Container}>
                    <div className={styles.h4Content}>
                      <p className={styles.h4Title}>Agent autonomous triggers</p>
                      <p className={styles.sectionDescription}>
                        These triggers act independently in response to specific events, without requiring user input to automate workflows and processes.
                      </p>
                      <Link href="#">Learn more</Link>
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: "20px", width: "100%" }}>
                    <div className={styles.inputColumn}>
                      <Label>How many triggers will you add to your agent (if any)?</Label>
                      <Input appearance="outline" size="medium" placeholder="Placeholder text" />
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "20px", width: "100%" }}>
                      {/* Trigger 1 */}
                      <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "100%" }}>
                        <p className={styles.h6Title}>Trigger 1</p>

                        <div style={{ display: "flex", flexDirection: "column", gap: "20px", width: "100%" }}>
                          <div className={styles.inputsRow} style={{ gap: "24px" }}>
                            <div className={styles.inputColumn}>
                              <Label>How often will this trigger event occur each month?</Label>
                              <Input appearance="outline" size="medium" placeholder="Placeholder text" />
                            </div>
                            <div className={styles.inputColumn}>
                              <p className={styles.sectionDescription}>
                                Will this trigger use deep reasoning?
                              </p>
                              <RadioGroup layout="horizontal">
                                <Radio value="yes" label="Yes" />
                                <Radio value="no" label="No" />
                              </RadioGroup>
                            </div>
                          </div>

                          <div className={styles.inputsRow} style={{ gap: "24px" }}>
                            <div className={styles.inputColumn}>
                              <Label>How many agent actions will this trigger use?</Label>
                              <Input appearance="outline" size="medium" placeholder="Placeholder text" />
                            </div>
                            <div className={styles.inputColumn}>
                              <Label>How many of these agent actions are agent flows (if any)?</Label>
                              <Link href="#">Learn more</Link>
                              <Input appearance="outline" size="medium" placeholder="Placeholder text" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Trigger 2 */}
                      <div style={{ display: "flex", flexDirection: "column", gap: "10px", width: "100%" }}>
                        <p className={styles.h6Title}>Trigger 2</p>

                        <div style={{ display: "flex", flexDirection: "column", gap: "20px", width: "100%" }}>
                          <div className={styles.inputsRow} style={{ gap: "24px" }}>
                            <div className={styles.inputColumn}>
                              <Label>How often will this trigger event occur each month?</Label>
                              <Input appearance="outline" size="medium" placeholder="Placeholder text" />
                            </div>
                            <div className={styles.inputColumn}>
                              <p className={styles.sectionDescription}>
                                Will this trigger use deep reasoning?
                              </p>
                              <RadioGroup layout="horizontal">
                                <Radio value="yes" label="Yes" />
                                <Radio value="no" label="No" />
                              </RadioGroup>
                            </div>
                          </div>

                          <div className={styles.inputsRow} style={{ gap: "24px" }}>
                            <div className={styles.inputColumn}>
                              <Label>How many agent actions will this trigger use?</Label>
                              <Input appearance="outline" size="medium" placeholder="Placeholder text" />
                            </div>
                            <div className={styles.inputColumn}>
                              <Label>How many of these agent actions are agent flows (if any)?</Label>
                              <Input appearance="outline" size="medium" placeholder="Placeholder text" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Optional Modifiers Section */}
                <div className={styles.section} style={{ paddingBottom: "20px" }}>
                  <div className={styles.h4Container}>
                    <div className={styles.h4Content}>
                      <p className={styles.h4Title}>Agent optional modifiers</p>
                      <p className={styles.sectionDescription}>
                        These features are not required for agents but drive additional Copilot credit consumption.
                      </p>
                    </div>
                  </div>

                  <div className={styles.section}>
                    <p style={{ fontSize: "16px", lineHeight: "24px", fontWeight: 600, color: tokens.colorNeutralForeground1, margin: 0, width: "100%" }}>
                      Will you use prompt tools?
                    </p>
                    <Link href="#">Learn more</Link>
                    <RadioGroup layout="horizontal">
                      <Radio value="yes" label="Yes" />
                      <Radio value="no" label="No" />
                    </RadioGroup>
                  </div>

                  {/* Prompts Table */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "20px", width: "100%" }}>
                    <div style={{ display: "flex", gap: "8px", alignItems: "flex-start", justifyContent: "center", width: "100%" }}>
                      <div style={{ display: "flex", flexDirection: "column", flex: "1 0 0", maxWidth: "155px", alignItems: "flex-start", justifyContent: "flex-end" }}>
                        <p style={{ fontSize: "16px", lineHeight: "22px", color: "black", margin: 0, width: "100%" }}>Prompt model type</p>
                        <Link href="#">Learn more</Link>
                      </div>
                      <p style={{ flex: "1 0 0", fontSize: "16px", lineHeight: "22px", color: "black", margin: 0 }}>How many prompts?</p>
                      <p style={{ flex: "1 0 0", fontSize: "16px", lineHeight: "22px", color: "black", margin: 0 }}>How often will they be triggered in your agent?</p>
                    </div>

                    <div className={styles.tableRow}>
                      <p className={styles.tableLabel}>Basic GPT-4o mini</p>
                      <Input appearance="outline" size="medium" placeholder="Placeholder text" className={styles.tableInput} />
                      <Input appearance="outline" size="medium" placeholder="Placeholder text" className={styles.tableInput} />
                    </div>

                    <div className={styles.tableRow}>
                      <p className={styles.tableLabel}>Standard GPT-4o</p>
                      <Input appearance="outline" size="medium" placeholder="Placeholder text" className={styles.tableInput} />
                      <Input appearance="outline" size="medium" placeholder="Placeholder text" className={styles.tableInput} />
                    </div>

                    <div className={styles.tableRow}>
                      <p className={styles.tableLabel}>Premium o1-preview</p>
                      <Input appearance="outline" size="medium" placeholder="Placeholder text" className={styles.tableInput} />
                      <Input appearance="outline" size="medium" placeholder="Placeholder text" className={styles.tableInput} />
                    </div>
                  </div>

                  <div className={styles.section}>
                    <p style={{ fontSize: "16px", lineHeight: "24px", fontWeight: 600, color: tokens.colorNeutralForeground1, margin: 0, width: "100%" }}>
                      Is code interpreter enabled?
                    </p>
                    <Link href="#">Learn more</Link>
                    <RadioGroup layout="horizontal">
                      <Radio value="yes" label="Yes" />
                      <Radio value="no" label="No" />
                    </RadioGroup>
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
                        <div className={styles.calcDescription}>
                          <p className={styles.calcDescriptionText}>
                            Because you have XX users with a Microsoft 365 Copilot License, XX credits from actions and topics have been subtracted from your credits driven by actions and topics.
                          </p>
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

                      <div className={styles.calcH6Container}>
                        <div className={styles.calcItemRow}>
                          <div className={styles.calcItemContent}>
                            <div className={styles.calcItemText}>
                              <div className={styles.bulletContainer}>
                                <div className={styles.bullet} />
                              </div>
                              <p className={styles.calcItemLabel}>
                                Number of Copilot credits that charge trigger 1
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
                                Number of Copilot credits that charge trigger 2
                              </p>
                            </div>
                            <p className={styles.calcItemValue}>0</p>
                          </div>
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
                          <p className={styles.calcH5Text}>Prompts</p>
                          <p className={styles.calcH5Value}>0</p>
                        </div>

                        <div className={styles.calcH6Container}>
                          <div className={styles.calcItemRow}>
                            <div className={styles.calcItemContent}>
                              <div className={styles.calcItemText}>
                                <div className={styles.bulletContainer}>
                                  <div className={styles.bullet} />
                                </div>
                                <p className={styles.calcItemLabel}>Basic</p>
                              </div>
                              <p className={styles.calcItemValue}>0</p>
                            </div>
                          </div>
                          <div className={styles.calcDescription}>
                            <p className={styles.calcDescriptionText}>
                              1 Copilot credit per every 10 responses
                            </p>
                          </div>
                        </div>

                        <div className={styles.calcH6Container}>
                          <div className={styles.calcItemRow}>
                            <div className={styles.calcItemContent}>
                              <div className={styles.calcItemText}>
                                <div className={styles.bulletContainer}>
                                  <div className={styles.bullet} />
                                </div>
                                <p className={styles.calcItemLabel}>Standard</p>
                              </div>
                              <p className={styles.calcItemValue}>0</p>
                            </div>
                          </div>
                          <div className={styles.calcDescription}>
                            <p className={styles.calcDescriptionText}>
                              15 Copilot credits per every 10 responses
                            </p>
                          </div>
                        </div>

                        <div className={styles.calcH6Container}>
                          <div className={styles.calcItemRow}>
                            <div className={styles.calcItemContent}>
                              <div className={styles.calcItemText}>
                                <div className={styles.bulletContainer}>
                                  <div className={styles.bullet} />
                                </div>
                                <p className={styles.calcItemLabel}>Premium</p>
                              </div>
                              <p className={styles.calcItemValue}>0</p>
                            </div>
                          </div>
                          <div className={styles.calcDescription}>
                            <p className={styles.calcDescriptionText}>
                              100 Copilot credits per 10 responses
                            </p>
                          </div>
                        </div>

                        <div style={{ display: "flex", height: "20px", justifyContent: "space-between", marginTop: "8px" }}>
                          <p className={styles.calcH5Text}>Code interpreter</p>
                          <p className={styles.calcH5Value}>0</p>
                        </div>

                        <div className={styles.calcH6Container}>
                          <div className={styles.calcItemRow}>
                            <div className={styles.calcItemContent}>
                              <div className={styles.calcItemText}>
                                <div className={styles.bulletContainer}>
                                  <div className={styles.bullet} />
                                </div>
                                <p className={styles.calcItemLabel}>
                                  Copilot credits driven by code interpreter
                                </p>
                              </div>
                              <p className={styles.calcItemValue}>0</p>
                            </div>
                          </div>
                          <div className={styles.calcDescription}>
                            <p className={styles.calcDescriptionText}>
                              1 Copilot credit per every 10 responses
                            </p>
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
import { useState } from "react";
import AppV1 from "./versions/AppV1";
import AppV2 from "./versions/AppV2";
import AppV3 from "./versions/AppV3";
import AppV4 from "./versions/AppV4";

const versions = [
  { id: "v1", label: "Version 1", description: "Original design — before this session" },
  { id: "v2", label: "Version 2", description: "Latest design — current" },
  { id: "v3", label: "Version 3", description: "Inline agent card actions" },
  { id: "v4", label: "Version 4", description: "Simplified agent cards" },
];

function App() {
  const [currentVersion, setCurrentVersion] = useState("v4");

  const versionProps = {
    currentVersion,
    onVersionChange: setCurrentVersion,
    versions,
  };

  if (currentVersion === "v1") {
    return <AppV1 {...versionProps} />;
  }

  if (currentVersion === "v2") {
    return <AppV2 {...versionProps} />;
  }

  if (currentVersion === "v3") {
    return <AppV3 {...versionProps} />;
  }

  return <AppV4 {...versionProps} />;
}

export default App;


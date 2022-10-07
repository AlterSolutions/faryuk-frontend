import * as React from "react";

// @mui imports
import { Box, Tab, Tabs } from "@mui/material";


// custom imports
import ScanSingle from "../components/group/scanSingle";
import ScanMultiple from "../components/group/scanMultiple";
import ScanDNS from "../components/group/scanDNS";
import { a11yProps, TabPanel } from "../components/atomic/tabPanel";

// api imports
import ScanHandler from "../api/ScanHandler";
import GroupHandler from "../api/GroupHandler";

export default function Scan() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };
  return (<Box
    justifyContent="center"
    alignItems="center"
  >
    <Box sx={{ border: 1, borderColor: "divider" }}>
      <Tabs value={value} onChange={handleChange} variant="fullWidth" aria-label="basic tabs example">
        <Tab label="Scan Single" {...a11yProps(0)} />
        <Tab label="Scan Multiple" {...a11yProps(1)} />
        <Tab label="Scan DNS" {...a11yProps(2)} />
      </Tabs>
      <TabPanel value={value} index={0}>
        <ScanSingle submitFunction={ScanHandler.scanSingle} wordlists={ScanHandler.getWordlists()} portlists={ScanHandler.getPortlists()} groups={GroupHandler.getGroups()}/>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ScanMultiple submitFunction={ScanHandler.scanMultiple} wordlists={ScanHandler.getWordlists()} portlists={ScanHandler.getPortlists()} groups={GroupHandler.getGroups()}/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ScanDNS submitFunction={ScanHandler.scanDNS} wordlists={ScanHandler.getWordlists()} portlists={ScanHandler.getPortlists()} groups={GroupHandler.getGroups()} dnslists={ScanHandler.getDnslists()} />
      </TabPanel>
    </Box>
  </Box>);
}

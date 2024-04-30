import { useSelector } from "react-redux";
import { Box, Tab, Tabs } from "@mui/material";
import React from "react";
import { Tab1 } from "./tabs/tab1";
import CustomTabPanel from "./tabs/CustomTabPanel";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function Sidebar() {
  const selectedNeighbourhood = useSelector(
    (state) => state.selectedNeighbourhood.selectedNeighbourhood
  );
  const [value, setValue] = React.useState(0);
  const handleChange = (_, newValue) => {
    setValue(newValue);
  };
  const isAdmin = useSelector((state) => state.uiSett.isAdmin);

  return (
    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="basic tabs example"
        variant="fullWidth"
      >
        <Tab label="Item One" {...a11yProps(0)} />
        {selectedNeighbourhood ? (
          <Tab label="Mahalle" {...a11yProps(1)} />
        ) : (
          <Tab label="Mahalle Seçiniz" {...a11yProps(1)} disabled />
        )}
        <Tab label="Item Three" {...a11yProps(2)} />
      </Tabs>
      <CustomTabPanel value={value} index={0}></CustomTabPanel>
      <Tab1 value={value} index={1} />
      <CustomTabPanel value={value} index={2}>
        {isAdmin ? "Admin" : "Not Admin"}
      </CustomTabPanel>
    </Box>
  );
}
